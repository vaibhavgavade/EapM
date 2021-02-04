import React from 'react'
import First from './js/src/First';
import Second from './js/src/second';
import Third from './js/src/Third'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

const App=(props)=> {
    return (
      <NavigationContainer>
        <Stack.Navigator >
   
          <Stack.Screen name="First" component={First}  />
          <Stack.Screen name="Second" component={Second}/>
          <Stack.Screen name="Third" component={Third}/>

       
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;

