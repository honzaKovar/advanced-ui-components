import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';

import { theme } from './constants';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
