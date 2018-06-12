import React from 'react';
import { Dimensions, StyleSheet, Text, View,  TouchableOpacity } from 'react-native';
import { ActionSheet, Container, Content, Button } from 'native-base';
import * as Animatable from 'react-native-animatable';

import Expo, { SQLite } from 'expo';
import triviaStore from '../Store/store';
import { AdMobBanner } from "expo";
import QuestionData from '../data/QuestionData';
import QuestionDataTwo from '../data/QuestionDataTwo';

const BUTTONS = ['Copy Link', 'Whatsapp', 'Messenger', 'Facebook', 'Cancel'];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;
const screenWidth = Dimensions.get('window').width - 50;
const db = SQLite.openDatabase('database.db');

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = triviaStore.getState();
    triviaStore.subscribe(() => {
      this.setState(triviaStore.getState());
    });
  }

  componentDidMount() {
    this.createTable();  
    this.update();
  }
 
  createTable() {
   
        
        //db.transaction(tx =>{tx.executeSql('DROP TABLE GAMEDATABASE')})
        db.transaction(tx => {tx.executeSql('create table if not exists GAMEDATABASE (id integer primary key not null, levelNbr int, levelName text, questionNbr int, questionName text, questionSolved int, levelUnlocked int, questionOne int, questionTwo int, questionThree int, questionFour int, questionFive int, questionSix int, questionSeven int, questionEight int, questionNine int, questionTen int, score int )')});
      db.transaction( tx => {
          tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES  (1,1,"",1,"",0,0,0,1,1,1,1,1,1,1,1,1,0) ');
          tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES (2,2,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');
          tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES  (3,3,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');
          tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES (4,4,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');
          tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES (5,5,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');
          tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES  (6,6,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');
          tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES (7,7,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');})  
      
  }

 

  _handlePress = () => {
    this.props.navigation.navigate('Level');

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
  }

  update() {
    db.transaction(tx => {
      tx.executeSql('SELECT * from GAMEDATABASE',                                           // database name is GAMEDATABASE
        null,
        (tx, results) => {
          let len = results.rows.length;
          //console.log('lenght of our table is : ',results.rows.length)                    // the length of our GAMA DB table
          //console.log('this should be our fresh database', results.rows)                  // Display the hole data base 
          if (len > 0) {
            //we have lift off
          
            let row = results.rows.item(0);                                                  // this is the first level table
            let secondRow = results.rows.item(1);                                            // this is the second level table
            let thirdRow = results.rows.item(2);                                             // this is the third level table
            let FourthRow = results.rows.item(3);                                            // this is the fourth level table
            let FifthRow = results.rows.item(4);                                             // this is the fifth level table
            let sixthRow = results.rows.item(5);                                             // this is the sixth level table
            let seventhRow = results.rows.item(6);                                           // this is the seventh level table
            let score = row.score;                                                           // score of the player for level One not cumulative
            console.log('this is our score :', score);
            
            let levelName = row.levelName;                                                   // the name of the level
            let levelNbr = row.levelNbr;                                                     // the nbr of the level
            let questionNbr = row.questionNbr;                                               // the question nbr
            let questionName = row.questionName;                                             // the question name

            let levelOne = this.convert(row.levelUnlocked);                             // the level one boolean value // unlocked 0 // locked 1
            let levelTwo = this.convert(secondRow.levelUnlocked);                       // the level two boolean value // unlocked 0 // locked 1
            let levelThree = this.convert(thirdRow.levelUnlocked);                      // the level three boolean value // unlocked 0 // locked 1
            let levelFour = this.convert(FourthRow.levelUnlocked);                      // the level four boolean value // unlocked 0 // locked 1
            let levelFive = this.convert(FifthRow.levelUnlocked);                       // the level five boolean value // unlocked 0 // locked 1
            let levelSix = this.convert(sixthRow.levelUnlocked);                        // the level six boolean value // unlocked 0 // locked 1
            let levelSeven = this.convert(seventhRow.levelUnlocked);                    // the level seven boolean value // unlocked 0 // locked 1

            

            let questionOne = this.convert(row.questionOne);                 // the question one boolean value // unlocked 0 // locked 1
            let questionTwo = this.convert(row.questionTwo);                 // the question two boolean value // unlocked 0 // locked 1
            let questionThree = this.convert(row.questionThree);             // the question three boolean value // unlocked 0 // locked 1
            let questionFour = this.convert(row.questionFour);               // the question four boolean value // unlocked 0 // locked 1
            let questionFive = this.convert(row.questionFive);               // the question five boolean value // unlocked 0 // locked 1
            let questionSix = this.convert(row.questionSix);                 // the question six boolean value // unlocked 0 // locked 1
            let questionSeven = this.convert(row.questionSeven);             // the question seven boolean value // unlocked 0 // locked 1
            let questionEight = this.convert(row.questionEight);             // the question eight boolean value // unlocked 0 // locked 1
            let questionNine = this.convert(row.questionNine);               // the question nine boolean value // unlocked 0 // locked 1
            let questionTen = this.convert(row.questionTen);                 // the question ten boolean value // unlocked 0 // locked 1

            let questionUnlocked = row.questionSolved;                            // this is the value for level one 

        

            triviaStore.dispatch({                                                        //Store dispatch
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
        }
      )
    })
    console.log('this.our store state :', this.state.score);
  }
   
  // this is a helper function for to convert data into boolean
  convert = (input) => {
    if (input === 1) {
      return true;
    } else if (input === 0) {
      return false;
    }
  }
  bannerError() {
    console.log("An error");
    return;
  }

  goAbout = () => {
    this.props.navigation.navigate('about');
  }

  render() {


    return (
      <Container style={styles.back} >
        
          <View style={styles.body}>
           <View>
                <TouchableOpacity onPress={() => this.goAbout()}>
                  <Animatable.Image animation="slideInRight" iterationCount={1} direction='alternate' easing='ease-in-out-circ' iterationDelay={500} useNativeDriver source={require('../assets/images/option.png')} style={styles.ads} ></Animatable.Image>
                </TouchableOpacity>
              </View>
            <Content >
              {/* <LottieView source={require('../animation/logoAnimation.json')} progress={this.state.progress} style={styles.logo} /> */}

               <Animatable.Image animation="bounceInDown" iterationCount={1} direction="alternate" easing="linear" useNativeDriver source={require('../assets/images/logo.png')} style={styles.logo}>
               </Animatable.Image> 
              <Button block transparent onPress={this._handlePress}>
                <Text style={styles.text}>ابدأ اللعبة</Text>
              </Button>

               
             
            </Content>
          </View>
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
  logo: {
    width: screenWidth,
    height: screenWidth,
    
  },
  back:{
      backgroundColor: 'white',
  },  
  banner:{
    marginTop: 30,
    marginBottom: 3,
  },
  body: {
    flex: 3,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'jf',
    fontSize: 24,
    fontWeight: 'normal',
    color: '#4bb29e',
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  ads: {
    borderColor: 'black',
    marginTop: 10,
    width: screenWidth / 8,
    height: screenWidth / 8,
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
});

export default HomeScreen;