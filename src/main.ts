import type {
  PluginValidate,
  ServiceError,
  TextTranslate,
} from '@bob-translate/types';
import { getServiceAdapter } from './adapter';
import { supportLanguageList } from './lang';
import type { ServiceProvider } from './types';
import {
  ensureHttpsAndNoTrailingSlash,
  getApiKey,
  handleGeneralError,
  handleValidateError,
} from './utils';

const validatePluginConfig = (): ServiceError | null => {
  const { apiKeys, apiUrl, customModel, model, serviceProvider } = $option;

  if (
    ['azure-openai', 'openai-compatible', 'doubao-seed'].includes(
      serviceProvider,
    ) &&
    !apiUrl
  ) {
    return {
      type: 'param',
      message: '配置错误 - 请填写 API URL',
      addition: '请在插件配置中填写有效的 API URL',
      troubleshootingLink:
        'https://github.com/nick3/bob-plugin-doubao-seed-translation/blob/main/docs/configuration_manual_CN.md#api-url',
    };
  }

  if (serviceProvider === 'azure-openai' && apiUrl) {
    // Azure OpenAI Responses API supports two URL patterns:
    // 1. With deployment: /openai/deployments/{deployment}/responses?api-version=preview
    // 2. Base endpoint: /openai/v1/responses?api-version=preview
    const validPatterns = [
      /\/openai\/deployments\/[^/]+\/responses\?api-version=preview$/,
      /\/openai\/v1\/responses\?api-version=preview$/,
    ];

    const isValidUrl = validPatterns.some((pattern) => pattern.test(apiUrl));
    if (!isValidUrl) {
      return {
        type: 'param',
        message: '配置错误 - API URL 格式不正确',
        addition:
          'Azure OpenAI 的 API URL 格式应为：https://RESOURCE_NAME.openai.azure.com/openai/deployments/DEPLOYMENT_NAME/responses?api-version=preview 或 https://RESOURCE_NAME.openai.azure.com/openai/v1/responses?api-version=preview',
        troubleshootingLink:
          'https://bobtranslate.com/service/translate/azureopenai.html',
      };
    }
  }

  if (serviceProvider === 'doubao-seed' && apiUrl) {
    if (!/\/v1\/chat\/completions$/.test(apiUrl)) {
      return {
        type: 'param',
        message:
          '配置错误 - Doubao 服务的 API URL 必须以 /v1/chat/completions 结尾',
        addition:
          '请在插件配置中填写 Doubao Transformer 提供的完整 Chat Completions 地址',
        troubleshootingLink:
          'https://github.com/nick3/doubao-seed-translation-transformer',
      };
    }
  }

  if (!apiKeys) {
    return {
      type: 'secretKey',
      message: '配置错误 - 请确保您在插件配置中填入了正确的 API Keys',
      addition: '请在插件配置中填写 API Keys',
    };
  }

  if (model === 'custom' && !customModel) {
    return {
      type: 'param',
      message: '配置错误 - 请确保你在插件配置中填入了正确的自定义模型名称',
      addition: '请在插件配置中填写自定义模型名称',
    };
  }

  return null;
};

export const translate: TextTranslate = (query) => {
  const { apiKeys, apiUrl, serviceProvider, stream } = $option;

  const error = validatePluginConfig();
  if (error) {
    handleGeneralError(query, error);
    return;
  }

  const serviceAdapter = getServiceAdapter(serviceProvider as ServiceProvider);
  const apiKey = getApiKey(apiKeys);

  serviceAdapter
    .translate(
      query,
      apiKey,
      ensureHttpsAndNoTrailingSlash(apiUrl),
      stream === 'enable',
    )
    .catch((error: unknown) => {
      handleGeneralError(query, error);
    });
};

export const pluginValidate: PluginValidate = (completion) => {
  const { apiKeys, apiUrl, serviceProvider } = $option;

  const pluginConfigError = validatePluginConfig();
  if (pluginConfigError) {
    handleValidateError(completion, pluginConfigError);
    return;
  }

  const apiKey = getApiKey(apiKeys);
  const serviceAdapter = getServiceAdapter(serviceProvider as ServiceProvider);

  serviceAdapter
    .testApiConnection(
      apiKey,
      ensureHttpsAndNoTrailingSlash(apiUrl),
      completion,
    )
    .catch((error: unknown) => {
      handleValidateError(completion, error);
    });
};

export const pluginTimeoutInterval = () => 120;

export const supportLanguages = () =>
  supportLanguageList.map(([standardLang]) => standardLang);
