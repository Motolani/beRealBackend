import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, type, textColor }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${textColor}`]]}>{ text }</Text>
    </Pressable>
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
    container_Hordecall: {
      backgroundColor:"#ff0000",
    },
    text_White:{
      color: "#ffffff",
    },
    text_Blue:{
      color: "#4772E1",
    }
})
export default CustomButton