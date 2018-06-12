import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width/8;

const Icon = ({ visible, locked }) => {
    if (visible) {
      const iconStyles = [styles.icon];
      if (visible) {
        iconStyles.push(styles.iconVisible);
      }
  
      return (
        <View style={iconStyles}>
          {locked?
           <Image
              source={require('../assets/images/locked.png')}
              style={styles.lockedIcon}
              resizeMode="contain"/>
            : null}
        </View>
      );
    }
  
    return <View style={styles.icon} />;
  };
  



  Icon.propTypes = {
    visible: PropTypes.bool,
    locked: PropTypes.bool,
  };
  

const styles= StyleSheet.create({
  icon: {
        marginTop: 5,
        backgroundColor: 'transparent',
        borderRadius: 15,
        width: 20,
        height:20,
        alignItems: 'center',
        justifyContent: 'center',
      },
  iconVisible: {
        backgroundColor: '#FFF',
      },
  lockedIcon: {
        width: 20,
        height: 20,
        marginTop: 5,
      },
})

  
  export default Icon;