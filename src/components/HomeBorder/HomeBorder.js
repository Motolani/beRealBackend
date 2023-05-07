import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Menu,
  MenuProvider,
  MenuTrigger,
 } from "react-native-popup-menu";


const HomeBorder = ({ timeStamp, status, title }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.TopLayer}>
        <View style={styles.IconBorder}>
          <Icon name="alarm" size={22} color="#4772E1" />
        </View>
          <Text style={styles.TimeStamp}>{timeStamp}</Text>
          {/* <Text style={styles.TimeStamp}>12-12-2023 02:30 PM</Text> */}

          {status == 1 ? 
          <Text style={styles.Status}>Completed</Text> : 
          <Text style={styles.StatusTwo}>pending</Text> }
      </View>
      <View style={styles.BottomLayer}>
        <View style={styles.ContentTitleContainer}>
          <Text style={styles.ContentTitle}>{title}</Text>
        </View>
        <MenuProvider>
          <Menu>
            <MenuTrigger />
            <TouchableOpacity style={styles.MoreOptionsIcon}>
              <Icon name="ellipsis-vertical" size={22} color="#4772E1"/>
            </TouchableOpacity>
            </Menu>
          </MenuProvider>
      </View>
    </View>
  )
}

export default HomeBorder
const styles = StyleSheet.create({
    Container: {
      width: hp('43%'),
      height: hp('12%'),
      backgroundColor: '#f8fcff',
      borderRadius: 15,
      marginTop: 18
    },
    TopLayer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    IconBorder:{
      width: 25,
      height: 25,
      backgroundColor: '#EBF0FF',
      borderRadius: 6,
      marginLeft: 10,
      alignItems: "center",
    },
    TimeStamp:{
      color: '#4772E1',
      fontSize: 12,
      marginTop: 6,
      marginLeft: 10,
    },
    TopText:{
      marginTop: 6,
    },
    Status:{
      color: '#10AF58',
      fontSize: 12,
      marginTop: 6,
      marginLeft: 70,
    },
    StatusTwo:{
      color: 'red',
      fontSize: 12,
      marginTop: 6,
      marginLeft: 70,
    },
    BottomLayer:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 3,
    },
    ContentTitleContainer:{
      marginLeft: 30,
      marginTop: 10,
      width: 260,
    },
    ContentTitle:{
    },
    MoreOptionsIcon:{
      marginTop: 14,
      marginLeft: 35,
    }
})