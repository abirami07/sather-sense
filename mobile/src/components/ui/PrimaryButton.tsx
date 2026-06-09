import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle
} from 'react-native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import AccessibleText from './AccessibleText';

interface PrimaryButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

/**
 * Large, high-contrast button designed for accessibility.
 */
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  style,
  textStyle,
  accessibilityLabel
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint="Double tap to activate"
    >
      <AccessibleText
        variant="subheading"
        style={[styles.label, textStyle]}
      >
        {label}
      </AccessibleText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 60,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.sm
  },
  label: {
    color: colors.primaryText
  }
});

export default PrimaryButton;

