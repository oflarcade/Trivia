import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  View, Text,StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';

const screenWidth= Dimensions.get('window').width - 20

const ResponseButton =({text , onPress, disabled}) => {
      
    
    return (
      
        <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
        
          <View style={styles.button}>
              <Text style={styles.text} >{text}</Text>
          </View>
        
        </TouchableOpacity>
                  
      
    );
  
}

ResponseButton.propTypes={
  onPress : PropTypes.func,
  text : PropTypes.string,
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 10,
},
button:{
    backgroundColor: '#4bb29e',
    width: screenWidth,
    height: '100%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
},
text:{
    color:'white',
    fontSize: 18,
    fontWeight: 'normal',
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontFamily:'jf',
    }
})

export default ResponseButton;     