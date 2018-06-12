import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  View, Text,StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

const imageWidth = Dimensions.get('window').width /9;
 
const sourceImgL = require('../assets/images/locked.png');
const stl = false;

const LevelButton =({text , onPress, locked, doorImage, textColor,}) => {
      
    if(locked){
        sourceImgL = require('../assets/images/locked.png');
    }else{
        sourceImgL = require('../assets/images/unlocked.png');
    }

    if(textColor && bgColor){
        stl = true
    }else {
        stl = false
    }

    return (
      
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <View style={[styles.insideContainer , !locked && styles.insideValidContainer ]}>            
                <View style={styles.image}>
                      <Image  style ={styles.icon} source={sourceImgL} />
                </View>

                <View style={styles.border} />

                <View style={styles.button}>
                        <Text style={[styles.text, !locked && styles.textValid ]}>{text}</Text>
                </View>

                
          </View>
        </TouchableOpacity>
                  
      
    );
  
}

LevelButton.propTypes={
  onPress : PropTypes.func,
  text : PropTypes.string,
  locked : PropTypes.bool,
}

const styles = StyleSheet.create({
  container:{
    width:'70%',
    backgroundColor: 'transparent',
    marginBottom: 10,
    
},
insideValidContainer:{
    backgroundColor: '#B2DFDB' ,
    flexDirection: 'row',
    borderRadius: 10,
},
side:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginHorizontal: 10,
    marginVertical: 10,
},
button:{
    flex:1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginHorizontal:9
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
   marginHorizontal: 10,
   marginVertical: 10,

},
text:{
    color: 'white',
    fontSize: 17,
    fontWeight: 'normal',
    fontFamily:'jf',
    
},
textValid:{
    color: 'black',
    fontSize: 17,
    fontWeight: 'normal',
    fontFamily:'jf',
    
},
sideText:{
    color:'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily:'mobily',
    marginLeft: 5,
    marginRight: 10,
},
insideContainer:{
    backgroundColor: '#00BFA5' ,
    flexDirection: 'row',
    borderRadius: 10,
},
border:{
    height: 50,
    width: StyleSheet.hairlineWidth,
    backgroundColor:'#FFF', 
}
})

export default LevelButton;     