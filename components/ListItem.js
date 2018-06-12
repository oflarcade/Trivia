import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from './Icon';

const ListItem = ({ text, onPress, locked = true, selected = true, visible = true }) => (
    <TouchableHighlight onPress={onPress} >
      <View style={styles.row}>
        <Text style={styles.text}>{text}</Text>
        {selected ? <Icon visible={visible} locked={locked} /> : <Icon />}
      </View>
    </TouchableHighlight>
  );
  
  ListItem.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    locked: PropTypes.bool,
    selected: PropTypes.bool,
    visible: PropTypes.bool,
  };
  
  const styles = StyleSheet.create({
    row: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#FFF',
    },
    text: {
      color: '#01a3a4',
      fontSize: 16,
    },
  })

  export default ListItem;
