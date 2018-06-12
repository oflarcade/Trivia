import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image,} from 'react-native';
import { AdMobBanner, } from 'expo'
import * as Animatable from 'react-native-animatable';
import { Container, Content, Body, Right, Header, Left } from 'native-base';
import AwesomeButton from 'react-native-really-awesome-button';
import LottieView from 'lottie-react-native';


import triviaStore from '../Store/store';


const bannerWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default class winLose extends Component {
  constructor(props) {
    super(props)

    this.state = triviaStore.getState();
    triviaStore.subscribe(() => {
      this.setState(triviaStore.getState());
    });

  }


  componentDidMount(){
    this.animation.play();
  }
 





  //if levelone is unlocked keep array of data 

  _goBack = () => {
    /*  */
    this.props.navigation.navigate('Game');
  }



  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
      <LottieView source={require('../animation/error_cross.json')} ref={animation => {this.animation = animation;}} style={styles.animation} loop={true} />
        <Content>
        
          <View style={styles.body}>
            <Animatable.Text animation="fadeInUpBig" iterationCount={1} direction="alternate" easing="ease" useNativeDriver style={styles.text}> إجابة خاطئة</Animatable.Text>


            <AwesomeButton
              borderRadius={8}
              textSize={20}
              activityColor={'#B71C1C'}
              backgroundProgress={'#FFCDD2'}
              backgroundColor={'#F44336'}
              progress
              onPress={() => setTimeout(() => { this._goBack() }, 3000)}>
              <Text style={styles.buttonText}>حاول مرة أخرى</Text>
            </AwesomeButton>
          </View>
        </Content>

        {/* <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-3465282364470954/5610540285"
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        /> */}
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#A3CB38',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'normal',
    fontFamily: 'jf',
  },
  body: {
    marginTop: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 190,
    fontSize: 58,
    fontWeight: 'normal',
    color: '#F44336',
    textAlign: 'center',
    fontFamily: 'jf',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,

    marginLeft: 90,
  },
  scoreLogo: {
    width: bannerWidth / 12,
    height: bannerWidth / 12,
  },
  score: {
    marginRight: 5,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerStyle: {
    alignSelf: 'center',
    marginLeft: 50,
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  animation:{
    position: 'absolute',
    
    alignSelf: 'center',
      width: bannerWidth - 30,
      height: screenHeight  - 80,
  },
})