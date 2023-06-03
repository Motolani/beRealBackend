import { View, Text, StyleSheet, ScrollView, Platform, Alert, TouchableOpacity, FlatList, PermissionsAndroid } from 'react-native'
import React,{ useState, useContext, useEffect, useRef} from 'react'
import {
    Backdrop,
    BackdropSubheader,
    AppBar,
    IconButton,
} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import InputWithText from '../../../../components/InputWithText/InputWithText';
import Contacts from 'react-native-contacts';
import { color } from '@rneui/base';
import CustomIconButton from '../../../../components/CustomIconButton/CustomIconButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';

const CreateGroup = (props,{navigation} ) => {

    const [revealed, setRevealed] = useState(true);
    const [groupName, setGroupName] = useState(false);
    const [userContacts, setUserContacts] = useState([]);
    const [deselectedContacts, setDeselectedContacts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const { userToken, userInfo } = useContext(AuthContext);

    // const multiSelect = useRef(null);
    const { item, onPress } = props;
    
    const accessContacts = () => {
        Contacts.getAll()
            .then((data) => {
                // data.sort(
                //     (a, b) =>
                //     a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                // );
                setUserContacts(data);
                setDeselectedContacts(data)
                setSelectedContacts([])

                console.log(data)
            })
            .catch((e) => {
                console.log(e)
                Alert.alert('Permission to access contacts was denied');
                console.warn('Permission to access contacts was denied');
            });
    };

    // onSelectedItemsChange = userContacts => {
    //     setUserContacts(userContacts);
    //   };

    

    // const accessContacts = () => {
    //     Contacts.getAll()
    //         .then((contacts) => {
                
    //             contacts.forEach(o => setUserContacts(o))
    //         })
    //         .catch((e) => {
    //             console.log(e)
    //       })
    // }

    const addRemoveContact = (id) => {
        let contactGroupItems = deselectedContacts;
        let generals = deselectedContacts;
        let theSelects = selectedContacts;
        console.log(id)

        

        let found = false;
        let filtered
        let theSelectedItem
        let theSelected = selectedContacts
        let theSelectedObject

        for(var i = 0; i < contactGroupItems.length; i++) {
            if (contactGroupItems[i].recordID == id) {
                filtered = contactGroupItems.filter(contactGroupItem => contactGroupItem.recordID != id)

                console.log('Deselected')
                console.log(filtered)   
                setDeselectedContacts(filtered)    

                theSelectedItem = contactGroupItems.filter(contactGroupItem => contactGroupItem.recordID == id)

                console.log('theSelectedItem')
                console.log(theSelectedItem)

                theSelectedObject = theSelectedItem.pop()

                console.log('theSelectedObject')
                console.log(theSelectedObject)

                theSelected.push(theSelectedObject)
                setSelectedContacts(theSelected)

                console.log('theSelected')
                console.log(theSelected)


                console.log('selectedContacts')
                console.log(selectedContacts)

                console.log('Deselected contacts')
                console.log(deselectedContacts)
                // found = true;
                break;
            }
        }

    }

    const submit =  async() => {
        console.log(groupName);
        console.log(selectedContacts);

            const header = { 
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': 'Bearer '+userToken,
            }
            // console.log(userToken);
            userId = userInfo.user.id
            const groupInfo = {groupName, selectedContacts, userId}
            console.log(userId);

            setIsLoading(true)
        
            try {
                const {data} = await axios.post('http://127.0.0.1:8000/api/createGroup', groupInfo, { headers: header})
                console.log(data);
            
                if(data.status == 200){
                    // setIsLoading(true)
                    Alert.alert(
                        "Created Successfully ",
                        [
                            { text: "OK", onPress:() => {navigation.navigate("ContactGroups")} }
                        ]
                    );
                    setErrorMessage(null);
                    accessContacts();
                    setGroupName();
                    // setIsLoading(false)
                }else if(data.status == 300){
                    // setIsLoading(true)
                    Alert.alert(
                        "Failed to create group",
                        "Please try again later",
                        [
                            { text: "OK", onPress:() => {navigation.navigate("ContactGroups")} }
                        ]
                    );
                    // setIsLoading(false)
                }else if(data.status == 500){
                    // setIsLoading(true)
                    setErrorMessage(data.required_fields);
                    Alert.alert(
                        errorMessage,
                        [
                            { text: "OK" }
                        ]
                    );
                    // setIsLoading(false)
                }
            } catch (error) {
                console.log('login error', error)
            }
            setIsLoading(false)
        }    

    const removeContact = (id) => {
        let groupElements = selectedContacts;
        let groupElementsDitto = selectedContacts;
        let deselects = deselectedContacts;
        console.log(id)

        

        // let found = false;
        let filtered
        let deselectedItem
        let deselectedObject

        for(var i = 0; i < groupElements.length; i++) {
            if (groupElements[i].recordID == id) {
                filtered = groupElements.filter(groupElement => groupElement.recordID != id)
                console.log('remaining selected')
                console.log(filtered)
                setSelectedContacts(filtered);

                deselectedItem = groupElementsDitto.filter(groupElementDitto => groupElementDitto.recordID == id)
                console.log('deselected')
                console.log(deselectedItem)

                deselectedObject = deselectedItem.pop()
                deselects.push(deselectedObject)

                setDeselectedContacts(deselects)
                // found = true;
                break;
            }
        }

    }



    useEffect(() => {
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
    }, []);


    // useEffect(() => {
    //     accessContacts()
    // }, [])
    return (

                <View style={styles.back}>
                    <View style={styles.input}>
                        <InputWithText
                            placeholder="Enter Group Name"
                            value={groupName}
                            setValue={setGroupName}
                            label="Group Name"
                        />
                        <CustomButton
                            text="Create Group"
                            onPress={submit}
                            type="BASE"
                            textColor="White"

                            />
                        
                    </View>
                    <Text style={styles.selectContacts}>Select Contacts</Text>

                    <ScrollView horizontal={true} style={styles.selectedContacts}>
                        <View style={styles.selectContactContainer}>
                        <FlatList 
                                horizontal={true}
                                data={selectedContacts}
                                renderItem={({item}) => (
                                    <TouchableOpacity style={styles.anItemHorizontal} onPress={() => removeContact(item.recordID)}>
                                        <Text key={item.recordID} style={styles.contactList} >{item.givenName } {item.familyName}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.recordID}
                            />
                        </View>

                    </ScrollView>
                    <ScrollView >

                            <FlatList 
                                data={deselectedContacts}
                                renderItem={({item}) => (
                                    <TouchableOpacity style={styles.anItem} onPress={() => addRemoveContact(item.recordID)}>
                                        <Text key={item.recordID} style={styles.contactList} >{item.givenName } {item.familyName}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.recordID}
                                style={styles.lists}
                            />
                    </ScrollView>
                </View>
    )
}

export default CreateGroup
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: "center",
    },
    back:{
        // height: hp('100%'),
        // flex:1,
        backgroundColor: '#e2f0fd',
    },
    lists:{
        backgroundColor: '#e2f0fd',
    },
    theColor:{
        backgroundColor: '#4772E1'
        // backgroundColor: '#26324a'
    },
    backlayerInput:{
        height: 120,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    backlayerform:{
        flex: 1,
        alignItems: "center",
    },
    anItem:{
        backgroundColor: "#4772E1" ,
        marginBottom: 2,
        alignItems: 'center',
        marginLeft:5,
        marginRight:5,
        borderRadius:30,
    },
    contactList:{
        fontSize: 18,
        color: '#ffffff'
    },
    selectedContacts:{
        paddingVertical: 20
    },
    selectContactContainer:{
        borderColor: '#4772E1',
        borderWidth: 3,
        borderRadius: 15,
        margin: 3,
        backgroundColor: '#4772E1'
    },
    theText:{
        margin: 4,
        color: '#ffffff'
    },
    anItemHorizontal:{
        backgroundColor: "#4772E1" ,
        marginBottom: 2,
        alignItems: 'center',
        marginLeft:5,
        marginRight:5,
        borderRadius:30,
    },
    iconButtonStyle:{
        marginRight: 5
        
    },
    input:{
        alignItems: 'center',
        marginTop: 25,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
    },
    selectContacts:{
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
        fontSize: 17
    }
})