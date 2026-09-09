import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../components/AppButton';
import { BattnLogo } from '../components/BattnLogo';
import { useGame } from '../state/GameContext';
import { colors, fonts, spacing } from '../theme';
import { TeamId, xMarkFor } from '../types';

export const setupBgSource = require('../../assets/sappadine/card-rastrelli.png');

export function ScoreScreen({ onHome }: { onHome: () => void }) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const game = useGame();
  const { state, baseStake } = game;

  const [nameA, setNameA] = useState(state.teamAName === 'Dupla A' ? 'Coppia A' : state.teamAName);
  const [nameB, setNameB] = useState(state.teamBName === 'Dupla B' ? 'Coppia B' : state.teamBName);
  const [orbiCaller, setOrbiCaller] = useState<TeamId>('a');
  const [confirm, setConfirm] = useState<'new' | 'home' | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (state.started && !state.winner) {
          await activateKeepAwakeAsync('battn');
        } else {
          deactivateKeepAwake('battn');
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      try {
        deactivateKeepAwake('battn');
      } catch {
        /* ignore */
      }
    };
  }, [state.started, state.winner]);

  if (!state.started) {
    return (
      <View style={styles.flex}>
      <Image
        source={setupBgSource}
        style={{
          position: 'absolute',
          width: screenWidth,
          height: screenHeight,
          opacity: 0.1,
        }}
        resizeMode="cover"
        fadeDuration={0}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />
      <ScrollView
        style={styles.scrollTransparent}
        contentContainerStyle={[
          styles.setup,
          { paddingTop: insets.top + 20, paddingBottom: spacing.md },
        ]}
      >
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <BattnLogo width={168} />
            <Text style={styles.tagline}>Segnapunti del tavolo · Plodar Battn</Text>
          </View>
          <AppButton label="Home" compact variant="ghost" onPress={() => setConfirm('home')} />
        </View>
        <Text style={styles.setupCopy}>
          Orbi, Critici e posta — senza carta e penna.
          {'\n'}Meta scelta: {state.targetScore} punti (X a {xMarkFor(state.targetScore)}).
        </Text>

        <View style={styles.criticiSetup}>
          <Text style={styles.criticiSetupTitle}>Critici (sempre le più forti)</Text>
          <Text style={styles.criticiSetupLine}>1. Barba — Re di Porcini</Text>
          <Text style={styles.criticiSetupLine}>2. Belli — 4 Stelle Alpine</Text>
          <Text style={styles.criticiSetupLine}>3. Spitz — 7 Rastrelli</Text>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Coppia A</Text>
          <TextInput
            value={nameA}
            onChangeText={setNameA}
            placeholder="Es.: Gianna & Gino"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Coppia B</Text>
          <TextInput
            value={nameB}
            onChangeText={setNameB}
            placeholder="Es.: Nino & Tonile"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>
      </ScrollView>
      <View
        style={[
          styles.setupFooter,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <AppButton
          label="Inizia partita"
          variant="straw"
          onPress={() => game.start(nameA || 'Coppia A', nameB || 'Coppia B')}
        />
      </View>
      <ConfirmDialog
        visible={confirm === 'home'}
        title="Tornare all’inizio?"
        body="Vuoi davvero abbandonare la partita e tornare alla home?"
        confirmLabel="Abbandona"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          setConfirm(null);
          onHome();
        }}
      />
      </View>
    );
  }

  const markA = state.markedNineteen === 'a';
  const markB = state.markedNineteen === 'b';
  // La serie parte solo dalla prima rivincita.
  const seriesActive = state.matchesWonA + state.matchesWonB > 0;
  const orbiWho =
    state.orbiCaller === 'a'
      ? state.teamAName
      : state.orbiCaller === 'b'
        ? state.teamBName
        : orbiCaller === 'a'
          ? state.teamAName
          : state.teamBName;

  return (
    <View style={styles.flex}>
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[
        styles.play,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 28 },
      ]}
    >
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <BattnLogo width={140} />
          <Text style={styles.meta}>
            Meta {state.targetScore} · base {baseStake}
            {markA || markB ? ' · X attiva' : ''}
            {seriesActive ? ` · serie ${state.matchesWonA}–${state.matchesWonB}` : ''}
          </Text>
        </View>
        <AppButton
          label="Home"
          compact
          variant="ghost"
          onPress={() => setConfirm('home')}
        />
        <AppButton
          label="Nuova"
          compact
          variant="ghost"
          onPress={() => setConfirm('new')}
        />
      </View>

      <View style={styles.scoreRow}>
        <TeamScore
          name={state.teamAName}
          score={state.scoreA}
          marked={markA}
          xMark={xMarkFor(state.targetScore)}
          accent={colors.sci}
          matchesWon={state.matchesWonA}
          showSeries={seriesActive}
          onPlus={() => game.adjust('a', 1)}
          onMinus={() => game.adjust('a', -1)}
        />
        <TeamScore
          name={state.teamBName}
          score={state.scoreB}
          marked={markB}
          xMark={xMarkFor(state.targetScore)}
          accent={colors.porcini}
          matchesWon={state.matchesWonB}
          showSeries={seriesActive}
          onPlus={() => game.adjust('b', 1)}
          onMinus={() => game.adjust('b', -1)}
        />
      </View>

      {state.winner ? (
        <View style={styles.winnerBanner}>
          <Text style={styles.winnerTitle}>Partita chiusa</Text>
          <Text style={styles.winnerName}>
            {state.winner === 'a' ? state.teamAName : state.teamBName} ha raggiunto i{' '}
            {state.targetScore}
          </Text>
          <Text style={styles.hint}>
            Risultato {state.scoreA}–{state.scoreB}
            {'\n'}Con la rivincita la serie diventa{' '}
            {state.matchesWonA + (state.winner === 'a' ? 1 : 0)}–
            {state.matchesWonB + (state.winner === 'b' ? 1 : 0)}.
          </Text>
          <AppButton label="Rivincita (stessi nomi)" variant="straw" onPress={game.playAgain} />
          <AppButton label="Cambia coppie" variant="ghost" onPress={game.reset} />
        </View>
      ) : (
        <>
          <View style={styles.stakeCard}>
            <Text style={styles.stakeEyebrow}>
              {state.turnActive
                ? state.isOrbi
                  ? `Orbi · ${orbiWho}`
                  : 'Turno in corso'
                : 'Pronto per il prossimo turno'}
            </Text>
            <Text style={styles.stakeValue}>{state.stake}</Text>
            <Text style={styles.stakeCaption}>
              {state.turnActive ? 'posta attuale' : `prossima base: ${baseStake}`}
            </Text>
          </View>

          {!state.turnActive ? (
            <View style={styles.block}>
              <Text style={styles.blockTitle}>Inizia turno</Text>
              <View style={styles.row}>
                <AppButton
                  label="Turno normale"
                  variant="primary"
                  style={styles.half}
                  onPress={game.beginNormal}
                />
                <AppButton
                  label="Inizia Orbi"
                  variant="ice"
                  style={styles.half}
                  onPress={() => game.beginOrbi(orbiCaller)}
                />
              </View>
              <Text style={styles.hint}>Chi chiama Orbi?</Text>
              <View style={styles.row}>
                <AppButton
                  label={state.teamAName}
                  compact
                  variant={orbiCaller === 'a' ? 'ice' : 'ghost'}
                  style={styles.half}
                  onPress={() => setOrbiCaller('a')}
                />
                <AppButton
                  label={state.teamBName}
                  compact
                  variant={orbiCaller === 'b' ? 'ice' : 'ghost'}
                  style={styles.half}
                  onPress={() => setOrbiCaller('b')}
                />
              </View>
            </View>
          ) : (
            <>
              <View style={styles.block}>
                <Text style={styles.blockTitle}>Posta</Text>
                <View style={styles.row}>
                  <AppButton label="+1" variant="straw" style={styles.quarter} onPress={game.raise} />
                  <AppButton
                    label="3"
                    variant={state.stake === 3 ? 'ice' : 'ghost'}
                    compact
                    style={styles.quarter}
                    onPress={() => game.setStakeValue(3)}
                  />
                  <AppButton
                    label="4"
                    variant={state.stake === 4 ? 'porcini' : 'ghost'}
                    compact
                    style={styles.quarter}
                    onPress={() => game.setStakeValue(4)}
                  />
                  <AppButton
                    label="5"
                    variant={state.stake === 5 ? 'primary' : 'ghost'}
                    compact
                    style={styles.quarter}
                    onPress={() => game.setStakeValue(5)}
                  />
                </View>
                {state.isOrbi && (
                  <AppButton
                    label="Orbi rifiutato (+2 a chi ha chiamato)"
                    variant="ice"
                    onPress={game.refuse}
                  />
                )}
              </View>

              <View style={styles.block}>
                <Text style={styles.blockTitle}>Chi ha vinto il turno?</Text>
                <View style={styles.row}>
                  <AppButton
                    label={`${state.teamAName} +${state.stake}`}
                    variant="ice"
                    style={styles.half}
                    onPress={() => game.award('a')}
                  />
                  <AppButton
                    label={`${state.teamBName} +${state.stake}`}
                    variant="porcini"
                    style={styles.half}
                    onPress={() => game.award('b')}
                  />
                </View>

                <Text style={[styles.blockTitle, { marginTop: spacing.sm }]}>Abbandono</Text>
                <View style={styles.row}>
                  <AppButton
                    label={`${state.teamAName} lascia`}
                    variant="ghost"
                    compact
                    style={styles.half}
                    onPress={() => game.fold('a')}
                  />
                  <AppButton
                    label={`${state.teamBName} lascia`}
                    variant="ghost"
                    compact
                    style={styles.half}
                    onPress={() => game.fold('b')}
                  />
                </View>
              </View>
            </>
          )}
        </>
      )}

      <View style={styles.block}>
        <View style={styles.topRow}>
          <Text style={styles.blockTitle}>Storico</Text>
          <AppButton
            label="Annulla ultimo"
            compact
            variant="danger"
            disabled={state.history.length === 0}
            onPress={game.undo}
          />
        </View>
        {state.history.length === 0 ? (
          <Text style={styles.hint}>Ancora senza punti. Avvia il turno e segna.</Text>
        ) : (
          state.history.slice(0, 20).map((h) => (
            <View key={h.id} style={styles.historyRow}>
              <Text style={styles.historyNote}>{h.note}</Text>
              <Text style={styles.historyScore}>
                {h.scoreAAfter}–{h.scoreBAfter}
              </Text>
            </View>
          ))
        )}
        <Text style={[styles.hint, { marginTop: spacing.sm }]}>
          ±1 sul tabellone corregge un punto. Annulla ultimo toglie l’ultimo inserimento.
        </Text>
      </View>
    </ScrollView>

    <ConfirmDialog
      visible={confirm === 'new'}
      title="Nuova partita?"
      body="Il punteggio e lo storico tornano a zero. I nomi e la meta restano."
      confirmLabel="Ricomincia"
      onCancel={() => setConfirm(null)}
      onConfirm={() => {
        setConfirm(null);
        game.playAgain();
      }}
    />
    <ConfirmDialog
      visible={confirm === 'home'}
      title="Tornare all’inizio?"
      body="Vuoi davvero abbandonare la partita e tornare alla home?"
      confirmLabel="Abbandona"
      onCancel={() => setConfirm(null)}
      onConfirm={() => {
        setConfirm(null);
        onHome();
      }}
    />
    </View>
  );
}

function ConfirmDialog({
  visible,
  title,
  body,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.modalBackdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel="Chiudi"
        />
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalBody}>{body}</Text>
          <View style={styles.modalActions}>
            <AppButton
              label="Annulla"
              compact
              variant="ghost"
              style={styles.half}
              onPress={onCancel}
            />
            <AppButton
              label={confirmLabel}
              compact
              variant="danger"
              style={styles.half}
              onPress={onConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

function TeamScore({
  name,
  score,
  marked,
  xMark,
  accent,
  matchesWon,
  showSeries,
  onPlus,
  onMinus,
}: {
  name: string;
  score: number;
  marked: boolean;
  xMark: number;
  accent: string;
  matchesWon: number;
  showSeries: boolean;
  onPlus: () => void;
  onMinus: () => void;
}) {
  return (
    <View style={[styles.teamCard, { borderColor: accent }]}>
      {showSeries && (
        <View
          style={[styles.seriesBadge, { borderColor: accent }]}
          accessibilityLabel={`Partite vinte: ${matchesWon}`}
        >
          <Text style={[styles.seriesBadgeText, { color: accent }]}>{matchesWon}</Text>
        </View>
      )}
      <Text
        style={[styles.teamName, showSeries && styles.teamNameWithBadge]}
        numberOfLines={2}
      >
        {name}
      </Text>
      <Text style={[styles.teamScore, { color: accent }]}>{score}</Text>
      {marked ? (
        <Text style={styles.xMark}>X · {xMark}</Text>
      ) : (
        <Text style={styles.xMarkGhost}> </Text>
      )}
      <View style={styles.adjustRow}>
        <AppButton label="−1" compact variant="ghost" onPress={onMinus} style={styles.adjustBtn} />
        <AppButton label="+1" compact variant="ghost" onPress={onPlus} style={styles.adjustBtn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  scrollTransparent: { flex: 1, zIndex: 1 },
  setup: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  setupFooter: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    zIndex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  play: {
    paddingHorizontal: spacing.md,
    backgroundColor: colors.bg,
    gap: spacing.md,
  },
  tagline: {
    fontFamily: fonts.bodyMedium,
    color: colors.porcini,
    fontSize: 15,
    marginTop: 4,
  },
  setupCopy: {
    fontFamily: fonts.body,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginVertical: spacing.md,
  },
  criticiSetup: {
    backgroundColor: colors.bgElevated,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: spacing.lg,
    gap: 4,
  },
  criticiSetupTitle: {
    fontFamily: fonts.bodyBold,
    color: colors.porcini,
    marginBottom: 4,
  },
  criticiSetupLine: {
    fontFamily: fonts.body,
    color: colors.ink,
    fontSize: 14,
  },
  fieldBlock: { marginBottom: spacing.md },
  fieldLabel: {
    fontFamily: fonts.bodyMedium,
    color: colors.muted,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.bgElevated,
    color: colors.ink,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  meta: {
    fontFamily: fonts.body,
    color: colors.muted,
    fontSize: 13,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'stretch',
  },
  teamCard: {
    flex: 1,
    backgroundColor: colors.bgElevated,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
  },
  teamName: {
    fontFamily: fonts.bodyMedium,
    color: colors.muted,
    fontSize: 13,
    minHeight: 34,
  },
  teamNameWithBadge: { paddingRight: 30 },
  seriesBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    zIndex: 2,
  },
  seriesBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
  },
  teamScore: {
    fontFamily: fonts.display,
    fontSize: 48,
    lineHeight: 52,
  },
  xMark: {
    fontFamily: fonts.bodyBold,
    color: colors.mark,
    fontSize: 12,
  },
  xMarkGhost: { fontSize: 12 },
  adjustRow: { flexDirection: 'row', gap: 6, marginTop: 8 },
  adjustBtn: { flex: 1 },
  stakeCard: {
    backgroundColor: colors.bgElevated,
    borderRadius: 22,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
  },
  stakeEyebrow: {
    fontFamily: fonts.bodyMedium,
    color: colors.sci,
    fontSize: 13,
  },
  stakeValue: {
    fontFamily: fonts.display,
    color: colors.ink,
    fontSize: 72,
    lineHeight: 78,
  },
  stakeCaption: {
    fontFamily: fonts.body,
    color: colors.muted,
  },
  block: {
    backgroundColor: colors.bgElevated,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    gap: spacing.sm,
  },
  blockTitle: {
    fontFamily: fonts.bodyBold,
    color: colors.ink,
    fontSize: 15,
  },
  row: { flexDirection: 'row', gap: 8 },
  half: { flex: 1 },
  quarter: { flex: 1 },
  hint: {
    fontFamily: fonts.body,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  historyNote: {
    flex: 1,
    fontFamily: fonts.body,
    color: colors.ink,
    fontSize: 13,
  },
  historyScore: {
    fontFamily: fonts.bodyBold,
    color: colors.straw,
    fontSize: 13,
  },
  winnerBanner: {
    backgroundColor: colors.bgElevated,
    borderRadius: 18,
    padding: spacing.lg,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.straw,
  },
  winnerTitle: {
    fontFamily: fonts.displaySoft,
    color: colors.straw,
    fontSize: 22,
  },
  winnerName: {
    fontFamily: fonts.body,
    color: colors.ink,
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(42, 35, 24, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.bgElevated,
    borderRadius: 18,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    zIndex: 1,
  },
  modalTitle: {
    fontFamily: fonts.displaySoft,
    color: colors.ink,
    fontSize: 22,
    textAlign: 'center',
  },
  modalBody: {
    fontFamily: fonts.body,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 8,
  },
});
