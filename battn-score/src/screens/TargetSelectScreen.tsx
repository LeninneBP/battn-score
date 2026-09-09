import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BattnLogo } from '../components/BattnLogo';
import { colors, fonts, spacing } from '../theme';
import { TARGET_OPTIONS, TargetScore, xMarkFor } from '../types';

export const targetBgSource = require('../../assets/sappadine/card-stelle.png');

type Props = {
  onSelect: (target: TargetScore) => void;
  onBack?: () => void;
};

const LABELS: Record<TargetScore, string> = {
  11: 'Partita breve',
  16: 'Partita media',
  21: 'Partita classica',
};

export function TargetSelectScreen({ onSelect, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const logoWidth = Math.min(width - 48, 220);

  return (
    <View style={styles.root}>
      <Image
        source={targetBgSource}
        style={{ position: 'absolute', width, height, opacity: 0.1 }}
        resizeMode="cover"
        fadeDuration={0}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />

      <View
        style={[
          styles.frame,
          { paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom, 16) + 8 },
        ]}
      >
        <View style={styles.top}>
          <BattnLogo width={logoWidth} />
          <Text style={styles.title}>Fino a quanti punti?</Text>
          <Text style={styles.lead}>
            Scegli la meta della partita. La X appare due punti prima.
          </Text>
        </View>

        <View style={styles.options}>
          {TARGET_OPTIONS.map((target) => (
            <Pressable
              key={target}
              accessibilityRole="button"
              onPress={() => onSelect(target)}
              style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
            >
              <Text style={styles.optionScore}>{target}</Text>
              <View style={styles.optionCopy}>
                <Text style={styles.optionLabel}>{LABELS[target]}</Text>
                <Text style={styles.optionHint}>
                  X a {xMarkFor(target)} · vittoria a {target}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {onBack ? (
          <Pressable onPress={onBack} accessibilityRole="button" style={styles.back}>
            <Text style={styles.backText}>Indietro</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  frame: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    gap: 28,
  },
  top: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: fonts.displaySoft,
    fontSize: 26,
    color: colors.ink,
    textAlign: 'center',
    marginTop: 12,
  },
  lead: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 320,
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  optionPressed: {
    opacity: 0.88,
    backgroundColor: colors.bgSoft,
  },
  optionScore: {
    fontFamily: fonts.display,
    fontSize: 42,
    color: colors.straw,
    minWidth: 64,
    textAlign: 'center',
  },
  optionCopy: {
    flex: 1,
    gap: 2,
  },
  optionLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    color: colors.ink,
  },
  optionHint: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
  },
  back: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  backText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.muted,
  },
});
