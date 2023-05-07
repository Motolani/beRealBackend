import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, Switch, Button, IconButton, Divider} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack } from "@react-native-material/core";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GroupContactBox from '../../../components/GroupContactBox/GroupContactBox';

const ContactGroups = ( {navigation} ) => {
  return (
    <ScrollView style={styles.back}>
      <Stack fill center spacing={4} style={styles.createButtonCase}>
          <TouchableOpacity onPress= {() => navigation.navigate("Create Group")}>
            <View style={styles.TheContainer} >
              <IconButton icon={props => <Icon name="people-sharp" size={25} style={styles.iconAdd}/>} />
              <Text style={styles.newGroupText} > New Group</Text>
          </View>
          </TouchableOpacity>
        </Stack>
        <View>
          <Text style={styles.groupTitleText}>Groups</Text>
        </View>
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
    </ScrollView>
  )
}

export default ContactGroups
const styles = StyleSheet.create({
    back:{
      backgroundColor: '#e2f0fd',
    },
    createButton:{
      backgroundColor: '#4772E1',
      width: 150,
      marginTop: 20,
      radius: 15,
  },
  createButtonCase:{
      marginTop: 10,
      marginBottom: 20
  },
  iconAdd:{
    color: '#eef9ff',
    marginLeft: 5,
  },
  TheContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#eef9ff',
    borderRadius: 5,
    backgroundColor: '#4772E1',
    borderWidth: 1,
    borderRadius: 24,
    width:155,
    marginTop: 10
  },
  options:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  newGroupText:{
    fontSize: 15,
    marginTop: 14,
    color: '#eef9ff',
    fontWeight:'600'
  },
  groupTitleText:{
    color: '#4772E1',
    fontWeight:'bold',
    fontSize: 16,
    marginLeft: 28
  },

})

