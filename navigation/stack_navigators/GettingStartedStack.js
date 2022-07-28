import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
import GettingStartedScreen from '../../screens/map/GettingStartedScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
  },
});

const StoresStack = createStackNavigator();

export default function GettingStartedStack() {
  return (
    <StoresStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgLight },
        config,
      }}>
      <StoresStack.Screen
        name="GettingStartedOverlay"
        component={GettingStartedScreen}
      />
    </StoresStack.Navigator>
  );
}
