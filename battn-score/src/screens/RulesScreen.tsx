import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RULE_SECTIONS } from '../data/content';
import { colors, fonts, spacing } from '../theme';

export function RulesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 32,
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
      }}
    >
      <Text style={styles.title}>Regole</Text>
      <Text style={styles.lead}>
        Tutto il tavolo: Critici, Orbi, posta, X dei 19 e regole extra. Basato sul
        regolamento Plodar Battn / Le Sappadine.
      </Text>

      {RULE_SECTIONS.map((section) => (
        <View key={section.id} style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            {section.badge ? <Text style={styles.badge}>{section.badge}</Text> : null}
          </View>
          {section.body.map((line) => (
            <Text key={line} style={styles.line}>
              {line}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  title: {
    fontFamily: fonts.displaySoft,
    fontSize: 36,
    color: colors.ink,
  },
  lead: {
    fontFamily: fonts.body,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.bgElevated,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 8,
  },
  cardHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  cardTitle: {
    flex: 1,
    fontFamily: fonts.bodyBold,
    color: colors.porcini,
    fontSize: 17,
  },
  badge: {
    fontFamily: fonts.bodyBold,
    color: colors.snow,
    backgroundColor: colors.sci,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 11,
  },
  line: {
    fontFamily: fonts.body,
    color: colors.ink,
    fontSize: 14,
    lineHeight: 21,
  },
});
