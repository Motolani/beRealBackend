import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import {React, useState, useContext, useEffect,} from 'react'
import { ScrollView } from 'react-native'
import { Flex } from '@react-native-material/core'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const OurAi = () => {
  const [usersAi, setUsersAi] = useState('');

  // const userAi = () => {

  // }
  return (
    <View style= {styles.Container}>
      <ScrollView style={styles.chatHistory}>
        <Text></Text>
      </ScrollView>
      <View style={styles.chatBox}>
        <TextInput 
            boxStyles= {{ backgroundColor: '#f8fcff' }}
            style={styles.AiInput}
            placeholder="   Hi, I can help with your Messages"
            value={usersAi} 
            onChangeText={setUsersAi}
            />
            <TouchableOpacity>
            {/* <TouchableOpacity style={styles.MoreOptionsIcon} onPressEdit = {onPressEdit}> */}
              <Icon name="paper-plane" size={40} color="#4772E1" style={styles.sendButton}/>
            </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  Container: {
      backgroundColor: '#eef9ff',
  },
  chatBox:{
    backgroundColor: "#e2f0fd",
    marginVertical: 5,
    width: hp('46.1%'),
    height: hp('9%'),
    borderColor: '#4772E1',
    borderTopWidth: 1,
    paddingVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  AiInput:{
    width: hp('32%'),
    height: hp('5%'),
    marginLeft: 25,
    backgroundColor: "#f8fcff",
    borderWidth: 1,
    borderColor: '#4772E1',
    borderRadius: 13,
  },
  chatHistory:{
    backgroundColor: '#eef9ff',
    minHeight: hp('70%'),
  },
  sendButton:{
    paddingLeft: 18
  }
})

export default OurAi