export default {
  ssr: true,
  target: 'static',

  buildModules: [
    '@nuxtjs/tailwindcss',
    // Replace this with 'nuxt-dynamic-images' when using.
    '~/../dist/index.js'
  ],

  modules: [
    '@nuxt/content'
  ]
}
