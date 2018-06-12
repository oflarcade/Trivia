import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground  } from 'react-native';

const imageWidth = Dimensions.get('window').width;

const InfoButton =({text})=> {
    
    return (
        <View style={styles.container}>
      <ImageBackground source={require('../assets/images/Banner.png')} style={styles.Banner}>
            <Text style={styles.text}> {text} </Text>
        </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        marginTop: 30,
        
        justifyContent: 'flex-end',
        
    },
    Banner:{
        borderRadius: 20,
        width: imageWidth -150,
        height: 40,
        justifyContent: 'flex-start',
    },
    text:{
        marginTop: 3,
        marginRight: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color:'white'
    }
})

export default InfoButton;
