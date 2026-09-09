import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { colors, fonts } from '../theme';

type Variant = 'primary' | 'secondary' | 'ice' | 'porcini' | 'danger' | 'ghost' | 'straw';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  compact?: boolean;
};

const bg: Record<Variant, string> = {
  primary: colors.pine,
  secondary: colors.bgSoft,
  ice: colors.sci,
  porcini: colors.porcini,
  danger: colors.danger,
  ghost: 'transparent',
  straw: colors.straw,
};

const fg: Record<Variant, string> = {
  primary: colors.snow,
  secondary: colors.ink,
  ice: colors.snow,
  porcini: colors.snow,
  danger: colors.snow,
  ghost: colors.muted,
  straw: colors.snow,
};

export function AppButton({
  label,
  onPress,
  variant = 'secondary',
  disabled,
  style,
  textStyle,
  compact,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        compact && styles.compact,
        {
          backgroundColor: bg[variant],
          opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
        },
        variant === 'ghost' && styles.ghost,
        style,
      ]}
    >
      <Text style={[styles.label, { color: fg[variant] }, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.line,
  },
  compact: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  ghost: {
    borderColor: colors.line,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    textAlign: 'center',
  },
});
