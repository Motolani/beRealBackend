import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React,{ useState, useContext, useEffect, useRef} from 'react'
import { Stack, Switch, Button, IconButton, Divider} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack } from "@react-native-material/core";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GroupContactBox from '../../../components/GroupContactBox/GroupContactBox';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

const ContactGroups = ({ navigation }) => {
  const { userToken, userInfo, userId, BaseUrl } = useContext(AuthContext);
  const [userContactGroups, setUserContactGroups] = useState([]);

  
  const getGroups = async () => {
    console.log('userInfo')
    console.log(userInfo)
    console.log(userId)
    const thisUserId = userId;
    
    try {
        console.log('here');
        const url = BaseUrl+'/getGroups?userId='+thisUserId
        console.log(url);
        const {data} = await axios.get(url, { headers: { 
          'Authorization': 'Bearer '+userToken
        }})
        console.log(data);
        console.log('here');
      
    
        if(data.status == 200){
          console.log (data)
          setUserContactGroups(data.data)
        }else if(data.status == 500){
            // setErrorMessage(data.required_fields);
            console.log(data.required_fields)
        }else if(data.status == 300){
          console.log(data.message)
          // setErrorMessage(data.message);
      }

    } catch (error) {
        console.log('get Group', error)
    }
    // setIsLoading(false)
  }

  const deletePopup = (name, id) =>{ 
    Alert.alert('Delete Group', `You are about to Delete '${name}' Group`,[
      {text: 'OK', onPress: () => deleteGroup(id)},
      {text: 'cancel', onPress: () => console.log('canceled')},
  ]);
  }
  const deleteGroup = async (id) =>{

    try {
      
      const header = { 
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization': 'Bearer '+userToken,
      }
      console.log('here');
      var datata = new FormData()
      datata.append('id', id);
      console.log(datata);
      console.log(header);
      const url = BaseUrl+'/deleteGroup'
      console.log(url);
      const {data} = await axios.post(url, datata, { headers: header})
      // console.log(data);
      // console.log('here');
    
  
      // if(data.status == 200){
      //   console.log (data)
      //   Alert.alert(` ${data.data}`, [
      //     {text: 'OK', onPress: () => console.log('okay pressed')}
      //   ]);
      // }

    } catch (error) {
        console.log('delete Group', error)
    }
  }

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getGroups();
    });
    return focusHandler;
  },[navigation]);

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
        {userContactGroups.map((group) => (
          <GroupContactBox 
            title = {group.name}
            onPressEdit = {() => navigation.navigate('Contact Details', {
              contactGroupId: group.id
            })}
            onPressDelete = {() => deletePopup(group.name, group.id)}
          />
        ))}
        
        {/* <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox />
        <GroupContactBox /> */}
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
    color: '#ffffff',
    marginLeft: 5,
  },
  iconRefresh:{
    color: '#4772E1',
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

