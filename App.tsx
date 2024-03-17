import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Linking, Text, View } from 'react-native';
import NavigatorList from './MyComponent/NavigatorList';
import MyTabs from "./MyComponent/BottomBar";

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

