import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';
import Expo, { SQLite } from 'expo';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import { AdMobBanner } from "expo";
import DropdownAlert from 'react-native-dropdownalert';
import triviaStore from '../Store/store';
import { Switcher, TabButton, themeManager } from 'nachos-ui';

const buttonTheme = themeManager.getStyle('TabButton');

const newButtonTheme = {
  ...buttonTheme,
  BUTTON_BACKGROUND:'#fff',
  BUTTON_BORDER_WIDTH:1,
  BUTTON_BORDER_COLOR:'#4bb29e',
  BUTTON_BORDER_RADIUS:5,
  BUTTON_HEIGHT:25,
  BUTTON_FONT_COLOR:'black',
  BUTTON_FONT_SIZE:14,
  BUTTON_FONT_WEIGHT:'normal',
  BUTTON_FONT_FAMILY:'jf',
  BUTTON_SELECTED_BACKGROUND:'#4bb29e',
  BUTTON_SELECTED_FONT_COLOR:'white',
  BUTTON_SELECTED_BORDER_COLOR:'#4bb29e',
}
themeManager.setSource('TabButton', () => (newButtonTheme))

const screenWidth = Dimensions.get('window').width / 2;
const db = SQLite.openDatabase('database.db');

export default class About extends Component {

  constructor(props) {
    super(props);


    this.state = triviaStore.getState();
    triviaStore.subscribe(() => {
      this.setState(triviaStore.getState());
    });
  }

  componentWillMount() {
    StatusBar.setHidden(true, 'slide')
  }

  _goBack = () => {
    this.props.navigation.goBack(null)
  }
  reset = () => {
    db.transaction(tx =>{tx.executeSql('DROP TABLE GAMEDATABASE')})
    db.transaction(tx => {tx.executeSql('create table if not exists GAMEDATABASE (id integer primary key not null, levelNbr int, levelName text, questionNbr int, questionName text, questionSolved int, levelUnlocked int, questionOne int, questionTwo int, questionThree int, questionFour int, questionFive int, questionSix int, questionSeven int, questionEight int, questionNine int, questionTen int, score int )')});
    db.transaction( tx => {
      tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES  (1,1,"",1,"",0,0,0,1,1,1,1,1,1,1,1,1,0) ');
      tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES (2,2,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');
      tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES  (3,3,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');
      tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES (4,4,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');
      tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES (5,5,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');
      tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES  (6,6,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');
      tx.executeSql('INSERT INTO GAMEDATABASE (id, levelNbr, levelName, questionNbr, questionName,questionSolved, levelUnlocked, questionOne , questionTwo , questionThree , questionFour , questionFive , questionSix , questionSeven , questionEight , questionNine , questionTen , score  ) VALUES (7,7,"",1,"",0,1,0,1,1,1,1,1,1,1,1,1,0) ');})  

    triviaStore.dispatch({
      type: 'RESET',
   })
  }

  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
  }

  onReset() {
    
    this.dropdown.alertWithType('error', 'حسنة','تم مسح جميع البيانات');
    this.reset()
  }

  onLevelSelect(selected) {
    triviaStore.dispatch({type:'CHANGE_DIFFICULTY', selected})
    this.dropdown.alertWithType('info','حسنة','تم تغير المستوى')
  }
  render() {
    return (
      <Container style={{backgroundColor: 'white',}}>
        
          <Header style={{ backgroundColor: 'white', }}>
            <Left>
              <TouchableOpacity onPress={() => this._goBack()} style={{ flexDirection: 'row' }}>

                <ImageBackground source={require('../assets/images/left-arrow.png')} style={styles.scoreLogo} />


              </TouchableOpacity>
            </Left>
            <Body style={styles.headerStyle}>
              <Text style={styles.text}>حسنة</Text>
            </Body>
          </Header>
          <Content>
            <Card>
              
             
              <CardItem header bordered>
                  <Body style={{alignItems: 'center'}}>   
                  <Text  style={styles.cardTitle}>كيفية اللعب</Text> 
                  </Body>
              </CardItem>
                
                    <CardItem>
                      <Body style={{alignItems: 'center'}}>                      
                      <Text style={styles.cardContent}>اللعبة تحتوي على 7 أبواب</Text>  
                      </Body>
                    
                      </CardItem>

                      <CardItem>
                      <Body style={{alignItems: 'center'}}>
                        <Text style={styles.cardContent}>كل باب يحتوي على 10 أسئلة</Text>  
                      </Body>
                    
                      </CardItem> 

                      <CardItem>
                      <Body style={{alignItems: 'center'}}>
                      <Text style={styles.cardContent}>كل إجابة صحيحة تعطيك 10 حسنات</Text>
                      </Body>
                      
                      </CardItem> 

                      <CardItem>
                      <Body style={{alignItems: 'center'}}>
                      <Text style={styles.cardContent}> وإذا قال الحق سبحانه وتعالى : </Text>
                      <View style={{flexDirection: 'row',}}>
                      
                      <Text style={styles.cardContent}>مَن جَاء بِالْحَسَنَةِ فَلَهُ عَشْرُ أَمْثَالِهَا وَمَن جَاء بِالسَّيِّئَةِ فَلاَ يُجْزَى إِلاَّ مِثْلَهَا</Text>
                      
                      </View>
                      <Text style={styles.cardContent}>(سورة الأنعام)(160)</Text>
                      </Body>
                    
                      </CardItem> 
                    
                      <CardItem>
                      <Body style={{alignItems: 'center'}}>
                      <Text style={styles.cardContent}>بعد كل 5 إجابات صحيحة يفتح الباب التالي</Text>
                      </Body>
                      
                      </CardItem> 
                      <CardItem>
                          <Switcher
                            onChange={((difficulty) => this.onLevelSelect(difficulty) )}
                            defaultSelected={this.state.difficulty}
                            >
                                <TabButton value='medium' text='متوسط'  />
                                <TabButton value='easy' text='سهل'/>
                          </Switcher>
                        
                      </CardItem>
                      <CardItem style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',}}>
                      {/* <View style={{flexDirection: 'row',}}>
                        <Text style={styles.cardItems}>دعم التطبيق</Text>
                        <Button style={styles.button} rounded>  
                            <Icon name='coffee-outline' type='MaterialCommunityIcons' />
                        </Button>
                      </View> */}
                      <View style={{flexDirection: 'row', alignContent: 'center',}}>
                      <Text style={styles.cardItems}>حذف البيانات</Text>
                      <Button rounded style={styles.button}  onPress={()=>this.onReset()}>
                            <Icon name='delete-sweep' type='MaterialCommunityIcons' />
                        </Button>
                      </View>
            
                      </CardItem>
                      <CardItem style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',}}>
                      <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center',}}>
                      <Text style={styles.cardItems}>v.1.1.1 @oflcad</Text>
                      </View>
                      </CardItem>
            </Card>
          </Content>
          <AdMobBanner
                style={styles.bottomBanner}
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-3465282364470954/5610540285"
                testDeviceID="EMULATOR"
                didFailToReceiveAdWithError={this.bannerError}
                />
        
        <DropdownAlert
          ref={ref => this.dropdown = ref}
          closeInterval={4000}
          startDelta={50}
          endDelta={60}
          onClose={data => this.onClose(data)}
          errorImageSrc={require('../assets/images/delete.png')}
          tapToCloseEnabled={false}
          useNativeDriver={true}
          titleStyle={styles.titleInfo}
          messageStyle={styles.messageInfo}
          />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

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
  button:{
    backgroundColor: '#4bb29e',

  },
  cardTitle:{
    fontFamily:'jf',
    fontSize:24,
    fontWeight:"normal",
    color:'#4bb29e',

  },
  cardContainer:{
    flexDirection: 'row',
    marginLeft: 140,
  },
  cardContent:{
    fontSize:16,
    fontFamily:'jf',
    marginRight: 4,
  },
  cardItems:{
    marginTop: 10,
    fontSize:16,
    fontFamily:'jf',
    marginRight: 4,
  },
  main: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  back: {
    width: 20,
    height: 20,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: screenWidth,
    height: screenWidth,
    shadowColor: '#f6e58d',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    marginLeft: 30,
  },
  scoreLogo: {
    width: 30,
    height: 30,
  },
  backText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#b2ebf2',
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'jf',
    fontSize: 24,
    fontWeight: 'normal',
    color: '#4bb29e',

    marginLeft: 70,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
})
