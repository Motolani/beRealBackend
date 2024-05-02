import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
// import { Surface, Stack, Button} from "@react-native-material/core";
import {React, useState, useContext, useEffect,} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';

// import { Divider } from "@react-native-material/core";
import { IconButton, Switch, MD3Colors, Divider, PaperProvider, TextInput, Button} from 'react-native-paper';

const Settings = () => {
  // const [balance, setBalance] = useState(345);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // const toggleSwitch = () => {

  //   if(biometricLogin == false){

  //       const storeData = async () => {
  //           try {
  //               await AsyncStorage.setItem("TouchLoginEnt", JSON.stringify(true)).then(
  //                   () => AsyncStorage.getItem("TouchLoginEnt")
  //                       .then((result)=>console.log(result))
  //               )
  //           } catch (error) {
  //               // Error saving data
  //               console.log(error)
  //           }
  //       };
  //       storeData()
  //       setBiometricLogin(true)

  //   }else{

  //       const unstoreData = async () => {
  //           try {
  //               await AsyncStorage.setItem("TouchLoginEnt", JSON.stringify(false)).then(
  //                   () => AsyncStorage.getItem("TouchLoginEnt")
  //                       .then((result)=>console.log(result))
  //               )
  //           } catch (error) {
  //               // Error saving data
  //               console.log(error)
  //           }
  //       };
  //       unstoreData()
  //       setBiometricLogin(false)

  //   }
  // }

  
  return (
    <ScrollView style={styles.back}>
        <PaperProvider>
        <View style={styles.container}>
                <ScrollView> 
                    <TouchableOpacity onPress={() => navigation.navigate('Change Password')} style={styles.changePin}>

                        <View style={styles.contain}>
                                <View style={styles.theBorder}>
                                    <IconTwo name="key-chain"  size={32} color="#10486c" style={styles.withPin}/>
                                </View>
                                <Text style={styles.itemText}>Change Password</Text>
                                <Icon name="chevron-forward"  size={20} color="#000000" style={styles.arrowIcon}/>
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={onToggleSwitch} style={styles.changePin}>
                        <View style={styles.containTwo}>
                            <View style={styles.theBorder}>
                                <IconTwo name="fingerprint"  size={32} color="#10486c" style={styles.withPin}/>
                            </View>
                            <Text style={styles.itemText}>Toggle Finger Pin</Text>
                            <Switch  color={'#209eda'} style={styles.arrowIcon} onValueChange={toggleSwitch} value={biometricLogin}/>
                        </View>
                    </TouchableOpacity> */}

                </ScrollView>
                
            </View>
        </PaperProvider>
    </ScrollView>
  )
}

export default Settings
const styles = StyleSheet.create({
  back:{
    flex: 1, 
    backgroundColor: '#e2f0fd',
  },
  heading: {
    color: "#17375e",
    fontSize: 15,
    fontWeight: "bold",
},
printerColor:{
    color: '#000000'
},
inputWrapper: {
    paddingHorizontal: 15,
    marginTop: 10,
},
buttonWrapper: {
    paddingHorizontal: "10%",
    marginTop: 25,
},
theBorder:{
    backgroundColor: '#f3f4fb',
    borderRadius: 45,
    marginTop: 5,
    borderColor: '#10486c',
    borderWidth: 1,
    width: '11%',
    // verticalAlign: 'center',
    // paddingVertical: 5,
    justifyContent: 'center',
    // marginLeft: 50
  },
  changePin:{
    marginTop: 20
  },
  arrowIcon:{
    magrinTop: 12,
    marginLeft: 'auto',
  },
  itemText:{
    fontWeight: 'bold',
    marginTop:13,
    color: 'rgb(71, 85, 105)',
    fontSize: 17,
    marginLeft: 15
},
paymentPlan:{
    paddingTop: 15,
    paddingHorizontal: 25,
},
withPin: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    marginLeft:" 10%"
},
heading: {
    color: "#17375e",
    fontSize: 15,
    fontWeight: "bold",
},
signInbutton: {
    marginTop: 30,
    backgroundColor: 'rgb(96, 165, 250)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
},
signIn: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    color: 'white',
    alignItems: 'center',
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},
action: {
    flexDirection: 'row',
    marginTop: 5,
    // borderBottomColor: 'green',
    paddingBottom: 5,
},
textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    alignItems: 'center',
    marginTop: 8,
    marginVertical: 5,
    width: 350,
    borderWidth: 1,
    borderColor: 'rgb(209, 213, 219)',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 15 ,
    fontSize:16
},
bottomContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
},
contain:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    width:'91.5%',
    left:15,
    display: 'flex',
    alignItems: 'center',
},

containTwo:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    width:'91.5%',
    left:15,
    display: 'flex',
    alignItems: 'center',
    marginTop: 15
},
buttonWrapper: {
    paddingHorizontal: "10%",
    marginTop: 25,
},
inputWrapper: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
bluetoothBox: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dce7f4",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: "3%",
    display: Platform.OS === 'ios' ? "none" : "flex",
},
})