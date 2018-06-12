import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Left, Right, Header } from 'native-base';
import ResponseButton from '../components/ResponseButton';
import QuestionDataRaw from '../data/QuestionData';
import QuestionDataRawTwo from '../data/QuestionDataTwo';
import triviaStore from '../Store/store'; 
import { AdMobBanner } from "expo";
const logoWidth = Dimensions.get('window').width / 12;

export default class Game extends Component {
    constructor(props) {
      super(props);
      
      this.state = triviaStore.getState();
      triviaStore.subscribe(() => {
        this.setState(triviaStore.getState());
      });
    }

  componentWillMount() {
    this.LoadQuestion(this.state.levelNbr, this.state.questionNbr);
    console.log("level nbr: ", this.state.levelNbr, "question Nbr : ", this.state.questionNbr);
  }
  

  LoadQuestion = (level, QNbr) => {
    if(this.state.difficulty === 'easy') {
    const qtext = QuestionDataRaw[level][QNbr].QuestionText;
    const fiR = QuestionDataRaw[level][QNbr].ResponseOne;
    const sR = QuestionDataRaw[level][QNbr].ResponseTwo;
    const tR = QuestionDataRaw[level][QNbr].ResponseThree;
    const fR = QuestionDataRaw[level][QNbr].ResponseFour;
    const cR = QuestionDataRaw[level][QNbr].correctAnswer;
    console.log('this is the correct answer', cR);
    
    
  this.setState({ question: qtext, 
                    firstAnswer: fiR, 
                    secondAnswer: sR,
                    thirdAnswer: tR,
                    fourthAnswer: fR,
                    correctAnswer: cR, });  
    triviaStore.dispatch({
      type: 'LOAD_GAME_DATA',
        qtext,
        cR,
        fiR,
        sR,
        tR,
        fR })        
    } else if (this.state.difficulty === 'medium') {
      const qtext = QuestionDataRawTwo[level][QNbr].QuestionText;
      const fiR = QuestionDataRawTwo[level][QNbr].ResponseOne;
      const sR = QuestionDataRawTwo[level][QNbr].ResponseTwo;
      const tR = QuestionDataRawTwo[level][QNbr].ResponseThree;
      const fR = QuestionDataRawTwo[level][QNbr].ResponseFour;
      const cR = QuestionDataRawTwo[level][QNbr].correctAnswer;
      console.log('this is the correct answer', cR);
      
      
    this.setState({ question: qtext, 
                      firstAnswer: fiR, 
                      secondAnswer: sR,
                      thirdAnswer: tR,
                      fourthAnswer: fR,
                      correctAnswer: cR, });  
      triviaStore.dispatch({
        type: 'LOAD_GAME_DATA',
          qtext,
          cR,
          fiR,
          sR,
          tR,
          fR })   

    }   
   }


  _goBack = () => {
    this.props.navigation.goBack(null);
  }

  _goQuestion = () => {
    this.props.navigation.navigate('Game');
  }

  
  control(){
    let solved = false;
    switch(this.state.questionNbr){
      case 1: this.state.questionOne ? solved = true : solved = false;
      case 2: this.state.questionTwo ? solved = true : solved = false;
      case 3: this.state.questionThree ? solved = true : solved = false;
      case 4: this.state.questionFour ? solved = true : solved = false;
      case 5: this.state.questionFive ? solved = true : solved = false;
      case 6: this.state.questionSix ? solved = true : solved = false;
      case 7: this.state.questionSeven ? solved = true : solved = false;
      case 8: this.state.questionEight ? solved = true : solved = false;
      case 9: this.state.questionNine ? solved = true : solved = false;
      case 10: this.state.questionTen ? solved = true : solved = false;

    }
    return solved;
  }
  _engineGame = (text) => {
    this._setSelected(text);
    
    
    if (text === this.state.correctAnswer) {
      //console.log(this.state.levelNbr, ' : levelNbr')
      let solved = this.control();
      
      triviaStore.dispatch({
        type:'ISSOLVED',
        solved
      })
      
      this.props.navigation.navigate('win');
    } else {
      //console.log(this.state.selected, 'lost:', this.state.correctAnswer)
      this.props.navigation.navigate('lost');
    }
    
  }
  
   _setSelected =(text) => {
     triviaStore.dispatch({
       type: 'SELECTED',
       text,
     })
   }
  
   render() {
    //rendering the correct content
    
    return (

      <Container style={styles.main} >
      

          <Header style={{backgroundColor: 'white',}}>
            <Left>
              <TouchableOpacity onPress={() => this._goBack()} style={{ flexDirection: 'row' }}>
                <ImageBackground source={require('../assets/images/left-arrow.png')} style={styles.scoreLogo} />
              </TouchableOpacity>
            </Left>
            <Body style={styles.headerStyle}>
              <Text style={styles.text}>{this.state.levelName}</Text>
            </Body>
            <Right>
              <Text style={styles.score}>{this.state.score}</Text>
              <ImageBackground source={require('../assets/images/score.png')} style={styles.scoreLogo} />
            </Right>
          </Header>
          <Content>
            <Card style={styles.questionCard}>
              <CardItem style={{ alignSelf: 'center', backgroundColor: 'white' }}>
                <Text style={{ color: '#4bb29e', fontSize: 23,fontFamily:'jf', fontWeight:'normal'}}> {this.state.questionName} : </Text>
              </CardItem>
              <CardItem bordered style={{ alignSelf: 'center', backgroundColor: 'white', borderRadius: 5, }}>
                <Body>
                  <Text style={{ alignItems: 'flex-end',color: '#4bb29e', fontSize: 27,fontFamily:'jf', }}>{this.state.question} </Text>
                </Body>
              </CardItem>
            </Card>
            <View style={styles.body}>

              <ResponseButton text={this.state.firstAnswer} onPress={() => {this._engineGame(this.state.firstAnswer)}} disabled={this.state.disableOne} />

              <ResponseButton text={this.state.secondAnswer} onPress={() => {this._engineGame(this.state.secondAnswer)}} disabled={this.state.disableTwo} />

              <ResponseButton text={this.state.thirdAnswer} onPress={() => {this._engineGame(this.state.thirdAnswer)}} disabled={this.state.disableThree} />

              <ResponseButton text={this.state.fourthAnswer} onPress={() => {this._engineGame(this.state.fourthAnswer)}} disabled={this.state.disableFour} />
            </View>
          </Content>
      <View style={styles.banner}>
                      <AdMobBanner
                style={styles.bottomBanner}
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-3465282364470954/5610540285"
                testDeviceID="EMULATOR"
                didFailToReceiveAdWithError={this.bannerError}
                />
              </View> 
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFF',
  },
  header: {
    flexGrow: 1,

  },
  banner:{
    marginTop: 30,
    marginBottom: 1,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  body: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 20,
    color: '#01a3a4',
    fontWeight: 'bold',
  },
  bodyTopContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    borderColor: '#01a3a4',
    borderWidth: 1,
    borderRadius: 2,
  },
  backButton: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'jf',
    fontSize: 15,
    fontWeight: 'normal',
    color: '#4bb29e',
    marginLeft: 30,
  },
  headerStyle: {
    alignSelf: 'center',
    marginLeft: 50,

  },
  questionCard: {
    backgroundColor: 'white',
  },
  scoreLogo: {
    width: logoWidth,
    height: logoWidth,
  },
  score: {
    fontSize: 22,
    fontWeight: 'normal',
    color: '#4bb29e',
    fontFamily:'jf',
    marginBottom: 4,
    marginRight: 4,
  },
  backText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'white',
    fontFamily:'System',
    marginTop: 3,
    marginLeft: 3,
  }

});
