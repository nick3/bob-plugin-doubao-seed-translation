## 配置手册

### 服务提供商

- 必选项

- 默认值：OpenAI

- 说明

  - OpenAI：使用 OpenAI 官方服务

  - OpenAI Compatible：使用与 OpenAI 兼容的服务，如 [Ollama](https://ollama.com/blog/openai-compatibility) 等；或是自定义/第三方反代服务，如 [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/) 等

  - Azure OpenAI：使用 [Azure OpenAI Service](https://learn.microsoft.com/zh-cn/azure/ai-services/openai/chatgpt-quickstart)

  - Google Gemini：使用 [Google Gemini](https://ai.google.dev/gemini-api/docs) 服务

  - Doubao Seed Transformer：使用 [doubao-seed-translation-transformer](https://github.com/nick3/doubao-seed-translation-transformer) 在边缘函数上部署的兼容接口
    - 支持使用默认的系统指令与用户指令，保持输入框为空即可按需生成翻译提示
    - 暂不支持流式输出，插件会自动改用非流式模式，建议在配置里将「流式输出」设为 `Disable`


### API URL

- 可选项（OpenAI 和 Google Gemini）/ 必填项（Azure OpenAI、OpenAI Compatible、Doubao Seed Transformer）

- 默认值：无

- 说明

  - OpenAI：可选，默认为：

    ```
    https://api.openai.com
    ```

  - OpenAI Compatible：必填，需填入完整的 API URL。目前仅支持 Responses API 端点（以 `/responses` 结尾）：

    ```
    https://gateway.ai.cloudflare.com/v1/CLOUDFLARE_ACCOUNT_ID/GATEWAY_ID/openai/responses
    ```

    注：本插件目前仅支持使用 Responses API 的 OpenAI 兼容服务

  - Azure OpenAI：必填，需填入完整的 API URL。目前仅支持 Responses API，支持以下两种格式：

    带部署名称：
    ```
    https://RESOURCE_NAME.openai.azure.com/openai/deployments/DEPLOYMENT_NAME/responses?api-version=preview
    ```

    基础端点（模型在请求体中指定）：
    ```
    https://RESOURCE_NAME.openai.azure.com/openai/v1/responses?api-version=preview
    ```

    注：本插件目前仅支持 Azure OpenAI 的 Responses API，需使用 preview API 版本

  - Google Gemini：可选，默认为：

    ```
    https://generativelanguage.googleapis.com/v1beta/models
    ```

  - Doubao Seed Transformer：必填，需填入部署后的完整 Chat Completions API 地址，必须以 `/v1/chat/completions` 结尾，例如：

    ```
    https://example.com/v1/chat/completions
    ```

    注：请先使用官方仓库部署 EdgeOne 函数，并在 Bob 中填入返回的 HTTPS 地址

### API KEY

- 必填项

- 默认值：无

- 说明

  - 可使用英文逗号分割多个账号下不同的 API KEY 以实现额度加倍及负载均衡

### 模型

- 必选项

- 默认值：`gpt-3.5-turbo`

- 说明

  - 选择 `custom` 时，需要设置 `自定义模型` 配置项

  - Doubao Seed Transformer 默认模型为 `doubao-seed-translation`，可直接在下拉菜单中选择或通过自定义模型填写

### 自定义模型

- 可选项

- 默认值：`gpt-3.5-turbo`

- 说明

  - 联动项，当 `模型` 配置选择 `custom` 时，会读取此配置项设置的模型

  - 若对 Doubao 服务有自定义部署名称，可在此填写对应模型 ID

### 系统指令

- 可选项

- 默认值：`You are a translation engine that can only translate text and cannot interpret it.`

- 说明

  - 自定义 System Prompt，填写则会覆盖默认的 System Prompt

  - 自定义 Prompt可使用以下变量：

    1. `$text`：需要翻译的文本，即翻译窗口输入框内的文本

    2. `$sourceLang`：原文语言，即翻译窗口输入框内文本的语言，比如「简体中文」

    3. `$targetLang`：目标语言，即需要翻译成的语言，可以在翻译窗口中手动选择或自动检测，比如「English」

### 用户指令

- 可选项

- 默认值：`translate from $sourceLang to $targetLang:\n\n$text`

- 说明

  - 自定义 User Prompt，填写则会覆盖默认的 User Prompt

  - 可以使用与系统指令中相同的变量

### 流式输出

- 可选项

- 默认值：`Enable`

- 说明

  - 启用后翻译结果会实时显示

  - 禁用后会等待翻译完成后一次性显示
  - Doubao Seed Transformer 暂不支持流式返回，插件会强制使用非流式逻辑

### 温度

- 可选项

- 默认值：`0.2`

- 说明

  - 温度值越高，生成的文本越随机，更有创意

  - 翻译任务建议设置在 `0.2` 左右，润色任务可以适当调高，如果需要严谨性，可以设置为 `0`
