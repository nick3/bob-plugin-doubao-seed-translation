<h4 align="right">
  <strong>简体中文</strong> | <a href="https://github.com/nick3/bob-plugin-doubao-seed-translation/blob/main/docs/README_EN.md">English</a>
</h4>

<div>
  <h1 align="center">Doubao Seed Translation Bob Plugin</h1>
  <p align="center">
    <a href="https://github.com/nick3/bob-plugin-doubao-seed-translation/releases" target="_blank">
        <img alt="release" src="https://github.com/nick3/bob-plugin-doubao-seed-translation/actions/workflows/release.yaml/badge.svg">
    </a>
    <a href="https://github.com/nick3/bob-plugin-doubao-seed-translation/releases">
        <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/nick3/bob-plugin-doubao-seed-translation?style=flat">
    </a>
    <a href="https://github.com/nick3/bob-plugin-doubao-seed-translation/releases">
        <img alt="GitHub Downloads (all assets, all releases)" src="https://img.shields.io/github/downloads/nick3/bob-plugin-doubao-seed-translation/total">
    </a>
    <a href="https://github.com/nick3/bob-plugin-doubao-seed-translation/releases">
        <img alt="language" src="https://img.shields.io/badge/language-TypeScript-brightgreen?style=flat&color=blue">
    </a>
  </p>
</div>

> **Note**
>
> 使用 Doubao Seed Transformer 时，可将 Bob 插件配置中的“流式输出”保持为 `Enable` 以获得实时翻译；若希望一次性展示结果，也可以手动切换为 `Disable`。系统指令与用户指令留空即可沿用默认提示。

## 简介

ChatGPT 向我们展示了 GPT 模型的伟大之处，所以我使用 OpenAI 的 API 实现了这个 Bob 的翻译 + 润色 + 语法修改插件，效果拔群！

本项目基于 yetone 开源的 [OpenAI Translator Bob Plugin](https://github.com/openai-translator/bob-plugin-openai-translator) 二次开发。相比原始项目，当前仓库：
- 新增了 Doubao Seed Transformer 服务提供商与模型预设，并适配其流式响应特性；
- 更新了配置文档，说明 Doubao 支持流式输出且可留空系统/用户指令；
- 重命名插件元数据与发布流程，指向 `nick3/bob-plugin-doubao-seed-translation` 的新仓库与包名。

当前版本同时支持 OpenAI、OpenAI Compatible、Azure OpenAI、Google Gemini 以及 Doubao Seed Transformer（豆包翻译 EdgeOne 适配器）。Doubao 服务现已支持流式输出，可按需启用实时模式，配置时可保持系统/用户指令为空即可使用默认提示。

<details>

<summary>演示 👀</summary>

![演示](https://user-images.githubusercontent.com/1206493/221086195-f1ed941d-4dfa-4aa0-9d47-56c258a8f854.gif)

</details>


### 润色功能

此插件已支持使用 OpenAI API 对句子进行润色和语法修改，只需要把目标语言设置为与源语言一样即可，全面替代 Grammarly！而且理论上任何语言都可以润色，不仅仅是英语。

## 使用方法

1. 安装 [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85) (版本 >= 0.50)，一款 macOS 平台的翻译和 OCR 软件

2. 下载此插件: [doubao-seed-translation.bobplugin](https://github.com/nick3/bob-plugin-doubao-seed-translation/releases/latest)

3. <details>

    <summary>安装此插件 👀</summary>

    ![安装步骤](https://user-images.githubusercontent.com/1206493/219937302-6be8d362-1520-4906-b8d6-284d01012837.gif)

   </details>

4. 去 [OpenAI](https://platform.openai.com/account/api-keys) 获取你的 API KEY

5. 把 API KEY 填入 Bob 偏好设置 > 服务 > 此插件配置界面的 API KEY 的输入框中
    - 如果你想了解关于其他设置的更多信息，请查看[配置手册](./docs/configuration_manual_CN.md)

        <details>

        <summary>演示 👀</summary>

        ![设置步骤](https://user-images.githubusercontent.com/1206493/219937398-8e5bb8d2-7dc8-404a-96e7-a937e08c939f.gif)

        </details>


6. <details>

   <summary>安装 PopClip 实现划词后鼠标附近出现悬浮图标 👀</summary>

   [![PopClip](https://user-images.githubusercontent.com/1206493/219933584-d0c2b6cf-8fa0-40a6-858f-8f4bf05f38ef.gif)](https://bobtranslate.com/guide/integration/popclip.html)

   </details>

## 贡献

如果你想要为 Doubao Seed Translation Bob Plugin 做出贡献，请阅读[贡献指南](.github/contributing.md)中的说明。我们可以先从这个[列表中的问题](https://github.com/nick3/bob-plugin-doubao-seed-translation/contribute)开始。

## 感谢

我这只是个小小的 Bob 插件，强大的是 Bob 本身，向它的开发者 [ripperhe](https://github.com/ripperhe) 致敬！

<!--
<a href="https://api.gitsponsors.com/api/badge/link?p=CCTAcO52X68ppJ/My08020IxahBsfD6PUbrqKuOwPrq9S62VS6Ws2GohPnu+c7iLZCl1VMGgi9XUBFCbUqSf5Tu5kxKOygBDoLTUpUqbpET/qDO3asPc9qXuWMW4025U5MHsXaE0VScm35uM38/z0w==">
  <img src="https://api.gitsponsors.com/api/badge/img?id=603668088" height="90">
</a>
-->
