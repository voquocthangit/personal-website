<script setup lang="ts">
useHead({ title: 'blog · thang vo' })

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })

const { data: posts } = await useAsyncData('blog-list', () =>
  queryContent('/blog')
    .where({ _partial: false, draft: { $ne: true } })
    .sort({ date: -1 })
    .only(['_path', 'title', 'date'])
    .find(),
)

</script>

<template>
  <section>
    <p class="section-title">tất cả bài viết</p>
    <ul class="post-list">
      <li v-for="post in posts" :key="post._path">
        <time>{{ fmt(post.date) }}</time>
        <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
      </li>
      <li v-if="!posts?.length">
        <time>—</time>
        <span style="color: var(--muted)">chưa có bài nào.</span>
      </li>
    </ul>
  </section>
</template>
