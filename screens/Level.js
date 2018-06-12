import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions, BackHandler } from 'react-native';
import { Container, Content, Body, Right, Header, Left, Button } from 'native-base';
import Expo, { SQLite } from 'expo';
import levels from '../data/levels';
import levelsTwo from '../data/levelsTwo'
import triviaStore from '../Store/store';
import LevelButton from '../components/LevelButton';
import { AdMobBanner } from "expo";

const db = SQLite.openDatabase('database.db');
const screenWidth = Dimensions.get('window').width / 12;


class Level extends Component {
  constructor(props) {
    super(props);


    this.state = triviaStore.getState();
    triviaStore.subscribe(() => {
      this.setState(triviaStore.getState());
    });
  }

  componentDidMount() {

    //console.log('question Answered for level one :', this.state.levelOneQ)
    
    //console.log('question Answered for level one second var :', this.state.questionUnlocked)
  }
  

  // helper function to convert 
  convert = (input) => {
    if (input === 1) {
      return true;
    } else if (input === 0) {
      return false;
    }
  }

  loadQuestionSolved() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM GAMEDATABASE',
        null,
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let row = results.rows;
            let levelOne = row.item(0).questionSolved;
            let levelTwo = row.item(1).questionSolved;
            let levelThree = row.item(2).questionSolved;
            let levelFour = row.item(3).questionSolved;
            let levelFive = row.item(4).questionSolved;
            let levelSix = row.item(5).questionSolved;
            let levelSeven = row.item(6).questionSolved;

          }
        })

    })
    

  }



  // helper function for loading the correct question from GAMEDATABASE to store meaning (questionOne => questionTen)

  loadDataToStore(ln) {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM GAMEDATABASE WHERE id =?',
        [ln],
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let row = results.rows.item(0);
            let questionOne = this.convert(row.questionOne);
            let questionTwo = this.convert(row.questionTwo);
            let questionThree = this.convert(row.questionThree);
            let questionFour = this.convert(row.questionFour);
            let questionFive = this.convert(row.questionFive);
            let questionSix = this.convert(row.questionSix);
            let questionSeven = this.convert(row.questionSeven);
            let questionEight = this.convert(row.questionEight);
            let questionNine = this.convert(row.questionNine);
            let questionTen = this.convert(row.questionTen);
            triviaStore.dispatch({
              type: 'LOAD_QUESTION_STATUS',
              questionOne,
              questionTwo,
              questionThree,
              questionFour,
              questionFive,
              questionSix,
              questionSeven,
              questionEight,
              questionNine,
              questionTen
            })
          }
        }
      )
    })
  }

  //helper function to determine the level name

  levelName(id){
    if(this.state.difficulty === 'easy'){
      return levels[id].name;
    } else if (this.state.difficulty === 'medium') {
      return levelsTwo[id].name
    } 
      
  }

  persitData = (id, ln) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM GAMEDATABASE WHERE id =?',                               // data for level selected 
        [ln],
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let row = results.rows.item(0);
            
          }
        })
      tx.executeSql('UPDATE GAMEDATABASE SET levelNbr =?  where id = ?', [id, ln]);          //update the level number in its levelRow
      tx.executeSql('SELECT * FROM GAMEDATABASE WHERE id =?',
        [ln],
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let row = results.rows.item(0);
            
          }
        })
    })
  }
  displayData = () => {
     db.transaction(tx => {
      tx.executeSql('SELECT * FROM GAMEDATABASE',
        null,
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let row = results.rows;
            console.log(row)
          }
        })
    }) 
    //console.log('store from level.js : ',triviaStore.getState())
  }
  _goBack = () => {
    this.props.navigation.goBack(null)
  }

  _goQuestionlevel1 = (id) => {
    const text = this.levelName(id);
    triviaStore.dispatch({
      type: 'LOAD_LEVEL',
      text,
      id,
    })
    this.loadDataToStore(id)
    this.props.navigation.navigate('Questions');
  }
  _goQuestionlevel2 = (id) => {
    const text = this.levelName(id);
    if (this.state.levelTwo) {
      return null;
    }

    triviaStore.dispatch({
      type: 'LOAD_LEVEL',
      text,
      id,
    })
    this.loadDataToStore(id)
    this.props.navigation.navigate('Questions');
  }
  _goQuestionlevel3 = (id) => {
    const text = this.levelName(id);
    if (this.state.levelThree) {
      return null;
    }
    triviaStore.dispatch({
      type: 'LOAD_LEVEL',
      text,
      id,
    })
    this.loadDataToStore(id)
    this.props.navigation.navigate('Questions')
  }
  _goQuestionlevel4 = (id) => {
    const text = this.levelName(id);
    if (this.state.levelFour) {
      return null;
    }

    triviaStore.dispatch({ type: 'LOAD_LEVEL', text, id, })
    this.loadDataToStore(id)
    this.props.navigation.navigate('Questions')

  }
  _goQuestionlevel5 = (id) => {
    const text = this.levelName(id);
    if (this.state.levelFive) {
      return null;
    }

    triviaStore.dispatch({ type: 'LOAD_LEVEL', text, id, })
    this.loadDataToStore(id)
    this.props.navigation.navigate('Questions')
  }
  _goQuestionlevel6 = (id) => {
    const text = this.levelName(id);
    if (this.state.levelSix) {
      return null;
    }

    triviaStore.dispatch({ type: 'LOAD_LEVEL', text, id, });
    this.loadDataToStore(id)
    this.props.navigation.navigate('Questions');
  }
  _goQuestionlevel7 = (id) => {
    const text = this.levelName(id);
    if (this.state.levelSeven) {
      return null;
    }
    triviaStore.dispatch({ type: 'LOAD_LEVEL', text, id, })
    this.loadDataToStore(id)
    this.props.navigation.navigate('Questions');
  }
  bannerError() {
    console.log("An error");
    return;
  }

  buttonValue= (id)=>{
    switch(id){
      case 1:{
        if(this.state.difficulty === 'easy')
        return this.state.levelOneQ
        else 
          return this.state.levelOneQT
      }
      case 2:{
        if(this.state.difficulty === 'easy')
        return this.state.levelTwoQ
        else 
          return this.state.levelTwoQT
      }
      case 3:{
        if(this.state.difficulty === 'easy')
        return this.state.levelThreeQ
        else 
          return this.state.levelThreeQT
      }
      case 4:{
        if(this.state.difficulty === 'easy')
        return this.state.levelFourQ
        else 
          return this.state.levelFourQT
      }
      case 5:{
        if(this.state.difficulty === 'easy')
        return this.state.levelFiveQ
        else 
          return this.state.levelFiveQT
      }
      case 6:{
        if(this.state.difficulty === 'easy')
        return this.state.levelSixQ
        else 
          return this.state.levelSixQT
      }
      case 7:{
        if(this.state.difficulty === 'easy')
        return this.state.levelSevenQ
        else 
          return this.state.levelSevenQT
      }
    }
  }
  render() {


    return (
      <Container style={{ backgroundColor: 'white', }}>

        <Header style={{ backgroundColor: 'white', }}>
          <Left>
            <TouchableOpacity onPress={() => this._goBack()} style={{ flexDirection: 'row' }}>
              <ImageBackground source={require('../assets/images/left-arrow.png')} style={styles.scoreLogo} />
            </TouchableOpacity>
          </Left>
          <Body style={styles.headerStyle}>
            <Text style={styles.text}>الأبواب</Text>
          </Body>
          <Right>
            <Text style={styles.score}>{this.state.score}</Text>
            <Image source={require('../assets/images/score.png')} style={styles.scoreLogo} />
          </Right>
        </Header>
        <Content style={{ backgroundColor: 'transparent', marginTop: 30 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <LevelButton text={this.buttonValue(1)} onPress={() => { this._goQuestionlevel1(1) }} locked={this.state.levelOne} doorImage={require('../assets/images/firstDoor.png')}  />
            <LevelButton text={this.buttonValue(2)}onPress={() => { this._goQuestionlevel2(2) }} locked={this.state.levelTwo} doorImage={require('../assets/images/secondDoor.png')} />
            <LevelButton text={this.buttonValue(3)} onPress={() => { this._goQuestionlevel3(3) }} locked={this.state.levelThree} doorImage={require('../assets/images/thirdDoor.png')} />
            <LevelButton text={this.buttonValue(4)}nPress={() => { this._goQuestionlevel4(4) }} locked={this.state.levelFour} doorImage={require('../assets/images/fourthDoor.png')} />
            <LevelButton text={this.buttonValue(5)} onPress={() => { this._goQuestionlevel5(5) }} locked={this.state.levelFive} doorImage={require('../assets/images/fifthDoor.png')} />
            <LevelButton text={this.buttonValue(6)} onPress={() => { this._goQuestionlevel6(6) }} locked={this.state.levelSix} doorImage={require('../assets/images/sixthDoor.png')} />
            <LevelButton text={this.buttonValue(7)} onPress={() => { this._goQuestionlevel7(7) }} locked={this.state.levelSeven} doorImage={require('../assets/images/seventhDoor.png')} />
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

  headerStyle: {
    alignSelf: 'center',
    marginLeft: 50,
  },
  row: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(70, 79, 183, 1)',
    borderRadius: 20,
  },
  banner: {
    marginTop: 30,
    marginBottom: 1,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'jf',
    color: '#4bb29e',
    marginLeft: 60,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'System',
    color: 'white',
    alignSelf: 'center',
  },
  backButton: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  scoreLogo: {
    width: screenWidth,
    height: screenWidth,
  },
  score: {
    fontSize: 22,
    fontWeight: 'normal',
    color: '#4bb29e',
    fontFamily: 'jf',
    marginBottom: 4,
    marginRight: 4,
  },
  backText: {
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'System',
    color: 'white',
    marginTop: 3,
    marginLeft: 3,
  }
});

export default Level;