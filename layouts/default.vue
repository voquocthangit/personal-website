<script setup lang="ts">
const { theme, toggle } = useTheme()
</script>

<template>
  <div class="wrap">
    <header class="site-header">
      <NuxtLink to="/" class="brand">thang vo</NuxtLink>
      <nav>
        <NuxtLink to="/blog">blog</NuxtLink>
        <NuxtLink to="/about">about</NuxtLink>
        <ClientOnly>
          <button
            class="theme-toggle"
            type="button"
            :aria-label="`switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
            @click="toggle"
          >
            {{ theme === 'dark' ? '☀' : '☾' }}
          </button>
          <template #fallback>
            <span class="theme-toggle" aria-hidden="true">·</span>
          </template>
        </ClientOnly>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer class="site-footer">
      <span>© {{ new Date().getFullYear() }}</span>
      <span>
        <a href="https://github.com/voquocthangit" target="_blank" rel="noopener">github</a>
        ·
        <a href="mailto:voquocthangit@gmail.com">email</a>
      </span>
    </footer>
  </div>
</template>
