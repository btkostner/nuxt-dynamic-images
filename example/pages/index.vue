<template>
  <main class="p-4 max-w-3xl mx-auto xl:max-w-5xl">
    <div class="py-8 space-y-2 md:space-y-5">
      <h1 class="text-3xl font-extrabold">
        example page
      </h1>
    </div>

    <ul>
      <li>
        <nuxt-link class="text-gray-900" to="/post">
          Example social media post
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  head: {
    title: 'Examples'
  }
}
</script>
