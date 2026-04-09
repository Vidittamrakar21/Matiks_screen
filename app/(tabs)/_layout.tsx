import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Swords, Trophy } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:  '#B0FA62',
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Arena',
          tabBarIcon: ({ color }) => <Swords size={28} color={'#B0FA62'} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Compete',
          tabBarIcon: ({ color }) => <Trophy size={28}  color={'#B0FA62'} />,
        }}
      />
    </Tabs>
  );
}
