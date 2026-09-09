import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HOW_TO_STEPS } from '../data/content';
import { colors, fonts, spacing } from '../theme';

/** Assi delle Sappadine — 260×476 px */
const CARD_RATIO = 260 / 476;
const SEME_GAP = 8;

const SEMI = [
  { key: 'sci', label: 'Sci', season: 'inverno', source: require('../../assets/sappadine/asso-sci.png') },
  { key: 'stelle', label: 'Stelle Alpine', season: 'primavera', source: require('../../assets/sappadine/asso-stelle.png') },
  { key: 'rastrelli', label: 'Rastrelli', season: 'estate', source: require('../../assets/sappadine/asso-rastrelli.png') },
  { key: 'porcini', label: 'Porcini', season: 'autunno', source: require('../../assets/sappadine/asso-porcini.png') },
] as const;

export function HowToPlayScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  // Larghezza schermo meno i padding (schermata + card) e i 3 spazi tra le carte.
  const semeWidth = Math.min(
    Math.floor((width - spacing.md * 4 - SEME_GAP * 3) / 4),
    104,
  );
  const semeHeight = Math.round(semeWidth / CARD_RATIO);

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 32,
        paddingHorizontal: spacing.md,
        gap: spacing.md,
      }}
    >
      <Text style={styles.title}>Come giocare</Text>
      <Text style={styles.lead}>
        Guida rapida al tavolo e all’uso del segnapunti. Le carte restano in mano; l’app
        segna solo.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>I semi</Text>
        <Text style={styles.line}>
          Quattro semi, quattro stagioni di Sappada. Qui gli assi delle Sappadine.
        </Text>
        <View style={styles.semiRow}>
          {SEMI.map((seme) => (
            <View key={seme.key} style={[styles.semeItem, { width: semeWidth }]}>
              <Image
                source={seme.source}
                style={{ width: semeWidth, height: semeHeight }}
                resizeMode="contain"
                accessibilityLabel={seme.label}
              />
              <Text style={styles.semeLabel} numberOfLines={2}>
                {seme.label}
              </Text>
              <Text style={styles.semeSeason}>{seme.season}</Text>
            </View>
          ))}
        </View>
      </View>

      {HOW_TO_STEPS.map((step) => (
        <View key={step.title} style={styles.card}>
          <Text style={styles.cardTitle}>{step.title}</Text>
          <Text style={styles.line}>{step.text}</Text>
        </View>
      ))}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Scorciatoie del segnapunti</Text>
        <Text style={styles.line}>• Turno normale — posta base (2, o 3 dopo la X).</Text>
        <Text style={styles.line}>• Inizia Orbi — posta 3; scegli chi ha chiamato.</Text>
        <Text style={styles.line}>• +1 / 3 / 4 / 5 — imposta la posta del tavolo.</Text>
        <Text style={styles.line}>• Orbi rifiutato — +2 automatici a chi ha chiamato.</Text>
        <Text style={styles.line}>• Abbandono — l’altra coppia prende (regola della X).</Text>
        <Text style={styles.line}>• Home — torna alla schermata iniziale.</Text>
        <Text style={styles.line}>• Nuova — ricomincia la partita (stessi nomi).</Text>
        <Text style={styles.line}>• Annulla ultimo / ±1 — correggi senza drammi.</Text>
        <Text style={styles.line}>• Rivincita — azzera tenendo i nomi.</Text>
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
  lead: {
    fontFamily: fonts.body,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
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
    color: colors.sci,
    fontSize: 17,
  },
  line: {
    fontFamily: fonts.body,
    color: colors.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  semiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SEME_GAP,
    marginTop: 4,
  },
  semeItem: {
    alignItems: 'center',
    gap: 4,
  },
  semeLabel: {
    fontFamily: fonts.bodyMedium,
    color: colors.ink,
    fontSize: 11,
    textAlign: 'center',
  },
  semeSeason: {
    fontFamily: fonts.body,
    color: colors.muted,
    fontSize: 10,
    textAlign: 'center',
  },
});
