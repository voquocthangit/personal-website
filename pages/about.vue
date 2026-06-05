<script setup lang="ts">
useHead({ title: 'about · thang vo' })
</script>

<template>
  <section>
    <p class="section-title">about</p>
    <p>
      mình là <strong>thang</strong>, một frontend developer.
      chủ yếu mình làm việc với <a href="https://vuejs.org" target="_blank" rel="noopener">vue</a>,
      và dạo này mình dành phần lớn buổi tối để học cách build mọi thứ với LLM.
    </p>
    <p>
      site này là cuốn sổ tay. mong đợi: bài ngắn, suy nghĩ dang dở, demo có khi
      vỡ trên safari, và thi thoảng vài cái gif.
    </p>

    <p class="section-title" style="margin-top: 2.5rem;">nơi khác</p>
    <ul>
      <li><a href="https://github.com/voquocthangit" target="_blank" rel="noopener">github.com/voquocthangit</a></li>
      <li><a href="mailto:voquocthangit@gmail.com">voquocthangit@gmail.com</a></li>
    </ul>

    <p class="section-title" style="margin-top: 2.5rem;">stack của site</p>
    <ul>
      <li>nuxt 3 + @nuxt/content</li>
      <li>markdown thuần cho bài viết</li>
      <li>deploy trên vercel</li>
    </ul>
  </section>
</template>
