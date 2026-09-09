import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { CreditsScreen } from '../screens/CreditsScreen';
import { HowToPlayScreen } from '../screens/HowToPlayScreen';
import { RulesScreen } from '../screens/RulesScreen';
import { ScoreScreen } from '../screens/ScoreScreen';
import { useGame } from '../state/GameContext';
import { colors, fonts } from '../theme';

export type RootTabParamList = {
  Segna: undefined;
  Regole: undefined;
  ComeGiocare: undefined;
  Crediti: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.bgElevated,
    text: colors.ink,
    border: colors.line,
    primary: colors.straw,
  },
};

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text
      style={{
        fontFamily: fonts.bodyBold,
        fontSize: 11,
        color: focused ? colors.straw : colors.muted,
      }}
    >
      {label}
    </Text>
  );
}

export function RootTabs({ onHome }: { onHome: () => void }) {
  const { state } = useGame();

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          // La barra appare solo a partita avviata (dopo la scelta delle coppie).
          tabBarStyle: state.started
            ? {
                backgroundColor: colors.bgElevated,
                borderTopColor: colors.line,
                height: 64,
                paddingBottom: 8,
                paddingTop: 8,
              }
            : { display: 'none' },
          tabBarActiveTintColor: colors.straw,
          tabBarInactiveTintColor: colors.muted,
          tabBarLabelStyle: {
            fontFamily: fonts.bodyMedium,
            fontSize: 11,
          },
        }}
      >
        <Tab.Screen
          name="Segna"
          options={{
            tabBarLabel: 'Segna',
            tabBarIcon: ({ focused }) => <TabIcon label="♠" focused={focused} />,
          }}
        >
          {() => <ScoreScreen onHome={onHome} />}
        </Tab.Screen>
        <Tab.Screen
          name="Regole"
          component={RulesScreen}
          options={{
            tabBarLabel: 'Regole',
            tabBarIcon: ({ focused }) => <TabIcon label="▣" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="ComeGiocare"
          component={HowToPlayScreen}
          options={{
            title: 'Come giocare',
            tabBarLabel: 'Come giocare',
            tabBarIcon: ({ focused }) => <TabIcon label="►" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Crediti"
          component={CreditsScreen}
          options={{
            title: 'Crediti',
            tabBarLabel: 'Crediti',
            tabBarIcon: ({ focused }) => <TabIcon label="※" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
