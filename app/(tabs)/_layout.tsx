import React from 'react';
import { Tabs } from 'expo-router';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { FontAwesome6 } from '@expo/vector-icons';
import { useColours } from '@/hooks/useColours';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>['name'];
  color: string;
}) {
  return <FontAwesome6 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colours = useColours();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colours.foreground,
        },
        headerStyle: {
          backgroundColor: colours.foreground,
        },
        tabBarActiveTintColor: colours.tabIconSelected,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="magnifying-glass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          title: 'Manage',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
