import type { ServiceAdapter, ServiceProvider } from '../types';
import { AzureOpenAiAdapter } from './azure-openai';
import { DoubaoAdapter } from './doubao';
import { GeminiAdapter } from './gemini';
import { OpenAiAdapter } from './openai';
import { OpenAiCompatibleAdapter } from './openai-compatible';

export const getServiceAdapter = (
  serviceProvider: ServiceProvider,
): ServiceAdapter => {
  switch (serviceProvider) {
    case 'azure-openai':
      return new AzureOpenAiAdapter();
    case 'doubao-seed':
      return new DoubaoAdapter();
    case 'gemini':
      return new GeminiAdapter();
    case 'openai-compatible':
      return new OpenAiCompatibleAdapter();
    default:
      return new OpenAiAdapter();
  }
};
