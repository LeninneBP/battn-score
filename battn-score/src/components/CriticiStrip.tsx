import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '../theme';

const ITEMS = [
  { rank: '1', name: 'Barba', detail: 'Re di Porcini (Port)' },
  { rank: '2', name: 'Belli', detail: '4 Stelle Alpine' },
  { rank: '3', name: 'Spitz', detail: '7 Rastrelli' },
];

export function CriticiStrip() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Critici · le più forti</Text>
      <View style={styles.row}>
        {ITEMS.map((item) => (
          <View key={item.rank} style={styles.card}>
            <Text style={styles.rank}>{item.rank}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>{item.detail}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.bgElevated,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 10,
  },
  title: {
    fontFamily: fonts.bodyBold,
    color: colors.porcini,
    fontSize: 13,
  },
  row: { flexDirection: 'row', gap: 8 },
  card: {
    flex: 1,
    backgroundColor: colors.bgSoft,
    borderRadius: 12,
    padding: 8,
    gap: 2,
  },
  rank: {
    fontFamily: fonts.display,
    color: colors.sci,
    fontSize: 18,
  },
  name: {
    fontFamily: fonts.bodyBold,
    color: colors.ink,
    fontSize: 13,
  },
  detail: {
    fontFamily: fonts.body,
    color: colors.muted,
    fontSize: 11,
  },
});
