// ----------------------------------------------------------------------

export type ThemeMode = 'light' | 'dark';

export type SettingsContextProps = {
  themeMode: ThemeMode;
  themeStretch: boolean;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleStretch: VoidFunction;
};
