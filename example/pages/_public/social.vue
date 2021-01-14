<template>
  <div class="min-h-screen grid place-items-center place-content-center">
    <!--
      Here is the element we are going to take a photo of. I've added a ring
      effect to it so it's easier to debug and design, but that is purely
      optional, as is the centering above.
    -->
    <div
      id="image"
      :class="`ring-4 ring-offset-2 ring-black rounded flex items-center ${field}`"
    >
      <div class="m-8">
        <h1 class="text-3xl leading-9 font-display text-gray-900">
          {{ post.title }}
        </h1>

        <h2 class="mt-6 text-2xl leading-7 text-gray-500">
          Published {{ humanDate(post.createdAt) }}
        </h2>

        <div class="text-base leading-6 font-medium mt-6">
          <nuxt-link
            class="text-red-700 hover:text-red-800"
            :aria-label="`Read &quot;${post.title}&quot;`"
            :to="`/blog/${post.slug}`"
          >
            View Page →
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, ssrContext }) {
    // `contentPath` can be given as the only argument to `$content` to get the
    // original document back. `contentField` is the field we are generating
    // for. By default this would be `twitterImage`, `facebookImage`, etc.
    const { contentPath, contentField } = ssrContext

    const post = await $content(contentPath).fetch()

    return { post, field: contentField }
  },

  methods: {
    humanDate (v) {
      const localization = (process.client) ? undefined : 'en-US'

      return new Date(v).toLocaleDateString(localization, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
  /** Make sure to hard set the sizes you want here. */
  .facebookImage {
    height: 628px;
    width: 1200px;
  }

  .twitterImage {
    height: 335px;
    width: 600px;
  }
</style>
