import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';

interface AccessibleTextProps extends TextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'small';
}

/**
 * Text component with:
 * - large, readable font sizes
 * - high contrast color
 */
const AccessibleText: React.FC<AccessibleTextProps> = ({
  children,
  variant = 'body',
  style,
  ...rest
}) => {
  return (
    <Text
      accessible
      style={[styles.base, styles[variant], style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: colors.text
  },
  heading: {
    fontSize: typography.heading,
    fontWeight: '700',
    marginBottom: 8
  },
  subheading: {
    fontSize: typography.subheading,
    fontWeight: '600',
    marginBottom: 8
  },
  body: {
    fontSize: typography.body
  },
  small: {
    fontSize: typography.small
  }
});

export default AccessibleText;

