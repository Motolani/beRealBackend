import { View, Text, StyleSheet } from 'react-native'
import {React, useState, useContext, useEffect,} from 'react'
import { SelectList } from 'react-native-dropdown-select-list';

const DropDownInput = ({ theLabel, dropdownElement, inputLabel}) => {
[selected, setSelected] = useState('');



  return (
    <View style={styles.dropdown}>
        <Text style={styles.Label}>{theLabel}</Text>
        <SelectList
            boxStyles= {{ backgroundColor: '#f8fcff' }}
            dropdownStyles= {{ backgroundColor: '#f8fcff' }}
            style={styles.selectList}
            labeltext={inputLabel}
            label={'lists'}
            data={dropdownElement}
            save={'key'}
            textlabel={inputLabel}
            setSelected={(val) => setSelected(val)} 
        />
    </View>
  )
}

export default DropDownInput

const styles = StyleSheet.create({
    dropdown:{
        paddingTop: 5,
        width: 325,
    },
    Label:{
        color: '#4772E1',
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom:6,
        alignItems: 'flex-start',
    },
    selectList:{
        backgroundColor: '#FFFFFF',
    }
})