import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
// import styles from '../../../style';

const InputWithText = ({value, setValue, placeholder, secureTextEntry, keyboardType, maxLength, label, editable, selectTextOnFocus }) => {
  return (
    <View>
        <Text style={styles.Label}>{label}</Text>
        <TextInput 
          boxStyles= {{ backgroundColor: '#f8fcff' }}
          value={value}
          onChangeText= {setValue}
          placeholder={placeholder}
          style={styles.customInput}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          />
    </View>
  )
  
}
const styles = StyleSheet.create({ 
  customInput:{
    backgroundColor: "#FFFFFF",
    marginTop: 8,
    marginVertical: 5,
    width: 310,
    borderColor: '#777777',
    borderWidth: 1,
    borderRadius: 13,
    paddingVertical: 15,
    paddingLeft: 20,
    marginBottom: 25 ,
    
},
Label:{
    color: 'rgba(71, 114, 225, 1)',
    fontWeight: 'bold',
    marginLeft: 14,
    
}
});
export default InputWithText

