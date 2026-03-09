const STORAGE_KEY = 'notitia-theme-customization'

export const DEFAULT_THEME = {
  navy: '#00003f',
  blue: '#01008e',
  purple: '#9001f5',
  magenta: '#fe00ea',
  pink: '#ff0178',

  bgPrimary: '#0a0a1a',
  bgSecondary: '#0f0f2a',
  bgTertiary: '#141432',
  bgCard: 'rgba(15, 15, 42, 0.6)',
  bgCardHover: 'rgba(20, 20, 50, 0.8)',
  bgSidebar: '#0c0c24',
  bgCode: '#1a1a3a',

  textPrimary: '#f0f0ff',
  textSecondary: '#a0a0cc',
  textTertiary: '#6a6a9a',
  textAccent: '#c070ff',

  borderColor: 'rgba(144, 1, 245, 0.15)',
  borderHover: 'rgba(144, 1, 245, 0.4)',

  surfaceSolid: '#050520',
  surfaceDeep: '#0a0a2a',
  surfaceDeeper: '#0e0e35',
  brandUi1: '#6a3de8',
  brandUi2: '#9060ff',
  brandUi3: '#ff40c0',
  heroTagText: '#050520',

  radiusSm: 6,
  radiusMd: 10,
  radiusLg: 16,
  radiusXl: 24,
}

function toTheme(theme) {
  return {
    ...DEFAULT_THEME,
    ...theme,
  }
}

export function loadTheme() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_THEME

    const parsed = JSON.parse(raw)
    return toTheme(parsed)
  } catch {
    return DEFAULT_THEME
  }
}

export function saveTheme(theme) {
  const normalized = toTheme(theme)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
}

export function applyTheme(theme) {
  const root = document.documentElement
  const t = toTheme(theme)

  root.style.setProperty('--navy', t.navy)
  root.style.setProperty('--blue', t.blue)
  root.style.setProperty('--purple', t.purple)
  root.style.setProperty('--magenta', t.magenta)
  root.style.setProperty('--pink', t.pink)

  root.style.setProperty('--bg-primary', t.bgPrimary)
  root.style.setProperty('--bg-secondary', t.bgSecondary)
  root.style.setProperty('--bg-tertiary', t.bgTertiary)
  root.style.setProperty('--bg-card', t.bgCard)
  root.style.setProperty('--bg-card-hover', t.bgCardHover)
  root.style.setProperty('--bg-sidebar', t.bgSidebar)
  root.style.setProperty('--bg-code', t.bgCode)

  root.style.setProperty('--text-primary', t.textPrimary)
  root.style.setProperty('--text-secondary', t.textSecondary)
  root.style.setProperty('--text-tertiary', t.textTertiary)
  root.style.setProperty('--text-accent', t.textAccent)

  root.style.setProperty('--border-color', t.borderColor)
  root.style.setProperty('--border-hover', t.borderHover)

  root.style.setProperty('--surface-solid', t.surfaceSolid)
  root.style.setProperty('--surface-deep', t.surfaceDeep)
  root.style.setProperty('--surface-deeper', t.surfaceDeeper)
  root.style.setProperty('--brand-ui-1', t.brandUi1)
  root.style.setProperty('--brand-ui-2', t.brandUi2)
  root.style.setProperty('--brand-ui-3', t.brandUi3)
  root.style.setProperty('--hero-tag-text', t.heroTagText)

  root.style.setProperty('--radius-sm', `${t.radiusSm}px`)
  root.style.setProperty('--radius-md', `${t.radiusMd}px`)
  root.style.setProperty('--radius-lg', `${t.radiusLg}px`)
  root.style.setProperty('--radius-xl', `${t.radiusXl}px`)

  root.style.setProperty(
    '--gradient-brand',
    `linear-gradient(135deg, ${t.blue}, ${t.purple}, ${t.magenta}, ${t.pink})`,
  )
  root.style.setProperty(
    '--gradient-brand-horizontal',
    `linear-gradient(90deg, ${t.blue}, ${t.purple}, ${t.magenta}, ${t.pink})`,
  )
  root.style.setProperty(
    '--gradient-subtle',
    `linear-gradient(135deg, color-mix(in srgb, ${t.blue} 10%, transparent), color-mix(in srgb, ${t.purple} 10%, transparent), color-mix(in srgb, ${t.magenta} 8%, transparent))`,
  )
  root.style.setProperty(
    '--gradient-dark',
    `linear-gradient(180deg, ${t.navy} 0%, ${t.bgPrimary} 100%)`,
  )
}

export function resetTheme() {
  localStorage.removeItem(STORAGE_KEY)
  applyTheme(DEFAULT_THEME)
  return DEFAULT_THEME
}
