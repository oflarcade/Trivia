import React, { Component } from 'react';
import {  View,Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Header =(props)=> {

    
  
    return (
      <View style ={styles.header}>
        
            
            
                <Image 
                source ={require('../assets/images/logo.png')}
                style={styles.cart}
                />
            

            
      </View>
    );
  }


const styles = StyleSheet.create({
    header:{
        height : 50,
        backgroundColor:'#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        
    },
    cart:{
        width:50,
        height:50
    }
})


export default Header;