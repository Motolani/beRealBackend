import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Surface, Stack, Button} from "@react-native-material/core";
import {React, useState, useContext, useEffect,} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from "@react-native-material/core";

const Settings = () => {
  // const [balance, setBalance] = useState(345);
  
  return (
    <ScrollView style={styles.back}>
        <View style={styles.TopHalf}>
          <View style={styles.avatarAndLogout}> 
            <View>
              <Icon name="person-circle-sharp" size={80} style={styles.avatarIcon}/>
              <Text style={styles.userNameText} >Hello Dan</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Icon name="ios-enter-outline" size={40} style={styles.logout}/>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>

      <Stack fill center spacing={4} style={styles.stackContainer}>
        <Surface
          elevation={6}
          category="medium"
          style={styles.surfaceOne}
        >
          <View style={styles.innerView}>
            <Icon name="wallet-outline" size={25} style={styles.iconOne}/>
            <View style={styles.balanceToggleContainer}>
              <Text style={styles.innerTextOne}>N365.00</Text>
              <TouchableOpacity>
                <Icon name="eye-sharp" size={20} style={styles.toggleIcon}/>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.secondInnerTextOne}>Account Balance</Text>
              <TouchableOpacity>
                <Icon name="refresh" size={20} style={styles.refresh}/>
              </TouchableOpacity>
            </View>
          </View>
        </Surface>
        <View  style={styles.otherTwoBoxes}>
          <Surface
          elevation={4}
          category="medium"
          style={styles.surfaceTwo}
        >
          <View style={styles.innerViewTwo}>
            <Icon name="logo-apple" size={30} style={styles.iconTwo}/>
            <Text style={styles.innerTextTwo}>0</Text>
            <Text style={styles.secondInnerTextTwo}>Loyalty Point</Text>
          </View>
        </Surface>
        <Surface
          elevation={6}
          category="medium"
          style={styles.surfaceThree}
        >
          <View style={styles.innerViewThree}>
            <Icon name="send-sharp" size={25} style={styles.iconThree}/>
            <Text style={styles.innerTextThree}>7</Text>
            <Text style={styles.secondInnerTextThree}>Transactions Count</Text>
          </View>
        </Surface>
        </View>
        
        <View>
          <View style={styles.actionButtonsBelow}>
            <Button title=" Bank" />
            <Button variant="outlined" title=" Pinspay" style={styles.buttonTwoDown}/>  
          </View>
        </View>
        
      </Stack>
    </ScrollView>
  )
}

export default Settings
const styles = StyleSheet.create({
  back:{
    backgroundColor: '#e2f0fd',
  },
  stackContainer:{
    marginTop: -50,
    marginBottom: 30
  },
  surfaceOne:{
    backgroundColor:'#c8fbce',
    width: 323, 
    height: 170,
    alignItems: "center",
  },
  surfaceTwo:{
    backgroundColor:'#d1f2fe',
    marginTop: 15,
    width: 170, 
    height: 140,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  surfaceThree:{
    backgroundColor:'#fff7cd',
    marginTop: 15,
    width: 170, 
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  iconOne:{
    color: '#067b55',
    // paddingTop: -45
    paddingLeft: 30
  },
  iconTwo:{
    color: '#0a54b8',
    paddingLeft: 30
  },
  iconThree:{
    color: '#b78103',
    paddingLeft: 55
  },
  innerView:{
    flexDirection: 'column',
    marginTop: 25,
  },
  innerTextOne:{
    color:'#005248',
    fontSize:20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  secondInnerTextOne:{
    color:'#005248',
    fontSize:11,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: -4
  },
  innerIcon:{
    color: '#067b55',
    paddingTop: 10,
    paddingLeft: 35
  },
  innerViewTwo:{
    flexDirection: 'column',
    marginTop: -20,
  },
  innerTextTwo:{
    color: '#03287a',
    paddingTop: 5,
    paddingLeft: 36,
    fontSize:30
  },
  secondInnerTextTwo:{
    color:'#0a54b8',
    fontSize:13,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10
  },
  innerViewThree:{
    flexDirection: 'column',
    marginTop: -4,
  },
  innerTextThree:{
    color: '#7b4f00',
    paddingTop: 5,
    paddingLeft: 60,
    fontSize:25
  },
  secondInnerTextThree:{
    color:'#c3a875',
    fontSize:13,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10
  },
  TopHalf:{
    height: "49%",
    width: "100%",
    backgroundColor: '#0098DB'
  },
  avatarIcon:{
    color:'#ffffff',
    marginLeft: 30,
    paddingTop: 20,
  },
  userNameText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingTop: 10,
    marginLeft: 30,
  },
  refresh:{
    color:'#005248',
    fontSize:18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 30
  },
  otherTwoBoxes:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatarAndLogout:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  logout:{
    color: '#fe685e',
    paddingTop: 40,
    paddingLeft: 190,
    marginBottom:20
  },
  actionButtonsBelow:{
    marginTop:30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  balanceToggleContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggleIcon:{
    color: '#067b55',
    paddingTop: 12,
    paddingLeft: 2
  },
  buttonTwoDown:{
    marginLeft: 40
  }
})