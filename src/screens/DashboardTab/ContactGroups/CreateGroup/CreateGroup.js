import { View, Text, StyleSheet, ScrollView, Platform, Alert, TouchableOpacity, FlatList, PermissionsAndroid } from 'react-native'
import React,{ useState, useContext, useEffect} from 'react'
import {
    Backdrop,
    BackdropSubheader,
    AppBar,
    IconButton,
} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import InputWithText from '../../../../components/InputWithText/InputWithText';
import Contacts from 'react-native-contacts';

const CreateGroup = (props) => {

    const [revealed, setRevealed] = useState(false);
    const [groupName, setGroupName] = useState(false);
    let [contacts, setContacts] = useState([]);

    const shouldComponentUpdate = () => {
        return false;
    };
    const { item, onPress } = props;
    
    // const accessContacts = () => {
    //     Contacts.getAll((err, data) => {
    //     data.sort(
    //         (a, b) =>
    //         a.givenName.toLowerCase() > b.givenName.toLowerCase(),
    //     );
    //     if (err === 'denied') {
    //         Alert.alert('Permission to access contacts was denied');
    //         console.warn('Permission to access contacts was denied');
    //     } else {
    //         setContacts(data);
    //         console.log(data)
    //     }
    //     });
    // };

    const accessContacts = () => {
        Contacts.getAll((err, contacts) => {
            if (err) {
                console.log(err)
            throw err;
            }
            // contacts returned
            console.log(contacts)

        })
    }

    // useEffect(() => {
    //     if (Platform.OS === 'android') {
    //         PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    //                 title: 'Access Contacts',
    //                 message: 'App Want to View your Phone Contacts.',
    //             }).then(() => {
    //                 accessContacts();
    //             }
    //         );
    //     } else {
    //         accessContacts();
    //     }
    // }, []);

    useEffect(() => {
        // accessContacts();
    }, [])
    return (
            <Backdrop
            style={styles.theColor}
            revealed={revealed}
            header={
                <AppBar
                title="Set Group Name"
                transparent
                leading={props => (
                    <IconButton
                    icon={props => (
                        <Icon name={revealed ? "close" : "menu"} {...props} />
                    )}
                    onPress={() => setRevealed(prevState => !prevState)}
                    {...props}
                    />
                )}
                />
            }
            backLayer={<View style={styles.backlayerInput} >
                            <View style={styles.backlayerform}>
                                <InputWithText
                                placeholder="Group Name"
                                value={groupName} 
                                setValue={setGroupName}
                                // label={'Group Name'}  
                                />
                            </View>
                            
                        </View>}
                
            >
                
                <BackdropSubheader title="Select Contacts" />
                <ScrollView style={styles.back}>
                    <TouchableOpacity onPress={() => onPress(item)}>
                        <View style={styles.row}>
                            <View style={styles.avatarContainer}>
                    
                            </View>
                            <View style={styles.listTextContainer}>
                                <View style={{ justifyContent: 'center' }}>
                                {/* <Text style={{ fontSize: 18 }}> {`${item.givenName} ${item.familyName}`} </Text> */}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </Backdrop>
    )
}

export default CreateGroup
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: "center",
    },
    back:{
        backgroundColor: '#e2f0fd',
    },
    theColor:{
        backgroundColor: '#26324a'
    },
    backlayerInput:{
        height: 120,

    },
    backlayerform:{
        flex: 1,
        alignItems: "center",
    }
})