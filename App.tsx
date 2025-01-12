import 'react-native-gesture-handler'
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import GroupScreen from './src/GroupScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{header: ()=> false}}/>
        <Stack.Screen name='Group' component={GroupScreen} options={{title: "Group CSE 434"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
