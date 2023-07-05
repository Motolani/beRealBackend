import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert} from 'react-native'
import {React, useState, useContext, useEffect,} from 'react'
import DropDownInput from '../../../components/DropDownInput/DropDownInput'
// import DatePicker from 'react-native-date-picker'
import DatePicker from 'react-native-datepicker';
// import { Button } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons';
import { Stack, Switch, Button } from "@react-native-material/core";
import { HStack } from "@react-native-material/core";
import { CheckBox } from '@rneui/base';
import Contacts from 'react-native-contacts';
import DropDownTextArea from '../../../components/DropDownTextArea/DropDownTextArea';
import InputWithText from '../../../components/InputWithText/InputWithText';
import InputWithTextarea from '../../../components/InputWithTextarea/InputWithTextarea';
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const EditReminder = ({props}) => {
    const [start_at, setStartDate] = useState(new Date())
    // const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0)
    const [checked, setChecked] = useState(true);
    const [selectedIndex, setIndex] = useState(0);
    const [message, setMessage] = useState('');
    const [messageCustom, setCustomMessage] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [sendMessage, setSendMessage] = useState(0);
    const [contact_id, setContactId] = useState(0);
    const [from, setFrom] = useState(0);
    const [messageType, setMessageType] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userContacts, setUserContacts] = useState([]);
    const [contact, setContact] = useState('');
    const [contactGroup, setContactGroup] = useState([]);
    const [userContactGroups, setUserContactGroups] = useState([]);
    const [messageTypeOptions, setMessageTypeOptions] = useState([]);
    const [messageOptions, setMessageOptions] = useState([]);
    const [reminderId, setReminderId] = useState(props.route.params.id);

    
    const { userToken, userInfo, userId } = useContext(AuthContext);
    const navigation = useNavigation();

    const accessContacts = () => {
        Contacts.getAll()
            .then((data) => {
                // data.sort(
                //     (a, b) =>
                //     a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                // );
                const newData = data.map(object => {
                    return Object.assign(object, {key: object.recordID, value: `${object.givenName} ${object.familyName}`});
                })
                setUserContacts(newData);
                
                console.log(data)   
                console.log('new data')
                console.log(newData)
            })
            .catch((e) => {
                console.log(e)
                Alert.alert('Permission to access contacts was denied');
                console.warn('Permission to access contacts was denied');
            });
    };

    const getGroups = async() => {
        const thisUserId = userId;
        
        try {
            console.log('here');
            console.log(thisUserId);
            const url = 'http://127.0.0.1:8000/api/getGroups?userId='+thisUserId
            console.log(url);
            const {data} = await axios.get(url, { headers: { 
              'Authorization': 'Bearer '+userToken
            }})
            console.log(data);
            console.log('here');
            console.log(data.status);
          
        
            if(data.status == 200){
                const theData = data.data;
            const newData = theData.map(object => {
                return Object.assign(object, {key: object.id, value: object.name});
            })

              console.log (data)
              console.log ('newGroupData')
              console.log (newData)
              setUserContactGroups(newData)
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

    const scheduleIt = async () => {
        console.log(userToken)
        const header = { 
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Authorization': 'Bearer '+userToken,
        }
        console.log(header);
        // const setBody = {title, duration, start_at, contact_id}
        const setBody = {title, duration, start_at, contact_id, message, sendMessage, from, messageType}
        // console.log(setBody);
        setIsLoading(true) 
        var datata = new FormData()
        datata.append('title', title);
        datata.append('duration', duration);
        datata.append('start_at', start_at);
        if(contact != ''){
            datata.append('contact_id', contact);
        }
        if(contactGroup != ''){
            datata.append('contactGroupId', contactGroup);
        }
        datata.append('messageCustom', messageCustom);
        datata.append('messageId', message);
        datata.append('sendMessage', sendMessage);
        if(from == 1){
            datata.append('fromContact', contact);
        }else{
            datata.append('fromGroup', contactGroup);
        }
        datata.append('messageType', messageType);
        datata.append('autoSend', sendMessage);
        console.log(datata);

        try {
            console.log('here');
            const url = 'http://127.0.0.1:8000/api/schedule'
            const {data} = await axios.post(url, datata, { headers: header})
            console.log(data);
        
            if(data.status == 200){
                console.log('200 n here');
                // navigation.navigate('Dashboard')


                Alert.alert('Success!', 'Notification Scheduled.', [
                    {text: 'OK', onPress: () => navigation.navigate('Dashboard')},
                ]);

            }else if(data.status == 500){
                console.log(data.required_fields)
                setErrorMessage(data.required_fields);
                Alert.alert('Failed!',` ${data.required_fields}`, [
                    {text: 'OK'},
                ]);
            }else{
                console.log(data.message)
                setErrorMessage(data.message);
                Alert.alert('Failed!', `${data.message}`, [
                    {text: 'OK'},
                ]);
            }

        } catch (error) {
            console.log('set Schedule', error)
        }
        setIsLoading(false)
    }

    const MsgType = async() => {
        console.log(userToken)
        try{
            const url = 'http://127.0.0.1:8000/api/getMessageTypes'
            console.log(url);
            const {data} = await axios.get(url, { headers: { 
              'Authorization': 'Bearer '+userToken
            }})
            if(data.status == 200){
                const theData = data.data;
                const newData = theData.map(object => {
                return Object.assign(object, {key: object.id, value: object.name});
            })

                console.log (data)
                console.log ('newMessageTypeData')
                console.log (newData)
                setMessageTypeOptions(newData)
            }
        } catch (error) {
            console.log('MsgType', error)
        }
    }

    const Msg = async() => {
        
        const thisUserId = userId;
        console.log(userToken)
        try{
            const url = 'http://127.0.0.1:8000/api/getMessages?messageType='+messageType
            console.log(url);
            const {data} = await axios.get(url, { headers: { 
              'Authorization': 'Bearer '+userToken
            }})
            if(data.status == 200){
                const theData = data.data;
                const newData = theData.map(object => {
                return Object.assign(object, {key: object.id, value: object.content});
            })

              console.log (data)
              console.log ('newMessageData')
              console.log (newData)
              setMessageOptions(newData)
            }
        } catch (error) {
            console.log('Msg', error)
        }
    }

    const forCustomMsg = () => {
        if(checked == true){
            setMessageType(0)
            setMessage('')
        }
    }

    const dropdownElement =[
        { key:'Once', value: 'Once' },
        { key:'Weekly', value: 'Weekly' },
        { key:'Monthly', value: 'Monthly' },
        { key:'Yearly', value: 'Yearly' },
    ];  
    
    const SelectFrom =[
        { key: 1, value: 'Contact' },
        { key: 2, value: 'Group' },
    ]; 

    useEffect(() => {
        console.log('date: '+start_at);
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                    title: 'Access Contacts',
                    message: 'App Want to View your Phone Contacts.',
                }).then(() => {
                    accessContacts();
                }
            );
        } else {
            accessContacts();
        }
    }, [start_at])

    useEffect(() => {
        console.log('use Effect 2');
        getGroups();
        MsgType();
    }, [])

    useEffect(() => {
        console.log('use Effect 3');
        Msg();
    }, [messageType])

    useEffect(() => {
        console.log('use Effect 4');
        forCustomMsg();
    }, [checked])
    
  return (
    <ScrollView style= {styles.Container}>
        <View style= {styles.ContainerTwo}>
            <View style= {styles.ContainerTwo}>
                <InputWithText
                    placeholder="Title"
                    value={title} 
                    setValue={setTitle}
                    label={'Set Title'}
                    
                />
                <View>

            </View>

                
            </View>
            <View style={styles.dropdown}>
                <Text style={styles.Label}>Duration</Text>
                <SelectList
                    boxStyles= {{ backgroundColor: '#f8fcff', borderColor:'#4772E1' }}
                    dropdownStyles= {{ backgroundColor: '#f8fcff' }}
                    style={styles.selectList}
                    labeltext={'Duration'}
                    label={'lists'}
                    data={dropdownElement}
                    save={'key'}
                    textlabel={'Duration'}
                    setSelected={(val) => setDuration(val)} 
                    
                />
            </View>
            <View>
                <Text style={styles.StartDate}>Start Date </Text>
                <DatePicker
                    style={styles.datePickerStyle}
                    date={start_at} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2016"
                    maxDate="01-01-2100"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                        //display: 'none',
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                        
                        },
                        dateInput: {
                            marginLeft: 36,
                            borderRadius: 10,
                            borderColor:'#4772E1',
                            backgroundColor: "#FFFFFF",
                        },
                    }}
                    onDateChange={(date) => {
                        setStartDate(date);
                    }}
                />
            </View>
            <View style={styles.SelectFrom}>
                <View style={styles.dropdown}>
                    <Text style={styles.Label}>Set From</Text>
                    <SelectList
                        boxStyles= {{ backgroundColor: '#f8fcff', borderColor:'#4772E1' }}
                        dropdownStyles= {{ backgroundColor: '#f8fcff' }}
                        style={styles.selectList}
                        labeltext={'Set From'}
                        label={'lists'}
                        data={SelectFrom}
                        save={'key'}
                        textlabel={'Set From'}
                        setSelected={(val) => setFrom(val)} 
                    />
                </View>

                    { from == 1 ? (<View style={styles.SelectFrom}>
                        <View style={styles.dropdown}>
                            <Text style={styles.Label}>Select From Contacts</Text>
                            <SelectList
                                boxStyles= {{ backgroundColor: '#f8fcff', borderColor:'#4772E1' }}
                                dropdownStyles= {{ backgroundColor: '#f8fcff' }}
                                style={styles.selectList}
                                labeltext={'Set Contact'}
                                label={'contact'}
                                data={userContacts}
                                save={'key'}
                                textlabel={'Set Contact'}
                                setSelected={(val) => setContact(val)} 
                            />
                        </View>
                    
                    </View>)
                    : from == 2 ?
                    (<View style={styles.SelectFrom}>
                        <View style={styles.dropdown}>
                            <Text style={styles.Label}>Select From Group</Text>
                            <SelectList
                                boxStyles= {{ backgroundColor: '#f8fcff', borderColor:'#4772E1' }}
                                dropdownStyles= {{ backgroundColor: '#f8fcff' }}
                                style={styles.selectList}
                                labeltext={'Set Group'}
                                label={'contactGroup'}
                                data={userContactGroups}
                                save={'key'}
                                textlabel={'Set Contact'}
                                setSelected={(val) => setContactGroup(val)} 
                            />
                        </View>
                    
                    </View>) 
                    : null 
                    }
            </View>
            
        </View>
            
        <HStack m={4} spacing={6} style={styles.attacheView}>
            <Text style={styles.StartDate}>Attach message </Text>
            <Switch style={styles.messageSwitch} value={checked} onValueChange={() => setChecked(!checked)} />
        </HStack>
        
        { checked == true ? 
        (<View>
            <HStack m={4} spacing={6} style={styles.checkboxCase}>
            <Text style={styles.messageType}>Default message </Text>
                <CheckBox
                    checked={selectedIndex === 0}
                    onPress={() => setIndex(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    style={styles.checkboxOne}
                    containerStyle={{
                        backgroundColor: '#eef9ff',
                        marginLeft: -10
                    }}
                />
                <Text style={styles.messageTypeTwo}>Custom message </Text>
                <CheckBox
                    checked={selectedIndex === 1}
                    onPress={() => setIndex(1)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={{
                        backgroundColor: '#eef9ff',
                        marginLeft: -10
                    }}
                    style={styles.checkboxTwo}
                />
            </HStack>
            { selectedIndex == 0 ?
            (<View style= {styles.ContainerTwo}>
                <View style={styles.dropdown}>
                    <Text style={styles.Label}>Message Type</Text>
                    <SelectList
                        boxStyles= {{ backgroundColor: '#f8fcff', borderColor:'#4772E1' }}
                        dropdownStyles= {{ backgroundColor: '#f8fcff' }}
                        style={styles.selectList}
                        labeltext={'Message Type'}
                        label={'lists'}
                        data={messageTypeOptions}
                        save={'key'}
                        textlabel={'Message Type'}
                        setSelected={(val) => setMessageType(val)} 
                    />
                </View>
                <View style= {styles.MessageTypeTextarea}>
                    <View style={styles.dropdown}>
                        <Text style={styles.Label}>Message</Text>
                        <SelectList
                            boxStyles= {{ backgroundColor: '#f8fcff', borderColor:'#4772E1' }}
                            dropdownStyles= {{ backgroundColor: '#f8fcff' }}
                            style={styles.selectList}
                            labeltext={'Message'}
                            label={'lists'}
                            data={messageOptions}
                            save={'key'}
                            textlabel={'Message'}
                            setSelected={(val) => setMessage(val)} 
                        />
                    </View>
                </View>

            </View>) : 
            (<View style= {styles.ContainerTwo}>
                <InputWithTextarea
                    placeholder="Message to be sent"
                    multiline={true}
                    numberOfLines={10}
                    value={message} 
                    setValue={setCustomMessage}
                    label={'Message'}
                    
                />

                
            </View>)
            }
            <HStack m={4} spacing={6} style={styles.messageCheckboxCase}>
            <Text style={styles.messageType}>Notify Only </Text>
                <CheckBox
                    checked={sendMessage === 0}
                    onPress={() => setSendMessage(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    style={styles.sendMessageCheckBox}
                    containerStyle={{
                        backgroundColor: '#eef9ff',
                        marginLeft: -10
                    }}
                />
                <Text style={styles.messageTypeTwo}>Send message </Text>
                <CheckBox
                    checked={sendMessage === 1}
                    onPress={() => setSendMessage(1)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={{
                        backgroundColor: '#eef9ff',
                        marginLeft: -10
                    }}
                    style={styles.checkboxTwo}
                />
            </HStack>
        </View>
        ) : null
        }
        <Stack fill center spacing={4} style={styles.setButtonCase}>
            <Button style={styles.setButton} title="Set" onPress={() => scheduleIt()}/>
        </Stack>
    </ScrollView>
  )
}

export default EditReminder

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#eef9ff',
    },
    ContainerTwo:{
        marginTop: 20,
        alignItems: "center",
    },
    customInput:{
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        marginVertical: 5,
        width: 276,
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 15,
        paddingLeft: 25,
    },
    Row:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    ScheduleIcon:{
        paddingTop: 10.5,
        paddingLeft: 8,
    },
    StartDate:{
        marginTop: 20,
        color: '#4772E1',
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom:-11,
    },
    SelectFrom:{
        marginTop: 9,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    datePickerStyle: {
        width: 325,
        marginTop: 20,
        
    },
    messageSwitch:{
        marginTop: 12,
        color: '#4772E1',
        fontWeight: 'bold',
        marginLeft: 130,
        marginBottom:-11,
    },
    attacheView:{
        marginTop: 12,
        marginLeft: 33
    },
    // checkboxOne:{
        
    // },
    // checkboxTwo:{
    //     marginLeft: -7
    // },
    checkboxCase:{
        marginTop: 20,
    },
    messageType:{
        marginTop: 20,
        color: '#4772E1',
        fontWeight: 'bold',
        marginLeft: 35,
        marginBottom:-11,
    },
    messageTypeTwo:{
        marginTop: 20,
        color: '#4772E1',
        fontWeight: 'bold',
        marginLeft: 5,
        marginBottom:-11,
    },
    messageCheckboxCase:{
        marginTop: 20,
        marginLeft:35
    },
    setButton:{
        backgroundColor: '#4772E1',
        width: 80,
        marginTop: 20
    },
    setButtonCase:{
        marginTop: 10,
        marginBottom: 20
    },
    MessageTypeTextarea:{
        marginTop: 25
    },
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
    },
    customInput:{
        backgroundColor: "#FFFFFF",
        marginTop: 8,
        marginVertical: 5,
        width: 330,
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 13,
        paddingVertical: 15,
        paddingLeft: 25,
        marginBottom: 25 ,
        
    },
    Label:{
        color: 'rgba(71, 114, 225, 1)',
        fontWeight: 'bold',
        marginLeft: 14,
        
    }
})
