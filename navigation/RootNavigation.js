import { Notifications, AppLoading,Asset } from 'expo';
import React from 'react';

import { BackHandler, StatusBar } from 'react-native';
import {Root} from 'native-base';
import GameNavigator from './MainTabNavigator';




export default class RootNavigator extends React.Component {
 
  
  
  componentDidMount() {
    StatusBar.setHidden(true);
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    console.disableYellowBox = true;
  }
  
  componentWillUnmount() {

    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);

  }

  onBackButtonPressed() {
    return true;
}
 

  render() {
    return (
    
          <Root >
            <GameNavigator />
        </Root>
    
  )}

 

  
}
