import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { Flex } from '@react-native-material/core'
const OurAi = () => {
  return (
    <ScrollView style= {styles.Container}>
      <Text>OurAi</Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  Container: {
      backgroundColor: '#eef9ff',
  },
})

export default OurAi