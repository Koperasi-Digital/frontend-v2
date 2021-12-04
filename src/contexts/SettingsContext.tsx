import { ReactNode, createContext } from 'react';
// hooks
import useLocalStorage from '../hooks/useLocalStorage';
// @type
import { ThemeMode, SettingsContextProps } from '../@types/settings';

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  themeMode: 'light',
  onChangeMode: () => {}
};

const SettingsContext = createContext(initialState);

type SettingsProviderProps = {
  children: ReactNode;
};

function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: initialState.themeMode
  });

  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeMode: (event.target as HTMLInputElement).value as ThemeMode
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
