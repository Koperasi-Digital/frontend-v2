// ----------------------------------------------------------------------

export type ThemeMode = 'light' | 'dark';

export type SettingsContextProps = {
  themeMode: ThemeMode;
  toggleChangeMode: () => void;
};
