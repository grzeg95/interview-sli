export interface Theme {
  value: string,
  label: string
}

export interface ThemeConfig {
  themes: Theme[],
  defaultTheme: string
}
