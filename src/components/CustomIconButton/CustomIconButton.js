import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton } from "@react-native-material/core";

const CustomIconButton = ({ onPress, size, textColor, IconName, type}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <IconButton icon={props => <Icon name={IconName} size={size} style={[styles[`text_${textColor}`]]}/>} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        // alignItems: "center",
        // // width: '100%',
        // padding: 15,
        marginVertical: 20,
        borderRadius: 12,
        borderColor: '#4772E1',
        backgroundColor: '#e2f0fd',
        // borderColor: '#4772E1',
        borderWidth: 1,
        // borderRadius: 24,
        width:50,
        marginRight: 5
    },
    text:{
        fontWeight: "bold",
        color: "#dc143c",
    },
    container_PRIMARY: {
      backgroundColor:"#87ceeb",
    },
    container_BASE: {
      backgroundColor:"#4772E1",
    },
    container_DEFAULT: {
      backgroundColor:"#ffffff",
    },
    container_Hordecall: {
      backgroundColor:"#ff0000",
    },
    text_White:{
      color: "#ffffff",
    },
    text_Blue:{
      color: "#4772E1",
    },
    text_Default:{
      color: "#000000",
    }
})
export default CustomIconButton