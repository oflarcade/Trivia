import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  View, Text,StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

const imageWidth = Dimensions.get('window').width /9; 
const sourceImgL = require('../assets/images/locked.png');
const sourceImgU = require('../assets/images/unlocked.png');
const colorNormal='#1B1464';
const btnStyles = { backgroundColor:'#00BFA5' ,flexDirection: 'row',borderRadius: 10,}
const QuestionButton =({text , onPress, locked, Recent }) => {
      
    if(locked){
        sourceImgL = require('../assets/images/locked.png');
    }else{
        sourceImgL = require('../assets/images/unlocked.png');   
    }
        

    return (
      
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <View style={[styles.insideContainer, !locked && styles.insideContainerValid]}>            
          <View style={styles.image}>
          <Image  style ={styles.icon} source={sourceImgL} />
          </View>
          <View style={styles.border} />
          <View style={styles.button}>
          <Text style={[styles.text, !locked && styles.textValid]}>{text}</Text>
          </View>
          </View>
        </TouchableOpacity>
                  
      
    );
  
}

QuestionButton.propTypes={
  onPress : PropTypes.func,
  text : PropTypes.string,
  locked : PropTypes.bool,
}

const styles = StyleSheet.create({
  container:{
    width:'60%',
    backgroundColor: 'transparent',
    marginBottom: 10,
    
},
side:{
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
},
button:{
   
    width: 180,
    height: 50,

    alignItems: 'center',
    justifyContent: 'center',
},
icon:{
    width: 35,
    height: 35,
},
sideIcon:{
    width: 35,
    height: 35,
},
image:{
    alignItems: 'center',
   marginTop: 10,
   marginLeft: 5,
   marginRight: 5,

},
text:{
    color:'white',
    fontSize: 18,
    fontWeight: 'normal',
    paddingVertical: 20,
    fontFamily:'jf',
},
textValid:{
    color: 'black',
    fontSize: 18,
    fontWeight: 'normal',
    paddingVertical: 20,
    fontFamily:'jf',
},
sideText:{
    color:'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 5,
    marginRight: 10,
    fontFamily:'mobily',
    },
insideContainer:{
    backgroundColor:'#00BFA5' ,
    flexDirection: 'row',
    borderRadius: 10,
},
insideContainerValid:{
    backgroundColor: '#B2DFDB' ,
    flexDirection: 'row',
    borderRadius: 10,
},
insideContainerRecent:{
    backgroundColor: '#FF9100' ,
    flexDirection: 'row',
    borderRadius: 10,
},
border:{
    height: 50,
    width: StyleSheet.hairlineWidth,
    backgroundColor:'white', 
}
})

export default QuestionButton;     