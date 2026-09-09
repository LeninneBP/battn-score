import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

type Suit = 'sci' | 'stelle' | 'rastrelli' | 'porcini';

const images: Record<Suit, number> = {
  sci: require('../../assets/sappadine/sci.png'),
  stelle: require('../../assets/sappadine/stelle.png'),
  rastrelli: require('../../assets/sappadine/rastrelli.png'),
  porcini: require('../../assets/sappadine/porcini.png'),
};

const labels: Record<Suit, string> = {
  sci: 'Sci',
  stelle: 'Stelle Alpine',
  rastrelli: 'Rastrelli',
  porcini: 'Porcini',
};

const accents: Record<Suit, string> = {
  sci: colors.sci,
  stelle: colors.stelle,
  rastrelli: colors.rastrelli,
  porcini: colors.porcini,
};

export function SuitIllustration({
  suit,
  size = 56,
  showLabel = true,
}: {
  suit: Suit;
  size?: number;
  showLabel?: boolean;
}) {
  const disc = Math.max(size + 20, 72);
  return (
    <View style={styles.wrap}>
      <View style={[styles.disc, { width: disc, height: disc, borderRadius: disc / 2, borderColor: accents[suit] }]}>
        <Image
          source={images[suit]}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </View>
      {showLabel ? (
        <Text style={[styles.label, { color: accents[suit] }]}>{labels[suit]}</Text>
      ) : null}
    </View>
  );
}

export function SuitRow({ size = 52 }: { size?: number }) {
  return (
    <View style={styles.row}>
      {(['sci', 'stelle', 'rastrelli', 'porcini'] as Suit[]).map((suit) => (
        <SuitIllustration key={suit} suit={suit} size={size} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 6, flex: 1 },
  disc: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    width: '100%',
  },
});
