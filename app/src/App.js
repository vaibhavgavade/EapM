import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './scenes/Home';
import {Details} from './scenes/Details';
import {Root} from 'native-base';

console.disableYellowBox = true;
const stack = createStackNavigator();
const App = () => {
  return (
    <Root>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name="Home" component={Home} />
          <stack.Screen name="Details" component={Details} />
        </stack.Navigator>
      </NavigationContainer>
    </Root>
  );
};

export default App;
