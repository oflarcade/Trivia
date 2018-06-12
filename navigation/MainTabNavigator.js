import React from 'react';
import { StatusBar } from 'react-native';
import {  createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';

import Level from '../screens/Level';
import Game from '../screens/Game';
import Win from '../screens/Win';
import Questions from '../screens/Questions';
import Lose from '../screens/Lose';
import About from '../screens/About'; 
const FirstStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
        mode: 'modal',
        header: null,
    },
  },
  Level: {
    screen: Level,
    navigationOptions: {
      mode: 'modal',
      header: null,
    },
  },
},)

const secondStack = createStackNavigator({
  Questions: {
    screen: Questions,
    navigationOptions: {
      mode: 'modal',
      header: null,
    },
  }})
const thirdStack = createStackNavigator({
  Game: {
    screen: Game,
    navigationOptions: {
      mode: 'modal',
      header: null,
    },
  },
})
  

const aboutStack = createStackNavigator({
  about:{
    screen: About,
    navigationOptions:{
      modal:'modal',
      header: null,
    },
  },
})

const wonStack= createStackNavigator({
  won: {
    screen: Win,
    navigationOptions: {
      mode: 'modal',
      header: null,
    }
  }
  
});
const lostStack = createStackNavigator({
  lost: {
    screen: Lose,
    navigationOptions: {
      mode: 'modal',
      header: null,
    }
  }
});

const GameNavigator = createStackNavigator({
  main: {
    screen: FirstStack,
    navigationOptions: {
      mode: 'modal',
      header: null,
    }
  },
  half: {
    screen: secondStack,
    navigationOptions: {
      mode: 'modal',
      header: null,
    }
  },
  third:{
    screen: thirdStack,
    navigationOptions: {
      mode: 'modal',
      header: null,
    }
  },
  win: {
    screen: wonStack,
    navigationOptions: {
      mode: 'modal',
      header: null,
    }
  },
  lost: {
    screen: lostStack,
    navigationOptions: {
      mode: 'modal',
      header: null,
    }
  },
  about: {
    screen: aboutStack,
    navigationOptions: {
      mode: 'modal',
      header: null,
    }
  }
})


export default GameNavigator;