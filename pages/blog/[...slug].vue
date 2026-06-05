<script setup lang="ts">
const route = useRoute()
const path = route.path

const { data: post } = await useAsyncData(`post-${path}`, () =>
  queryContent(path).findOne(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'post not found', fatal: true })
}

useHead({
  title: `${post.value.title} · thang vo`,
  meta: [{ name: 'description', content: post.value.description || '' }],
})

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
</script>

<template>
  <article class="post" v-if="post">
    <NuxtLink to="/blog" class="back-link">← quay lại</NuxtLink>
    <header>
      <p class="meta">
        <time>{{ fmt(post.date) }}</time>
      </p>
      <h1>{{ post.title }}</h1>
    </header>
    <div class="body">
      <ContentRenderer :value="post" />
    </div>
  </article>
</template>
