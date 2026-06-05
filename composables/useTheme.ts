type Theme = 'light' | 'dark'

export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'light')

  onMounted(() => {
    const current = document.documentElement.getAttribute('data-theme') as Theme | null
    if (current === 'light' || current === 'dark') theme.value = current
  })

  const toggle = () => {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    theme.value = next
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', next)
      try { localStorage.setItem('theme', next) } catch {}
    }
  }

  return { theme, toggle }
}
