import { View, Text, StyleSheet, ScrollView, Platform, Alert, TouchableOpacity, FlatList, PermissionsAndroid } from 'react-native'
import React,{ useState, useContext, useEffect, useRef} from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import Contacts from 'react-native-contacts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeBorder from '../../../../components/HomeBorder/HomeBorder';

const ContactDetails = ( props ) => {
    const [groupId, setGroupId] = useState(props.route.params.contactGroupId);
    const [fullDetail, setFullDetail] = useState([]);
    const [contactIds, setContactIds] = useState([]);
    const [contactDetailsAll, setContactDetailsAll] = useState([]);
    const [contactDetailsPart, setContactDetailsPart] = useState([]);

    const { item, onPress } = props;
    
    const { userToken, userInfo, userId } = useContext(AuthContext);

    const getDetails = async() =>  {
        try{
            const url = 'http://127.0.0.1:8000/api/getGroupDetails'
            console.log(url);

            var datata = new FormData()
            datata.append('userId', userId);
            datata.append('groupId', groupId);
            console.log(datata);

            const {data} = await axios.post(url, datata, { headers: { 
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': 'Bearer '+userToken
            }})
            if(data.status == 200){
                setFullDetail(data.data)
                setContactIds(data.data.contact_ids)  
                console.log(data.data)
                const theData = data.data.contact_ids;
                console.log(theData)
                console.log('here')
                console.log('contactIds')
                console.log(contactIds)
                console.log('is array?')
                let newContactIds = contactIds.replace(/[\])}[{(]/g, '')
                console.log(contactIds);
                const contactIdArr = newContactIds.split(',');
                console.log(typeof contactIdArr);
                console.log(contactIdArr);

                const allData = []
                const partData = []
                const newData = contactIdArr.forEach(object => {

                    const newObj = JSON.parse(object)
                    const needed = []
                    Contacts.getContactById(newObj).then((data) => {
                        // console.log(data)
                        console.log('whats up')
                        console.log(data.phoneNumbers)
                        console.log(data.familyName)
                        console.log(data.givenName)
                        const name = `${data.familyName} ${data.givenName}`
                        const phones = data.phoneNumbers
                        const contactObj = {}
                        contactObj['name'] = name

                        const subArr = []
                        let objj = {}
                        phones.forEach(phone => {
                            console.log(phone)
                            // subArr.push()
                            // const label = phone.label
                            objj[phone.label.replace(/ /g,"_")] = phone.number
                        })

                        partData.push({contactObj, objj})
                        setContactDetailsPart(partData)
                        console.log(partData)
                        allData.push(data)
                        setContactDetailsAll(allData)
                    })
                })
                    // console.log('here')
                    // console.log(contactDetailsAll)
                
            }
        } catch (error) {
            console.log('getDetails', error)
        }
    }

    // const getContacts = () =>  {
    //     // console.log()
    //     if(contactIds.length != 0){

    //         console.log(conIds)
    //         contactIds.forEach((score) => {
    //             console.log(score);
    //         });
    //     }

    // }

    useEffect(() => {
        console.log('use Effectty');
        getDetails()
        console.log(groupId);
    }, [contactIds.length == 0])

    // useEffect(() => {
    //     console.log('use Effectty 2');
    //     getContacts()
    // }, [contactIds.length != 0])
    return (

        <ScrollView style={styles.back}>
            <FlatList 
                style={styles.flat}
                horizontal={false}
                data={contactDetailsPart}
                renderItem={({item}) => (
                    <View style={styles.box}>
                    <View style={styles.nameAndIcon}>
                        <Icon name="person-circle" size={25} color="#4772E1" style={styles.nameIcon}/>
                        <Text style={styles.name}>{item.contactObj.name}</Text>
                    </View>
                    {item.objj.home && <View style={styles.nameAndIcon}>
                        <Icon name="call" size={20} color="#4772E1" style={styles.numberIcon}/>
                        <Text style={styles.numberName}>{item.objj.home} </Text>
                    </View>}
                    {item.objj.other && <View style={styles.nameAndIcon}>
                        <Icon name="call" size={20} color="#4772E1" style={styles.numberIcon}/>
                        <Text style={styles.numberName}>{item.objj.other} </Text>
                    </View>}
                    {item.objj.work && <View style={styles.nameAndIcon}>
                        <Icon name="call" size={20} color="#4772E1" style={styles.numberIcon}/>
                        <Text style={styles.numberName}>{item.objj.work} </Text>
                    </View>}
                    {item.objj.main && <View style={styles.nameAndIcon}>
                        <Icon name="call" size={20} color="#4772E1" style={styles.numberIcon}/>
                        <Text style={styles.numberName}>{item.objj.main} </Text>
                    </View>}
                    {item.objj.home_fax && <View style={styles.nameAndIcon}>
                        <Icon name="call" size={20} color="#4772E1" style={styles.numberIcon}/>
                        <Text style={styles.numberName}>{item.objj.home_fax} </Text>
                    </View>}
                </View>
                )}
                keyExtractor={(item) => item.recordID}
            />

            
        </ScrollView>
    )
}

export default ContactDetails
const styles = StyleSheet.create({

    back:{
        flex: 1,
        backgroundColor: '#e2f0fd',
        paddingBottom: hp('20%')
    },
    box:{
        width: hp('43%'),
        height: hp('18%'),
        backgroundColor: '#f8fcff',
        borderRadius: 15,
        marginTop: 18,
        borderWidth: 1,
        borderColor: '#4772E1',
        alignSelf: 'center',
    },
    nameAndIcon:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    nameIcon:{
        marginTop: hp(1.5),
        marginLeft: hp(2.5),
    },
    name:{
        marginTop: hp(1.8),
        marginLeft: hp(7.5),
        fontWeight: 'bold',
        fontSize: 17,
        fontStyle: 'italic'
        // color: '#0000E7'
    },
    flat:{
        position:'relative',
        paddingBottom: hp('5%')
    },
    numberName:{
        marginTop: hp(1.8),
        marginLeft: hp(7.5),
        fontWeight: 'bold',
        fontSize: 15,
        fontStyle: 'italic'
    },
    numberIcon:{
        marginTop: hp(1.5),
        marginLeft: hp(2.5),
    }
})