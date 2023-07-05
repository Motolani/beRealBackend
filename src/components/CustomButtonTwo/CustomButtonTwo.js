import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButtonTwo = ({ onPress, text, type, textColor, disabled}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${textColor}`]]}>{ text }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        // width: '100%',
        padding: 15,
        marginVertical: 20,
        borderRadius: 5,
        borderColor: '#4772E1',
        // borderColor: '#4772E1',
        borderWidth: 1,
        borderRadius: 24,
        width:298,
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
    container_Pinspay: {
      backgroundColor:"#5cdb93",
    },
    container_PinspayTwo: {
      backgroundColor:"#0c456d",
    },
    container_Disabled:{
      color: "#5cdb93"
    },
    text_White:{
      color: "#ffffff",
    },
    text_Blue:{
      color: "#0c456d",
    },
    text_Green:{
      color: "#5cdb93",
    },
    text_Disabled:{
      color:"#0c456d"
    }
})
export default CustomButtonTwo