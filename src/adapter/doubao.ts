import type {
  HttpResponse,
  ServiceError,
  TextTranslateQuery,
  ValidationCompletion,
} from '@bob-translate/types';
import type {
  DoubaoChatCompletionResponse,
  DoubaoChatCompletionStreamChunk,
  GeminiResponse,
  OpenAiResponse,
} from '../types';
import { handleValidateError, replacePromptKeywords } from '../utils';
import { LineDecoder, SseDecoder, type SseMessage } from '../utils/sse';
import { BaseAdapter } from './base';

const DOUDAO_LANG_ALIASES: Record<string, string> = {
  auto: '',
  zh: 'zh',
  'zh-cn': 'zh',
  'zh-hans': 'zh',
  yue: 'zh',
  wyw: 'zh',
  'zh-hant': 'zh-Hant',
  'zh-tw': 'zh-Hant',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  de: 'de',
  fr: 'fr',
  es: 'es',
  it: 'it',
  pt: 'pt',
  ru: 'ru',
  th: 'th',
  vi: 'vi',
  ar: 'ar',
  cs: 'cs',
  da: 'da',
  fi: 'fi',
  hr: 'hr',
  hu: 'hu',
  id: 'id',
  ms: 'ms',
  nb: 'nb',
  nl: 'nl',
  pl: 'pl',
  ro: 'ro',
  sv: 'sv',
  tr: 'tr',
  uk: 'uk',
};

const toDoubaoLanguage = (lang: string | undefined): string | undefined => {
  if (!lang) {
    return undefined;
  }
  const normalized = lang.toLowerCase();
  const mapped = DOUDAO_LANG_ALIASES[normalized];
  if (mapped === '') {
    return undefined;
  }
  return mapped ?? lang;
};

export class DoubaoAdapter extends BaseAdapter {
  private readonly sseDecoder = new SseDecoder();
  private readonly lineDecoder = new LineDecoder();

  constructor() {
    super({
      troubleshootingLink:
        'https://github.com/nick3/doubao-seed-translation-transformer',
    });
  }

  protected extractErrorFromResponse(
    response: HttpResponse<unknown>,
  ): ServiceError {
    const statusCode = response.response?.statusCode ?? 500;
    const data = response.data as {
      error?: { message?: string; type?: string };
    };
    const message = data?.error?.message || `API request failed: ${statusCode}`;

    return {
      type: statusCode === 401 ? 'secretKey' : 'api',
      message,
      addition: JSON.stringify(data),
      troubleshootingLink: this.config.troubleshootingLink,
    };
  }

  public buildHeaders(apiKey: string): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
  }

  public buildRequestBody(query: TextTranslateQuery): Record<string, unknown> {
    const targetLanguage = toDoubaoLanguage(query.detectTo) || 'zh';
    const sourceLanguage =
      query.detectFrom && query.detectFrom !== 'auto'
        ? toDoubaoLanguage(query.detectFrom)
        : undefined;

    const translationOptions: Record<string, string> = {
      target_language: targetLanguage,
    };

    if (sourceLanguage) {
      translationOptions.source_language = sourceLanguage;
    }

    const customSystemPrompt = replacePromptKeywords(
      $option.customSystemPrompt,
      query,
    );
    if (customSystemPrompt) {
      translationOptions.instruction = customSystemPrompt;
    }

    const customUserPrompt = replacePromptKeywords(
      $option.customUserPrompt,
      query,
    );

    const streamEnabled = this.isStreamEnabled();

    return {
      model: this.getModel(),
      temperature: this.getTemperature(),
      stream: streamEnabled,
      messages: [
        {
          role: 'system',
          content: JSON.stringify(translationOptions),
        },
        {
          role: 'user',
          content: customUserPrompt || query.text,
        },
      ],
    };
  }

  public getTextGenerationUrl(apiUrl: string): string {
    return apiUrl;
  }

  public parseResponse(
    response: HttpResponse<
      GeminiResponse | OpenAiResponse | DoubaoChatCompletionResponse
    >,
  ): string {
    const { data } = response;

    if (typeof data === 'object' && 'choices' in data) {
      const firstChoice = data.choices?.[0];
      if (!firstChoice?.message?.content) {
        throw new Error('无有效的翻译结果返回');
      }
      return firstChoice.message.content.trim();
    }

    throw new Error('Unsupported response type');
  }

  private parseSseMessage(sse: SseMessage): string | null {
    if (sse.data === '[DONE]') {
      return null;
    }

    try {
      const chunk = JSON.parse(sse.data) as DoubaoChatCompletionStreamChunk;
      const delta = chunk.choices?.[0]?.delta?.content;
      return delta ?? null;
    } catch (error) {
      console.error('Failed to parse Doubao stream chunk:', error);
      return null;
    }
  }

  public handleStream(
    streamData: { text: string },
    query: TextTranslateQuery,
    targetText: string,
  ): string {
    const lines = this.lineDecoder.decode(streamData.text);

    for (const line of lines) {
      const sse = this.sseDecoder.decode(line);
      if (!sse) {
        continue;
      }

      const delta = this.parseSseMessage(sse);
      if (delta) {
        targetText += delta;
        query.onStream({
          result: {
            from: query.detectFrom,
            to: query.detectTo,
            toParagraphs: [targetText],
          },
        });
      }
    }

    return targetText;
  }

  public async testApiConnection(
    apiKey: string,
    apiUrl: string,
    completion: ValidationCompletion,
  ): Promise<void> {
    const header = this.buildHeaders(apiKey);
    const body = {
      model: this.getModel(),
      stream: false,
      messages: [
        {
          role: 'system',
          content: JSON.stringify({
            source_language: 'en',
            target_language: 'zh',
          }),
        },
        {
          role: 'user',
          content: 'ping',
        },
      ],
    };

    try {
      const response = await $http.request({
        method: 'POST',
        url: apiUrl,
        header,
        body,
      });

      if (response.data?.error || response.response.statusCode >= 400) {
        handleValidateError(
          completion,
          this.extractErrorFromResponse(response),
        );
        return;
      }

      completion({ result: true });
    } catch (error) {
      handleValidateError(completion, error);
    }
  }
}
