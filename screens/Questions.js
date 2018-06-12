import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, } from 'react-native';
import { Container, Content, Body, Left, Header, Right, Button } from 'native-base';
import Expo, { SQLite } from 'expo';
import QuestionButton from '../components/QuestionButton';
import questionsText from '../data/questions';
import triviaStore from '../Store/store';
import QuestionDataRaw from '../data/QuestionData';
import { AdMobBanner } from "expo";
const logoWidth = Dimensions.get('window').width / 12;

const db = SQLite.openDatabase('database.db');
class Questions extends Component {

  constructor(props) {
    super(props);

    this.state = triviaStore.getState();
    triviaStore.subscribe(() => {
      this.setState(triviaStore.getState());
    });
  }


  componentWillMount() {
    this.recent(this.state.questionNbr);
    //console.log('loading this store and displaying its proper row in database', this.state.levelNbr)
    //this.loadStore(this.state.levelNbr) // loading the correct data from GAMEDATABASE with id : this.state.levelNbr 
   // this.displayData(this.state.levelNbr) // display the correct data from GAMEDATABASE with id : this.state.levelNbr
  }

  componentDidMount(){
    
    this.loadDataToDisplay(this.state.levelNbr);
  }

  
  loadDataToDisplay = (id) =>{
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM GAMEDATABASE WHERE id =?',
        [id],
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

  convert = (input) => {
    if (input === 1) {
      return true;
    } else if (input === 0) {
      return false;
    }
  }

  loadStore(id) {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM GAMEDATABASE WHERE id = ?',
        [id],
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let row = results.rows.item(0)
            let score = row.score;
            let levelName = row.levelName;
            let levelNbr = row.levelNbr;
            let questionNbr = row.questionNbr;
            let questionName = row.questionName;
            let levelOne = this.convert(results.item(0).levelUnlocked);
            let levelTwo = this.convert(results.item(1).levelUnlocked);
            let levelThree = this.convert(results.item(2).levelUnlocked);
            let levelFour = this.convert(results.item(3).levelUnlocked);
            let levelFive = this.convert(results.item(4).levelUnlocked);
            let levelSix = this.convert(results.item(5).levelUnlocked);
            let levelSeven = this.convert(results.item(6).levelUnlocked);
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
            let questionUnlocked = row.questionUnlocked;
            triviaStore.dispatch({
              type: 'LOAD_STORE',
              score,
              levelName,
              levelNbr,
              questionNbr,
              questionName,
              levelOne,
              levelTwo,
              levelThree, 
              levelFour,
              levelFive,
              levelSix,
              levelSeven,
              questionOne,
              questionTwo,
              questionThree,
              questionFour,
              questionFive,
              questionSix,
              questionSeven,
              questionEight,
              questionNine,
              questionTen,
              questionUnlocked,
              
            })
          }
        })
    })
  }

  persitData = (id, ln) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE GAMEDATABASE SET questionNbr =?  where id = ?', [id,ln]);
    })
  }
  displayData = (id) => {
    /* db.transaction(tx => {
      tx.executeSql('SELECT * FROM GAMEDATABASE where id = ?',
      [id],  
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let row = results.rows.item(0);
            
          }
        })
    }) */
    console.log('store from level.js : ',triviaStore.getState())

  }
  

  _goBack = () => {
    
    this.props.navigation.navigate('Level')
  }

  _goQuestion1 = (id) => {
    const text = questionsText[id].name;
    triviaStore.dispatch({type: 'LOAD_QUESTION',text,id})
      this.persitData(id, this.state.levelNbr);
    this.props.navigation.navigate('Game');
  }
  _goQuestion2 = (id) => {
    if (this.state.questionTwo) {
      return null;
    }
    const text = questionsText[id].name;
    triviaStore.dispatch({ type: 'LOAD_QUESTION', text, id })
    this.persitData(id, this.state.levelNbr);
    this.props.navigation.navigate('Game');
  }
  _goQuestion3 = (id) => {
    if (this.state.questionThree) {
      return null
    }
    const text = questionsText[id].name;
    triviaStore.dispatch({ type: 'LOAD_QUESTION', text, id })
    this.persitData(id,this.state.levelNbr);
    this.props.navigation.navigate('Game')

  }
  _goQuestion4 = (id) => {
    if (this.state.questionFour) {
      return null
    }
    const text = questionsText[id].name;
    triviaStore.dispatch({ type: 'LOAD_QUESTION', text, id })
    this.persitData(id,this.state.levelNbr);
    this.props.navigation.navigate('Game')

  }
  _goQuestion5 = (id) => {
    if (this.state.questionFive) {
      return null
    }
    const text = questionsText[id].name;
    triviaStore.dispatch({ type: 'LOAD_QUESTION', text, id })
    this.persitData(id,this.state.levelNbr);
    this.props.navigation.navigate('Game')

  }
  _goQuestion6 = (id) => {
    if (this.state.questionSix) {
      return null
    } else {
      const text = questionsText[id].name;
      triviaStore.dispatch({ type: 'LOAD_QUESTION', text, id })
      this.persitData(id,this.state.levelNbr);
      this.props.navigation.navigate('Game')
    }
  }

  _goQuestion7 = (id) => {
    if (this.state.questionSeven) {
      return null
    } else {
      const text = questionsText[id].name;
      triviaStore.dispatch({ type: 'LOAD_QUESTION', text, id })
      this.persitData(id,this.state.levelNbr);
      this.props.navigation.navigate('Game')
    }
  }
  _goQuestion8 = (id) => {
    if (this.state.questionEight) {
      return null
    } else {
      const text = questionsText[id].name;
      triviaStore.dispatch({ type: 'LOAD_QUESTION', text, id })
      this.persitData(id,this.state.levelNbr);
      this.props.navigation.navigate('Game')
    }
  }

  _goQuestion9 = (id) => {
    if (this.state.questionNine) {
      return null
    } else {
      const text = questionsText[id].name;
      triviaStore.dispatch({ type: 'LOAD_QUESTION', text, id })
      this.persitData(id,this.state.levelNbr);
      this.props.navigation.navigate('Game')
    }
  }
  _goQuestion10 = (id) => {
    if (this.state.questionTen) {
      return null
    } else {
      const text = questionsText[id].name;
      triviaStore.dispatch({
        type: 'LOAD_QUESTION',
        text,
        id
      })
      this.persitData(id,this.state.levelNbr);
      this.props.navigation.navigate('Game')
    }
  }

  recent =(id) => {
    
    switch(id){
      case 1: {this.setState({questionOneR: true }); }break;
      case 2: {this.setState({questionTwoR: true, questionOneR: false }); }break;
      case 3: {this.setState({questionThreeR: true, questionTwoR: false  }); }break;
      case 4: {this.setState({questionFourR: true,  questionThreeR: false  }); }break;
      case 5: {this.setState({questionFiveR: true, questionFourR: false }); }break;
      case 6: {this.setState({questionSixR: true, questionFiveR: false }); }break;
      case 7: {this.setState({questionSevenR: true, questionSixR: false }); }break;
      case 8: {this.setState({questionEightR: true, questionSevenR: false }); }break;
      case 9: {this.setState({questionNineR: true, questionEightR: false }); }break;
     case 10: {this.setState({questionTenR: true, questionNineR: false }); }break;
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: 'white',}}>
        
          <Header style={{ backgroundColor: 'white',}}>


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
          <Content style={{ backgroundColor: 'transparent' }}>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>

              <QuestionButton text='السؤال الأول' onPress={() => { this._goQuestion1(1) }} locked={this.state.questionOne}  Recent={this.state.questionOneR}  />
              <QuestionButton text='السؤال الثاني' onPress={() => { this._goQuestion2(2) }} locked={this.state.questionTwo} Recent={this.state.questionTwoR} />
              <QuestionButton text='السؤال الثالث' onPress={() => { this._goQuestion3(3) }} locked={this.state.questionThree} Recent={this.state.questionThreeR} />
              <QuestionButton text='السؤال الرابع' onPress={() => { this._goQuestion4(4) }} locked={this.state.questionFour} Recent={this.state.questionFourR} />
              <QuestionButton text='السؤال الخامس' onPress={() => { this._goQuestion5(5) }} locked={this.state.questionFive} Recent={this.state.questionFiveR} />
              <QuestionButton text='السؤال السادس' onPress={() => { this._goQuestion6(6) }} locked={this.state.questionSix} Recent={this.state.questionSixR} />
              <QuestionButton text='السؤال السابع' onPress={() => { this._goQuestion7(7) }} locked={this.state.questionSeven} Recent={this.state.questionSevenR} />
              <QuestionButton text='السؤال الثامن' onPress={() => { this._goQuestion8(8) }} locked={this.state.questionEight}  Recent={this.state.questionEightR}/>
              <QuestionButton text='السؤال التاسع' onPress={() => { this._goQuestion9(9) }} locked={this.state.questionNine}  Recent={this.state.questionNineR}/>
              <QuestionButton text='السؤال العاشر' onPress={() => { this._goQuestion10(10) }} locked={this.state.questionTen}  Recent={this.state.questionTenR}/>

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

  row: {
    height: 35,
    justifyContent: 'center',
    backgroundColor: 'rgba(70, 79, 183, 1)',
    borderRadius: 20,
  },
  banner:{
    marginTop: 10,
    marginBottom: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  headerStyle: {
    alignSelf: 'center',
    marginLeft: 50,
  },
  text: {
    fontSize: 15,
    fontFamily:'jf',
    fontWeight: 'normal',
    color: '#4bb29e',
    marginLeft: 60,
  },
  buttonText: {
    fontSize: 23,
    fontFamily:'jf',
    fontWeight: 'normal',
    color: 'white',
    alignSelf: 'center',
  },
  backButton: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  scoreLogo: {
    width: logoWidth,
    height: logoWidth,
  },
  score: {
    fontSize: 22,
    fontFamily:'jf',
    fontWeight: 'normal',
    color: '#4bb29e',
    marginBottom: 4,
    marginRight: 4,
  },
  backText: {
    fontSize: 18,
    fontFamily:'System',
    fontWeight: 'normal',
    color: 'white',
    marginTop: 3,
    marginLeft: 3,
  }
})

export default Questions;