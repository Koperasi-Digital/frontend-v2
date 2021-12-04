// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
import useAuth from './hooks/useAuth';
// components
import Settings from './components/settings';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';
import ThemeLocalization from './components/ThemeLocalization';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <ThemeLocalization>
        <NotistackProvider>
          <GlobalStyles />
          <ProgressBarStyle />
          <BaseOptionChartStyle />
          <Settings />
          <ScrollToTop />
          <GoogleAnalytics />
          {isInitialized ? <Router /> : <LoadingScreen />}
        </NotistackProvider>
      </ThemeLocalization>
    </ThemeConfig>
  );
}
