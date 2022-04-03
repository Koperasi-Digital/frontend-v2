// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
import useAuth from './hooks/useAuth';
// components
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';
import { requestFirebaseNotificationPermission } from './firebase';

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();
  requestFirebaseNotificationPermission();

  return (
    <ThemeConfig>
      <NotistackProvider>
        <GlobalStyles />
        <ProgressBarStyle />
        <BaseOptionChartStyle />
        <ScrollToTop />
        <GoogleAnalytics />
        {isInitialized ? <Router /> : <LoadingScreen />}
      </NotistackProvider>
    </ThemeConfig>
  );
}
