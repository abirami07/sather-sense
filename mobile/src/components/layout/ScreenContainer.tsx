import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
}

/**
 * Standard wrapper for all screens.
 * - Applies safe area padding
 * - Sets background color
 * - Adds consistent horizontal padding
 */
const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, style, ...rest }) => {
  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg
  }
});

export default ScreenContainer;

