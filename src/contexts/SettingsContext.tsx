import { ReactNode, createContext } from 'react';
// hooks
import useLocalStorage from '../hooks/useLocalStorage';
// @type
import { SettingsContextProps } from '../@types/settings';

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  themeMode: 'light',
  toggleChangeMode: () => {}
};

const SettingsContext = createContext(initialState);

type SettingsProviderProps = {
  children: ReactNode;
};

function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage<Partial<SettingsContextProps>>('settings', {
    themeMode: initialState.themeMode
  });

  const toggleChangeMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light'
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        toggleChangeMode
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
