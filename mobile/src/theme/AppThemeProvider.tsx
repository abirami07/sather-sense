import React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { colors } from './colors';

const navigationTheme = {
  dark: true,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.secondary
  }
};

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>;
};

