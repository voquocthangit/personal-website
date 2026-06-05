export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      title: 'thang vo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'frontend dev exploring AI. notes, experiments, things i make.' },
        { name: 'color-scheme', content: 'light dark' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap',
        },
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          tagPosition: 'head',
          type: 'text/javascript',
        },
      ],
    },
  },
  content: {
    highlight: {
      theme: 'github-light',
      langs: ['js', 'ts', 'vue', 'bash', 'json', 'md', 'html', 'css'],
    },
    markdown: {
      anchorLinks: false,
    },
  },
  nitro: {
    preset: 'vercel',
  },
})
