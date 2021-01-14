<template>
  <main class="p-4 max-w-3xl mx-auto xl:max-w-5xl">
    <div class="py-8 space-y-2 md:space-y-5">
      <h1 class="text-3xl font-extrabold">
        {{ doc.title }}
      </h1>
    </div>

    <article>
      <nuxt-content :document="doc" />
    </article>

    <img
      v-if="doc.twitterImage"
      :src="doc.twitterImage"
      alt="Twitter image"
    >

    <img
      v-if="doc.facebookImage"
      :src="doc.facebookImage"
      alt="Facebook image"
    >
  </main>
</template>

<script>
export default {

  asyncData: async ({ $content, error, params }) => ({
    doc: await $content(params.post)
      .fetch()
      .catch(_ => error({ statusCode: 404, message: 'Page Not Found' }))
  }),
  head () {
    return {
      title: this.doc.title,

      meta: [
        { hid: 'og:title', name: 'twitter:title', content: this.doc.title },
        { hid: 'og:image', name: 'og:image', content: `http://localhost:3000/${this.doc.facebookImage}` },
        { hid: 'og:url', name: 'og:url', content: `http://localhost:3000/${this.doc.slug}` },

        { hid: 'twitter:title', name: 'twitter:title', content: this.doc.title },
        { hid: 'twitter:image', name: 'twitter:image', content: `http://localhost:3000${this.doc.twitterImage}` },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.doc.title },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  }
}
</script>
