import React from "react";
import {View, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width ;


const Separator = () =><View style={styles.separator}/>

const styles= StyleSheet.create({
    separator:{
        backgroundColor:'#000',
        height: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
    }
})


export default Separator;