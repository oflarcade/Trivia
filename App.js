import React from 'react';
import { AppLoading, Asset, Font, Util } from 'expo';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';


const imgUrl = require('./assets/images/ofl.png');


export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLoadingComplete: false,
       appReady: false,
       rootKey: Math.random(),
    };
  }
  
  componentDidMount() {
    this.resetAnimation();
  }

  resetAnimation() {
    this.setState({
      appReady: false,
      rootKey: Math.random()
    });

    setTimeout(() => {
      this.setState({
        appReady: true,
      });
    }, 1000);
  }
  
    
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        
        
        
        require('./assets/images/left-arrow.png'),
        require('./assets/images/firstDoor.png'),
        require('./assets/images/secondDoor.png'),
        require('./assets/images/thirdDoor.png'),
        require('./assets/images/fourthDoor.png'),
        require('./assets/images/fifthDoor.png'),
        require('./assets/images/sixthDoor.png'),
        require('./assets/images/seventhDoor.png'),
        require('./assets/images/unlocked.png'),
        require('./assets/images/score.png'),
        require('./assets/images/locked.png'),
        require('./assets/images/logo.png'),
        require('./assets/images/win.png'),
      ]),
      
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
         'jf': require('./assets/fonts/JF.ttf'),
      }),
      
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
  render() {
    if (!this.state.isLoadingComplete ) {
         return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return(
          
          <RootNavigation />
      
        
      
      )
    }
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingBackgroundStyle: {
    backgroundColor: 'black',
  },
})
