## Configuration Manual

### Service Provider

- Required

- Default value: OpenAI

- Description

  - OpenAI: Use official OpenAI service

  - OpenAI Compatible: Use OpenAI compatible service, such as [Ollama](https://ollama.com/blog/openai-compatibility) service; or custom/third-party reverse proxy service, such as [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/)

  - Azure OpenAI: Use [Azure OpenAI Service](https://learn.microsoft.com/zh-cn/azure/ai-services/openai/chatgpt-quickstart)

  - Google Gemini: Use [Google Gemini](https://ai.google.dev/gemini-api/docs) service

  - Doubao Seed Transformer: Use the edge function adapter from [doubao-seed-translation-transformer](https://github.com/nick3/doubao-seed-translation-transformer)
    - Leave the System/User prompt inputs empty to rely on the built-in translation prompt
    - Streaming is supported; toggle the “Stream Output” option in Bob for real-time or batched results as needed

### API URL

- Optional (OpenAI and Google Gemini) / Required (Azure OpenAI, OpenAI Compatible, and Doubao Seed Transformer)

- Default value: None

- Description

  - OpenAI: Optional, default value:

    ```
    https://api.openai.com
    ```

  - OpenAI Compatible: Required, complete API URL. Currently only supports Responses API endpoint (ending with `/responses`):

    ```
    https://gateway.ai.cloudflare.com/v1/CLOUDFLARE_ACCOUNT_ID/GATEWAY_ID/openai/responses
    ```

    Note: This plugin currently only supports OpenAI compatible services that use the Responses API

  - Azure OpenAI: Required, complete API URL. Currently only supports Responses API with the following two formats:

    With deployment name:
    ```
    https://RESOURCE_NAME.openai.azure.com/openai/deployments/DEPLOYMENT_NAME/responses?api-version=preview
    ```

    Base endpoint (model specified in request body):
    ```
    https://RESOURCE_NAME.openai.azure.com/openai/v1/responses?api-version=preview
    ```

    Note: This plugin currently only supports Azure OpenAI's Responses API with preview API version

  - Google Gemini: Optional, default value:

    ```
    https://generativelanguage.googleapis.com/v1beta/models
    ```

  - Doubao Seed Transformer: Required, provide the fully qualified Chat Completions endpoint exposed by your deployment. The URL must end with `/v1/chat/completions`, for example:

    ```
    https://example.com/v1/chat/completions
    ```

    Note: Deploy the EdgeOne function from the upstream repository first, then copy the HTTPS endpoint into Bob

### API KEY

- Required

- Default value: None

- Description

  - Multiple API KEYS under different accounts can be separated by commas to achieve quota doubling and load balancing

### Model

- Required

- Default value: `gpt-3.5-turbo`

- Description

  - When selecting `custom`, the `Custom Model` configuration item needs to be set

  - For Doubao Seed Transformer, the default model is `doubao-seed-translation`; select it from the dropdown or provide your custom deployment name

### Custom Model

- Optional

- Default value: `gpt-3.5-turbo`

- Description

  - A linked item, when the `Model` configuration selects `custom`, this configuration item's model will be read

  - Use this field to override the default Doubao model ID if your deployment uses a different name

### System Prompt

- Optional

- Default value: `You are a translation engine that can only translate text and cannot interpret it.`

- Description

  - Customize System Prompt, filling this will override the default System Prompt

  - Custom Prompt can use the following variables:

    1. `$text`: the text to be translated, i.e., the text in the translation window input box

    2. `$sourceLang`: the source language, i.e., the language of the text in the translation window input box, such as "Simplified Chinese"

    3. `$targetLang`: the target language, i.e., the language into which the text is to be translated, which can be manually selected or automatically detected in the translation window, such as "English"

### User Prompt

- Optional

- Default value: `translate from $sourceLang to $targetLang:\n\n$text`

- Description

  - Customize User Prompt, filling this will override the default User Prompt

  - Can use the same variables as in the system command

### Stream Output

- Optional

- Default value: Enable

- Description

  - When enabled, translation results will be displayed in real-time

  - When disabled, results will be displayed all at once after translation is complete
  - Doubao Seed Transformer supports streaming responses; enable it for real-time updates or disable it to receive the full result at once

### Temperature

- Optional

- Default value: `0.2`

- Description

  - The higher the temperature value, the more random and creative the generated text will be

  - For translation tasks, it is recommended to set around `0.2`; for polishing tasks, it can be appropriately increased. If accuracy is highly required, it can be set to `0`
