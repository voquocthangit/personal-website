<script setup lang="ts">
const { data: posts } = await useAsyncData('home-posts', () =>
  queryContent('/blog')
    .where({ _partial: false, draft: { $ne: true } })
    .sort({ date: -1 })
    .only(['_path', 'title', 'date'])
    .limit(5)
    .find(),
)

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
</script>

<template>
  <section class="intro">
    <h1>chào <span class="wave">👋</span></h1>
    <p class="tagline">
      mình là thang — một frontend dev đang lò mò với AI. đây là nơi mình ghi
      lại những thứ mình làm, những thứ vỡ ra, và những thứ mình học được.
    </p>

    <p class="section-title">bài viết gần đây</p>
    <ul class="post-list">
      <li v-for="post in posts" :key="post._path">
        <time>{{ fmt(post.date) }}</time>
        <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
      </li>
      <li v-if="!posts?.length">
        <time>—</time>
        <span style="color: var(--muted)">chưa có gì cả. sắp có.</span>
      </li>
    </ul>
  </section>
</template>
