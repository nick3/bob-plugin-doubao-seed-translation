<h4 align="right">
  <a href="https://github.com/nick3/bob-plugin-doubao-seed-translation/blob/main/README.md">简体中文</a> | <strong>English</strong>
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
> When connecting to Doubao Seed Transformer, set `Stream Output` to `Disable` and leave the System/User prompts blank to apply the built-in defaults.

## Introduction

ChatGPT showcases the greatness of GPT models, so I have implemented the Bob translation + polishing + grammar modification plugin using OpenAI's API, with outstanding results!

This repository is a fork of yetone's original [OpenAI Translator Bob Plugin](https://github.com/openai-translator/bob-plugin-openai-translator). Key differences highlight:
- Doubao Seed Transformer is now a first-class provider with a model preset and non-streaming handling tailored to the EdgeOne adapter;
- Configuration manuals clarify that Doubao requires disabling streaming while keeping System/User prompts empty for the default prompts;
- Plugin metadata, packaging artifacts, and release automation now reference `nick3/bob-plugin-doubao-seed-translation` and the renamed package.

The plugin now works with OpenAI, OpenAI Compatible services, Azure OpenAI, Google Gemini, and the Doubao Seed Transformer edge adapter. Doubao currently responds only in non-streaming mode—the plugin falls back automatically, and you can keep the System/User prompts empty to use the built-in defaults.

<details>

<summary>Demonstration 👀</summary>

![demo](https://user-images.githubusercontent.com/1206493/219937398-8e5bb8d2-7dc8-404a-96e7-a937e08c939f.gif)

</details>

### Polishing Feature

This plugin supports polishing sentences and modifying grammar using the OpenAI API. To do so, just set the target language to be the same as the source language. It's a comprehensive alternative to Grammarly! And in theory, any language can be polished, not just English.

## Usage

1. Install [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85) (version >= 0.50), a macOS translation and OCR software

2. Download this plugin: [doubao-seed-translation.bobplugin](https://github.com/nick3/bob-plugin-doubao-seed-translation/releases/latest)

3. <details>

   <summary>Install this plugin 👀</summary>

   ![Installation Steps](https://user-images.githubusercontent.com/1206493/219937302-6be8d362-1520-4906-b8d6-284d01012837.gif)

   </details>

4. Get your API KEY from [OpenAI](https://platform.openai.com/account/api-keys)

5. Enter the API KEY in Bob Preferences > Services > This plugin configuration interface's API KEY input box:
    - If you would like to learn more about other settings, please refer to the [Configuration Manual](./docs/configuration_manual_EN.md)

      <details>

      <summary>Settings Steps 👀</summary>

      ![Settings Steps](https://user-images.githubusercontent.com/1206493/219937398-8e5bb8d2-7dc8-404a-96e7-a937e08c939f.gif)

      </details>

6. <details>

   <summary>Install PopClip for highlighted text mouse proximity floating icon 👀</summary>

   [![PopClip](https://user-images.githubusercontent.com/1206493/219933584-d0c2b6cf-8fa0-40a6-858f-8f4bf05f38ef.gif)](https://bobtranslate.com/guide/integration/popclip.html)

   </details>


## Contributing

If you want to contribute to Renovate or get a local copy running, please read the instructions in [contributing guidelines](../.github/contributing.md). To get started look at the list of [good first issues](https://github.com/nick3/bob-plugin-doubao-seed-translation/contribute).

## Thanks

I'm just a small Bob plugin, and the powerful part is Bob itself. I pay tribute to its developer [ripperhe](https://github.com/ripperhe)!
