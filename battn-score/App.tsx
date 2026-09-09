import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  Fraunces_500Medium,
  Fraunces_700Bold,
  useFonts,
} from '@expo-google-fonts/fraunces';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { battnLogoSource } from './src/components/BattnLogo';
import { RootTabs } from './src/navigation/RootTabs';
import { TargetSelectScreen } from './src/screens/TargetSelectScreen';
import { WelcomeScreen, welcomeBgSource } from './src/screens/WelcomeScreen';
import { GameProvider, useGame } from './src/state/GameContext';
import { colors } from './src/theme';
import { TargetScore } from './src/types';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* already prevented or unavailable in some hosts */
});

type Gate = 'welcome' | 'target' | 'app';

function AppGate() {
  const game = useGame();
  // Sempre dalla welcome all'apertura (non saltare alla partita salvata).
  const [gate, setGate] = useState<Gate>('welcome');

  const onChooseTarget = (target: TargetScore) => {
    game.chooseTarget(target);
    setGate('app');
  };

  if (gate === 'welcome') {
    return <WelcomeScreen onStart={() => setGate('target')} />;
  }
  if (gate === 'target') {
    return (
      <TargetSelectScreen
        onSelect={onChooseTarget}
        onBack={() => setGate('welcome')}
      />
    );
  }
  return <RootTabs onHome={() => setGate('welcome')} />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Fraunces_700Bold,
    Fraunces_500Medium,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    Asset.loadAsync([battnLogoSource, welcomeBgSource]).catch(() => {
      /* images still render via <Image> */
    });
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={colors.straw} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <GameProvider>
        <StatusBar style="dark" />
        <AppGate />
      </GameProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
