import React from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../components/AppButton';
import { BattnLogo } from '../components/BattnLogo';
import { colors, fonts, spacing } from '../theme';

export const welcomeBgSource = require('../../assets/sappadine/card-rollate.png');

type Props = {
  onStart: () => void;
};

export function WelcomeScreen({ onStart }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const compact = height < 700;
  const logoWidth = Math.min(width - 48, 220);
  // Allinea l'altezza del logo a quella della schermata di selezione punti.
  const topOffset = Math.round(height * (compact ? 0.1 : 0.155));

  return (
    <View style={styles.root}>
      <Image
        source={welcomeBgSource}
        style={{
          position: 'absolute',
          width,
          height,
          opacity: 0.1,
        }}
        resizeMode="cover"
        fadeDuration={0}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />

      <View
        style={[
          styles.frame,
          {
            paddingTop: insets.top + topOffset,
            paddingBottom: insets.bottom + 16,
          },
        ]}
      >
        <View style={styles.top}>
          <BattnLogo width={logoWidth} />
          <Text style={styles.tagline}>Segnapunti di Plodar Battn</Text>
          <Text style={[styles.lead, compact && styles.leadCompact]}>
            Sci, Stelle Alpine, Rastrelli e Porcini — il tavolo di Sappada, senza carta e
            penna.
          </Text>
        </View>

        <View style={styles.footer}>
          <AppButton label="Inizia" variant="straw" onPress={onStart} />
          <Text style={styles.gelopsis}>Gelopsis Chrischtis</Text>
        </View>
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
    justifyContent: 'space-between',
  },
  top: {
    alignItems: 'center',
    gap: 10,
  },
  tagline: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.porcini,
    marginTop: 4,
  },
  lead: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 340,
  },
  leadCompact: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    gap: 12,
  },
  gelopsis: {
    fontFamily: fonts.displaySoft,
    textAlign: 'center',
    color: colors.muted,
    fontSize: 14,
  },
});
