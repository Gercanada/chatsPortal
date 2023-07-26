import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppRouter } from './router';
import { lightTheme, darkTheme } from './themes';

export const App = () => {
  const { isLightTheme } = useSelector((state) => state.ui);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
};
