# nuxt-dynamic-images

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![semantic-release][semantic-release-src]][semantic-release-href]
[![License][license-src]][license-href]

## Features

- Generate social media images from `@nuxt/content` documents
- Design and build in any css framework you want

_NOTE_ This only works with `nuxt generate` with `ssr: true`

## Quick Setup

1. Add `nuxt-dynamic-images` dependency to your nuxt project that already uses
`@nuxt/content`.

```bash
# using yarn
yarn add nuxt-dynamic-images

# using npm
npm install nuxt-dynamic-images
```

2. Add `nuxt-dynamic-images` to the `buildModules` section of
`nuxt.config.js`

```js
{
  buildModules: [
    // Simple usage
    'nuxt-dynamic-images',

    // With options
    ['nuxt-dynamic-images', { /* module options */ }]
  ]
}
```

Or a separate section `dynamicImages` for module options:

```js
{
  buildModules: [
    // Simple usage
    'nuxt-dynamic-images',
  ],
  dynamicImages: {
    /* module options */
  }
}
```

## Options

`nuxt-dynamic-images` has the following configuration options:

- `fields: Array<string>` A list of all the fields `nuxt-dynamic-images`
will generate from in the `@nuxt/content` folder. By default this is
`['twitterImage', 'facebookImage']`.

- `elSelector: string` The DOM selector `puppeteer` will screenshot. By default
this is `#image`.

- `publicPath: string` The public path _inside_ the nuxt public path where
images will be saved. By default this is `/images` so generated images
(by default) will have a url like `/_nuxt/images/post-twitterImage.png`.

- `puppeteerOptions?: any` Raw options to give to `puppeteer.launch()`. By
default this is an empty object.

## Usage

For a complete usage example, see the `example/` directory. But here is a short
run down with the default configuration:

1) Create some `@nuxt/content` files with image fields:

```yaml
---

title: Example Blog Post!

facebookImage: /_public/social
twitterImage: /_public/social

---

Here is an example `@nuxt/content` document with a generated social media
images!
```

2) Create a page at `/_public/social`:

```vue
<template>
  <div :class="${field}" id="image">
    <h1>{{ post.title }}</h1>
    <h2>{{ post.createdAt }}</h2>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, ssrContext }) {
    const { contentPath, contentField } = ssrContext
    const post = await $content(contentPath).fetch()

    return { post, field: contentField }
  }
}
</script>

<style scoped>
  .facebookImage {
    height: 628px;
    width: 1200px;
  }

  .twitterImage {
    height: 335px;
    width: 600px;
  }
</style>
```

## TODO

Follow the [GitHub issues](https://github.com/btkostner/nuxt-dynamic-images)
for a more up to date status, but here is a general list of next steps:

- Setup caching
- Get some working setup when using `nuxt dev`
- A better DX setup so you can view the images while designing them (no longer
use `ssrContext`)
- Documentation site
- Try to figure out a more sane default configuration
- Tests

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start hacking away!

## License

[MIT License](./LICENSE)

Copyright (c)

Maintained by [Blake Kostner](https://github.com/btkostner)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-dynamic-images/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-dynamic-images

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-dynamic-images
[npm-downloads-href]: https://npmjs.com/package/nuxt-dynamic-images

[github-actions-ci-src]: https://github.com/btkostner/nuxt-dynamic-images/workflows/CI/badge.svg
[github-actions-ci-href]: https://github.com/btkostner/nuxt-dynamic-images/actions?query=workflow%3ACI

[semantic-release-src]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-href]: https://github.com/semantic-release/semantic-release

[license-src]: https://img.shields.io/npm/l/nuxt-dynamic-images.svg
[license-href]: https://npmjs.com/package/nuxt-dynamic-images
