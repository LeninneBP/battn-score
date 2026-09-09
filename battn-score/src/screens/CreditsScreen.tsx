import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../components/AppButton';
import { colors, fonts, spacing } from '../theme';

export function CreditsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: insets.top + 16,
        paddingBottom: 12,
        paddingHorizontal: spacing.md,
        gap: spacing.md,
      }}
    >
      <Text style={styles.title}>Crediti</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tradizione</Text>
        <Text style={styles.line}>
          Battn / Plodar Battn — gioco di carte tradizionale di Sappada (Plodn),tramandato di generazioni in generazioni e ancora oggi
          parte viva della socialità e della cultura della valle.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Le Sappadine</Text>
        <Text style={styles.line}>
          Le Sappadine è il mazzo di carte dedicato al Battn e alla cultura di Sappada 
          Stampato da Dal Negro, con le illustrazioni di Giorgio Berg (Giorgio
          Costan Durigon), nasce da un progetto dell’Associazione Mario con noi per valorizzare e mantenere viva la tradizione del Battn.
        </Text>
        <AppButton
          label="Scopri Le Sappadine"
          variant="ice"
          compact
          onPress={() => Linking.openURL('https://www.lesappadine.com/')}
          style={{ marginTop: 8 }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Questa app</Text>
        <Text style={styles.line}>
          Sviluppata da Leninne Bodnar Pirovano in omaggio a tutti i giocatori di Battn.
        </Text>
        <Text style={styles.line}>
          Segnapunti offline per onorare la tradizione e facilitare il conteggio.
        </Text>
      </View>

      <View style={styles.footerWrap}>
        <Text style={styles.footer}>
          Developed by Leninne Bodnar Pirovano - Sappada 2026
        </Text>
      </View>
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
  card: {
    backgroundColor: colors.bgElevated,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 8,
  },
  cardTitle: {
    fontFamily: fonts.bodyBold,
    color: colors.porcini,
    fontSize: 17,
  },
  line: {
    fontFamily: fonts.body,
    color: colors.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  footerWrap: {
    marginTop: 'auto',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: 4,
  },
  footer: {
    fontFamily: fonts.displaySoft,
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
  },
});
