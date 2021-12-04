// ----------------------------------------------------------------------

export type ThemeMode = 'light' | 'dark';

export type SettingsContextProps = {
  themeMode: ThemeMode;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
