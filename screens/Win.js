import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image,  Animated, Easing} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Expo, { SQLite, AdMobBanner } from 'expo';
import { Container, Content, Body, Right, Header, Left, Button } from 'native-base';
import AwesomeButton from 'react-native-really-awesome-button';
import AnimateNumber from 'react-native-animate-number'
import DropdownAlert from 'react-native-dropdownalert';
import LottieView from 'lottie-react-native';


import triviaStore from '../Store/store';
import questionsText from '../data/questions';
import levels from '../data/levels';

const db = SQLite.openDatabase('database.db');
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



  onError = () => {
    let msg = '';
    if (this.state.questionNbr < 10) {
      msg = questionsText[this.state.questionNbr + 1].name;
    }
    else {
      msg = questionsText[this.state.questionNbr].name
    }
    switch (this.state.questionNbr) {
      case 1: {
        if (this.state.questionTwo) {
          this.dropdown.alertWithType('success', 'تم فتح', msg);
        }
      } break;
      case 2: {
        if (this.state.questionThree) {
          this.dropdown.alertWithType('success', 'تم فتح', msg);
        }
      } break;

      case 3: {
        if (this.state.questionFour) {
          this.dropdown.alertWithType('success', 'تم فتح', msg);
        }
      } break;
      case 4: {
        if (this.state.questionFive) {
          this.dropdown.alertWithType('success', 'تم فتح', msg);
        }
      } break;
      case 5: {
        if (this.state.questionSix) {
          this.dropdown.alertWithType('success', 'تم فتح', msg);
          if (!(this.state.levelNbr == 7))
            setTimeout(() => { this.dropdown.alertWithType('success', 'تم فتح', levels[this.state.levelNbr + 1].name); }, 2000)
        }
      } break;
      case 6: {
        if (this.state.questionSeven) {
          this.dropdown.alertWithType('success', 'تم فتح', msg);
        }
      } break;
      case 7: {
        if (this.state.questionEight) {
          this.dropdown.alertWithType('success', 'تم فتح', msg);
        }
      } break;
      case 8: {
        if (this.state.questionNine) {
          this.dropdown.alertWithType('success', 'تم فتح', msg);
        }
      } break;
      case 9: {
        if (this.state.questionTen) {
          this.dropdown.alertWithType('success', 'تم فتح', msg);
        }
      } break;
      default: {
        this.dropdown.alertWithType('success', 'حسنة', ' لقد انتهيت من جميع الأسئلة لهذا المستوى');

      }
    }
  };

  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
  }

  componentWillMount() {
    //this.persistQuestionData(this.state.levelNbr, this.state.questionNbr)
  }

  componentDidMount() {
    this.onError();
    this.animation.play();
  }

  displayStore (){
    console.log(triviaStore.getState())
  }
  displayData = (id) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM GAMEDATABASE WHERE id = ?',
        [id],
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let row = results.rows.item(0);
            console.log(row)
          }
        })
    })
  }

  bannerError() {
    console.log("An error");
    return;
  }

  scorePersistor = (score) => {
    let dataScore = 0;
    db.transaction(tx =>{tx.executeSql('SELECT score FROM GAMEDATABASE WHERE id = 1',
    null,
    (tx, results)=>{
      let len = results.rows.length;
      if (len > 0) { 
          let row = results.rows.item(0);
          
          dataScore = row.score
        }
    })})
    if(score === 0) {score = 10 }
    if (dataScore < score) {
      db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET score = ? WHERE id = 1', [score]) })
    }
    
    triviaStore.subscribe(()=>{
      this.setState(triviaStore.getState())
    })
    db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET score = ? WHERE id = 1', [score]) })

    
  }

  levelPersistor(ln){
    db.transaction(tx =>{
      tx.executeSql('UPDATE GAMEDATABASE SET questionOne = ?, questionTwo = ?, questionThree = ?, questionFour = ?, questionFive = ?, questionSix = ?, questionSeven = ?, questionEight = ?, questionNine = ?, questionTen = ? WHERE id = ?',
      [this.state.questionOne, this.state.questionTwo, this.state.questionThree, this.state.questionFour, this.state.questionFive,  this.state.questionSix, this.state.questionSeven, this.state.questionEight, this.state.questionNine,  this.state.questionTen, this.state.levelNbr ])
    })
  }
  persistQuestionData = (ln, qn) => {                      // here dispatch NextquestionUnlocker levelunlocker then  we persist ,the questionStatus ,the questionSolved ,the score 

    if (ln === 1) {
      switch (qn) {
        case 1:
          {
            let questionUnlocked = this.state.questionUnlocked; 
            

            if (!this.state.questionOne && this.state.questionTwo) {
              triviaStore.dispatch({ type: 'SCORE' }); // plus 10
              
            } else {
              triviaStore.dispatch({ type: 'SCOREBEFORE' });  // plus 1
              
            }
            triviaStore.dispatch({ type: 'UNLOCKQ2' });
            
            
              
            db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionOne = 0, questionTwo = 0, score = ?, questionSolved = ? WHERE id = 1', [this.state.score, this.state.questionUnlocked]); })
          } 
          this.scorePersistor(this.state.score) ; break;

        case 2: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked });
           if (!this.state.questionTwo && this.state.questionThree) { 
             triviaStore.dispatch({ type: 'SCORE' }); 
            } else { 
              triviaStore.dispatch({ type: 'SCOREBEFORE' }); 
          } 
          triviaStore.dispatch({ type: 'UNLOCKQ3' });
          console.log('entering database:',this.state.score)
          this.scorePersistor(this.state.score)
          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTwo = 0, questionThree = 0, score = ?, questionSolved = ? WHERE id = 1', [this.state.score, this.state.questionUnlocked]); })


          this.scorePersistor(this.state.score);
        } break;

        case 3: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionThree && this.state.questionFour) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ4' });
          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionThree = 0, questionFour = 0, score = ?, questionSolved = ? WHERE id = 1', [this.state.score, this.state.questionUnlocked]); })
          this.scorePersistor(this.state.score);
        } break;

        case 4: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFour && this.state.questionFive) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ5' });
          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionFour = 0, questionFive = 0, score = ?, questionSolved = ? WHERE id = 1', [this.state.score, this.state.questionUnlocked]); })
          this.scorePersistor(this.state.score);
        } break;

        case 5: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFive && this.state.questionSix) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ6' }); triviaStore.dispatch({ type: 'UNLOCKL2' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionFive = 0, questionSix = 0, score = ?, questionSolved = ? WHERE id = 1', [this.state.score, this.state.questionUnlocked]);
          })
          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET levelUnlocked = 0 WHERE id = 2'); })
          this.scorePersistor(this.state.score);
        } break;

        case 6: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSix && this.state.questionSeven) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ7' });
          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSix = 0, questionSeven = 0, score = ?, questionSolved = ? WHERE id = 1', [this.state.score, this.state.questionUnlocked]); })
          this.scorePersistor(this.state.score);
        } break;

        case 7: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSeven && this.state.questionEight) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ8' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionSeven = 0, questionEight = 0, score = ?, questionSolved = ? WHERE id = 1', [this.state.score, this.state.questionUnlocked]);
          })
          this.scorePersistor(this.state.score);
        } break;

        case 8: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionEight && this.state.questionNine) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ9' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionEight = 0, questionNine = 0, score = ?, questionSolved = ? WHERE id = 1', [this.state.score, this.state.questionUnlocked]);
          })
          this.scorePersistor(this.state.score);
        } break;

        case 9: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionNine && this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ10' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionNine = 0, questionTen = 0, score = ?, questionSolved = ? WHERE id = 1', [this.state.score, this.state.questionUnlocked]);
          })
          this.scorePersistor(this.state.score);
        } break;

        case 10: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionTen && this.state.levelTwo) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); }
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionTen = 0, score = ?, questionSolved = ? WHERE id = 1', [this.state.score, this.state.questionUnlocked]);

          })
          this.scorePersistor(this.state.score);
        } break;
      }
    } else if (ln === 2) {
      switch (qn) {
        case 1: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked });
           if (!this.state.questionOne && this.state.questionTwo) {
              triviaStore.dispatch({ type: 'SCORE' }); 
            } else { 
              triviaStore.dispatch({ type: 'SCOREBEFORE' }); 
            } 
            triviaStore.dispatch({ type: 'UNLOCKQ2' });
          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionOne = 0, questionTwo = 0 WHERE id = 2'); })
          this.scorePersistor(this.state.score);
        } break;
        case 2: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionTwo && this.state.questionThree) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ3' });
          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTwo = 0, questionThree = 0 WHERE id = 2'); })
          this.scorePersistor(this.state.score);
        } break;
        case 3: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionThree && this.state.questionFour) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ4' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionThree = 0, questionFour = 0 WHERE id = 2');
          })
          this.scorePersistor(this.state.score);
        } break;
        case 4: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFour && this.state.questionFive) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ5' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionFour = 0, questionFive = 0 WHERE id = 2');
          })
          this.scorePersistor(this.state.score);
        } break;
        case 5: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFive && this.state.questionSix) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ6' }); triviaStore.dispatch({ type: 'UNLOCKL3' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionFive = 0, questionSix = 0 WHERE id = 2');
            tx.executeSql('UPDATE GAMEDATABASE SET levelUnlocked = 0 WHERE id = 3');
          })
          this.scorePersistor(this.state.score);
        } break;
        case 6: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSix && this.state.questionSeven) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ7' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionSix = 0, questionSeven = 0 WHERE id = 2');
          })
          this.scorePersistor(this.state.score);
        } break;
        case 7: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSeven && this.state.questionEight) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ8' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionSeven = 0, questionEight = 0 WHERE id = 2');
          })
          this.scorePersistor(this.state.score);
        } break;
        case 8: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionEight && this.state.questionNine) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ9' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionEight = 0, questionNine = 0 WHERE id = 2');
          })
          this.scorePersistor(this.state.score);
        } break;
        case 9: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionNine && this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ10' });
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionNine = 0, questionTen = 0 WHERE id = 2');
          })
          this.scorePersistor(this.state.score);
        } break;
        case 10: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); }
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionTen = 0 WHERE id = 2');
          })
          this.scorePersistor(this.state.score);
        } break;
      }
    } else if (ln === 3) {
      switch (qn) {
        case 1: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;
          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionOne = 0, questionTwo = 0 WHERE id = 3'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionOne && this.state.questionTwo) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ2' });
          this.scorePersistor(this.state.score)
        }
          break;
        case 2: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTwo = 0, questionThree = 0 WHERE id = 3'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionTwo && this.state.questionThree){ triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ3' });
          this.scorePersistor(this.state.score)
        } break;
        case 3: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;
          this.scorePersistor(this.state.score)
          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionThree = 0, questionFour  = 0 WHERE id = 3');
          })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionThree && this.state.questionFour) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ4' });
          this.scorePersistor(this.state.score)
        } break;
        case 4: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionFour = 0, questionFive = 0 WHERE id = 3');
            triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFour && this.state.questionFive) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ5' });
            this.scorePersistor(this.state.score)
          })
        } break;
        case 5: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionFive = 0, questionSix  = 0 WHERE id = 3');
            tx.executeSql('UPDATE GAMEDATABASE SET levelUnlocked = 0 WHERE id = 4');
          })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFive && this.state.questionSix) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ6' }); triviaStore.dispatch({ type: 'UNLOCKL4' });
          this.scorePersistor(this.state.score)
        } break;
        case 6: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSix = 0, questionSeven = 0 WHERE id = 3'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSix && this.state.questionSeven) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ7' });
          this.scorePersistor(this.state.score)
        } break;
        case 7: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSeven = 0, questionEight = 0 WHERE id = 3'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSeven && this.state.questionEight) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ8' });
          this.scorePersistor(this.state.score)
        } break;
        case 8: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionEight = 0, questionNine = 0 WHERE id = 3'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionEight && this.state.questionNine) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ9' });
          this.scorePersistor(this.state.score)
        } break;
        case 9: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionNine = 0, questionTen = 0 WHERE id = 3'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionNine && this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ10' });
          this.scorePersistor(this.state.score)
        } break;
        case 10: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTen = 0 WHERE id = 3'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); }
          this.scorePersistor(this.state.score)
        } break;
      }
    } else if (ln === 4) {
      switch (qn) {
        case 1: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionOne = 0, questionTwo = 0 WHERE id = 4'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionOne && this.state.questionTwo) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ2' });
          this.scorePersistor(this.state.score);
        } break;
        case 2: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTwo = 0, questionThree = 0 WHERE id = 4'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionTwo && this.state.questionThree){ triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ3' });
          this.scorePersistor(this.state.score);
        } break;
        case 3: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionThree = 0, quetionFour = 0 WHERE id = 4'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionThree && this.state.questionFour) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ4' });
          this.scorePersistor(this.state.score);
        } break;
        case 4: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionFour = 0, questionFive = 0 WHERE id = 4'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFour && this.state.questionFive) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ5' });
          this.scorePersistor(this.state.score);
        } break;
        case 5: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionFive = 0, questionSix = 0 WHERE id = 4');
            tx.executeSql('UPDATE GAMEDATABASE SET levelUnlocked = 0 WHERE id = 5');
          })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFive && this.state.questionSix) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ6' }); triviaStore.dispatch({ type: 'UNLOCKL5' });
          this.scorePersistor(this.state.score);
        } break;
        case 6: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSix = 0, questionSeven = 0 WHERE id = 4'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSix && this.state.questionSeven) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ7' });
          this.scorePersistor(this.state.score);
        } break;
        case 7: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSeven = 0, questionEight = 0 WHERE id = 4'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSeven && this.state.questionEight) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ8' });
          this.scorePersistor(this.state.score);
        } break;
        case 8: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionEight = 0, questionNine = 0 WHERE id = 4'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionEight && this.state.questionNine) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ9' });
          this.scorePersistor(this.state.score);
        } break;
        case 9: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionNine = 0, questionTen = 0 WHERE id = 4'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionNine && this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ10' });
          this.scorePersistor(this.state.score);
        } break;
        case 10: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTen = 0 WHERE id = 4'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); }
        } break;
      }
    } else if (ln === 5) {
      switch (qn) {
        case 1: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionOne = 0, questionTwo = 0 WHERE id = 5'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionOne && this.state.questionTwo) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ2' });
          this.scorePersistor(this.state.score)
        } break;
        case 2: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTwo = 0, questionThree = 0 WHERE id = 5'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionTwo && this.state.questionThree){ triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ3' });
          this.scorePersistor(this.state.score)
        } break;
        case 3: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionThree = 0, questionFour = 0 WHERE id = 5'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionThree && this.state.questionFour) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ4' });
          this.scorePersistor(this.state.score)
        } break;
        case 4: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionFour = 0, questionFive = 0 WHERE id = 5'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFour && this.state.questionFive) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ5' });
          this.scorePersistor(this.state.score)
        } break;
        case 5: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionFive = 0, questionSix = 0 WHERE id = 5');
            tx.executeSql('UPDATE GAMEDATABASE SET levelUnlocked = 0 WHERE id = 6');
          })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFive && this.state.questionSix) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ6' }); triviaStore.dispatch({ type: 'UNLOCKL6' });
          this.scorePersistor(this.state.score)
        } break;
        case 6: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSix = 0, questionSeven = 0 WHERE id = 5'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSix && this.state.questionSeven) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ7' });
          this.scorePersistor(this.state.score)
        } break;
        case 7: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSeven = 0, questionEight = 0 WHERE id = 5'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSeven && this.state.questionEight) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ8' });
          this.scorePersistor(this.state.score)
        } break;
        case 8: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionEight = 0, questionNine = 0 WHERE id = 5'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionEight && this.state.questionNine) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ9' });
          this.scorePersistor(this.state.score)
        } break;
        case 9: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionNine = 0, questionTen = 0 WHERE id = 5'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionNine && this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ10' });
          this.scorePersistor(this.state.score)
        } break;
        case 10: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTen = 0 WHERE id = 5'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else {
            triviaStore.dispatch({ type: 'SCOREBEFORE', score });
            this.scorePersistor(this.state.score)
          }
        } break;
      }
    } else if (ln === 6) {
      switch (qn) {
        case 1: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionOne = 0, questionTwo = 0 WHERE id = 6'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionOne && this.state.questionTwo) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ2' });
          this.scorePersistor(this.state.score)
        } break;
        case 2: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTwo = 0, questionThree = 0 score =?, questionSolved = ? WHERE id = 6', [this.state.score, this.state.questionUnlocked]); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionTwo && this.state.questionThree){ triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ3' });
          this.scorePersistor(this.state.score)
        } break;
        case 3: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionThree = 0, questionFour = 0 WHERE id = 6'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionThree && this.state.questionFour) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ4' });
          this.scorePersistor(this.state.score)
        } break;
        case 4: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionFour = 0, questionFive = 0 WHERE id = 6'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFour && this.state.questionFive) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ5' });
          this.scorePersistor(this.state.score)
        } break;
        case 5: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => {
            tx.executeSql('UPDATE GAMEDATABASE SET questionFive = 0, questionSix = 0 WHERE id = 6');
            tx.executeSql('UPDATE GAMEDATABASE SET levelUnlocked = 0 WHERE id = 7');
          })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFive && this.state.questionSix) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ6' }); triviaStore.dispatch({ type: 'UNLOCKL7' });
          this.scorePersistor(this.state.score)
        } break;
        case 6: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSix = 0, questionSeven = 0 WHERE id = 6'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSix && this.state.questionSeven) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ7' });
          this.scorePersistor(this.state.score)
        } break;
        case 7: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSeven = 0, questionEight = 0 WHERE id = 6'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSeven && this.state.questionEight) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ8' });
          this.scorePersistor(this.state.score)
        } break;
        case 8: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionEight = 0, questionNine = 0 WHERE id = 6'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionEight && this.state.questionNine) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ9' });
          this.scorePersistor(this.state.score)
        } break;
        case 9: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionNine = 0, questionTen = 0 WHERE id = 6'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionNine && this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ10' });
          this.scorePersistor(this.state.score)
        } break;
        case 10: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTen = 0 WHERE id = 6'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else {
            triviaStore.dispatch({ type: 'SCOREBEFORE', score });
            this.scorePersistor(this.state.score)
          }
        } break;
      }
    } else if (ln === 7) {
      switch (qn) {
        case 1: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionOne = 0, questionTwo = 0 WHERE id = 7'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionOne && this.state.questionTwo) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ2' });
          this.scorePersistor(this.state.score)
        } break;
        case 2: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTwo = 0, questionThree = 0 WHERE id = 7'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionTwo && this.state.questionThree){ triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ3' });
          this.scorePersistor(this.state.score)
        } break;
        case 3: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionThree = 0, questionFour = 0 WHERE id = 7'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionThree && this.state.questionFour) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ4' });
          this.scorePersistor(this.state.score)
        } break;
        case 4: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionFour = 0, questionFive = 0 WHERE id = 7'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFour && this.state.questionFive) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ5' });
          this.scorePersistor(this.state.score)
        } break;
        case 5: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionFive = 0, questionSix = 0 WHERE id = 7'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionFive && this.state.questionSix) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ6' });
          this.scorePersistor(this.state.score)
        } break;
        case 6: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSix = 0, questionSeven = 0 WHERE id = 7'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSix && this.state.questionSeven) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ7' });
          this.scorePersistor(this.state.score)
        } break;
        case 7: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionSeven = 0, questionEight = 0 WHERE id = 7'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionSeven && this.state.questionEight) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ8' });
          this.scorePersistor(this.state.score)
        } break;
        case 8: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionEight = 0, questionNine= 0 WHERE id = 7'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionEight && this.state.questionNine) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ9' });
          this.scorePersistor(this.state.score)
        } break;
        case 9: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionNine = 0, questionTen = 0 WHERE id = 7'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (!this.state.questionNine && this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else { triviaStore.dispatch({ type: 'SCOREBEFORE' }); } triviaStore.dispatch({ type: 'UNLOCKQ10' });
          this.scorePersistor(this.state.score)
        } break;
        case 10: {
          let questionUnlocked = this.state.questionUnlocked; let score = this.state.score;

          db.transaction(tx => { tx.executeSql('UPDATE GAMEDATABASE SET questionTen = 0 WHERE id = 7'); })
          triviaStore.dispatch({ type: 'SOLVED', questionUnlocked }); if (this.state.questionTen) { triviaStore.dispatch({ type: 'SCORE' }); } else {
            triviaStore.dispatch({ type: 'SCOREBEFORE', score });
            this.scorePersistor(this.state.score)
          }
        } break;
      }
    }
  }

  //if levelone is unlocked keep array of data 

  _goBack = () => {
    /*  */
    if (this.state.questionNbr < 10) {
      this.props.navigation.navigate('Questions');
    } else
      this.props.navigation.navigate('Level');
  }
  getText = () => {
    let text1 = 'السؤال التالي'
    let text2 = 'الباب التالي'
    if (this.state.questionNbr < 10) {
      return text1
    }
    else {
      return text2
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white', }}>


<LottieView source={require('../animation/confetti.json')} ref={animation => {this.animation = animation;}} style={styles.animation} loop={true} />
        <Content style={styles.container}>
        
          <View style={styles.body}>

            <AnimateNumber
              style={styles.score}
              value={this.state.score}
              countBy={this.state.questionNbr}
              timing="easeOut" />
            <Animatable.Text animation="fadeInUpBig" iterationCount={1} direction="alternate" easing="ease" useNativeDriver onAnimationEnd={()=> { this.persistQuestionData(this.state.levelNbr, this.state.questionNbr); this.scorePersistor(this.state.score)}} style={styles.text}> أحسنت</Animatable.Text>
            <AwesomeButton
              borderRadius={8}
              textSize={20}
              activityColor={'#DCEDC8'}
              backgroundProgress={'#1DE9B6'}
              backgroundColor={'#4bb29e'}
              progress
              onPress={() => { setTimeout(() => { this._goBack() }, 3000); }}>
              <Text style={styles.buttonText}> {this.getText()} </Text>
            </AwesomeButton>
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
        <DropdownAlert
          ref={ref => this.dropdown = ref}
          closeInterval={4000}

          onClose={data => this.onClose(data)}
          successImageSrc={require('../assets/images/win.png')}
          tapToCloseEnabled={false}
          useNativeDriver={true}
          titleStyle={styles.titleInfo}
          messageStyle={styles.messageInfo}
          replaceEnabled
          successColor={'#4bb29e'} />
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    marginHorizontal: 70,
    marginVertical: 30,
    //backgroundColor: '#A3CB38',
  },
  titleInfo: {
    fontSize: 18,
    textAlign: 'right',
    fontWeight: 'normal',
    fontFamily: 'jf',
    color: 'white',
    backgroundColor: 'transparent'
  },
  messageInfo: {
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'normal',
    fontFamily: 'jf',
    color: 'white',
    backgroundColor: 'transparent'
  },
  banner: {
    marginTop: 30,
    marginBottom: 1,
  },
  scoreContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  winBg: {
    width: bannerWidth - 20,
    height: '100%',
    marginLeft: 9,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'jf',
  },
  text: {
    marginLeft: 5,
    marginTop: 10,
    fontSize: 58,
    fontWeight: 'normal',
    color: '#4bb29e',
    textAlign: 'center',
    fontFamily: 'jf',
  },
  title: {
    fontSize: 19,
    fontWeight: 'normal',
    color: '#4bb29e',
    marginBottom: 4,
    fontFamily: 'jf',
    marginLeft: 90,
  },
  scoreLogo: {
    width: bannerWidth / 12,
    height: bannerWidth / 12,
  },
  score: {

    fontSize: 100,
    fontWeight: 'normal',
    fontFamily: 'jf',
    color: '#4bb29e',

  },
  headerStyle: {
    alignSelf: 'center',
    marginLeft: 50,
  },
  animation: {
    position: 'absolute',
    width: bannerWidth - 30,
    height: screenHeight - 50,
  },
})