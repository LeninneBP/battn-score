import React, { useState } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors, fonts } from '../theme';

export const battnLogoSource = require('../../assets/sappadine/battn-logo-clear.png');

/** PNG original 835×302 — height / width */
const LOGO_RATIO = 302 / 835;

type Props = {
  width?: number;
};

/** Logo illustrato BATTN (le due T = rastrelli) — immagine originale. */
export function BattnLogo({ width }: Props) {
  const { width: screenW } = useWindowDimensions();
  const [failed, setFailed] = useState(false);
  const w = Math.round(width ?? Math.min(screenW * 0.62, 200));
  const h = Math.round(w * LOGO_RATIO);

  if (failed) {
    return (
      <View style={[styles.fallback, { width: w }]}>
        <Text style={[styles.fallbackText, { fontSize: Math.max(22, Math.round(w * 0.18)) }]}>
          BATTN
        </Text>
      </View>
    );
  }

  return (
    <View style={{ width: w, height: h }}>
      <Image
        source={battnLogoSource}
        style={{ width: w, height: h }}
        resizeMode="contain"
        fadeDuration={0}
        accessibilityLabel="BATTN"
        onError={() => setFailed(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  fallbackText: {
    fontFamily: fonts.display,
    color: colors.ink,
    letterSpacing: 1,
  },
});
