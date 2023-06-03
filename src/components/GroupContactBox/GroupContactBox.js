import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const GroupContactBox = ({title, onPressEdit}) => {
    return (
        <View style={styles.theGroupsContainer}>
            <View style={styles.Container}>
                <View style={styles.BottomLayer}>
                    <View style={styles.ContentTitleContainer}>
                        <Text style={styles.ContentTitle}> {title} </Text>
                    </View>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.MoreOptionsIcon} onPressEdit = {onPressEdit}>
                            <Icon name="md-reader" size={22} color="#4772E1"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.MoreOptionsIconTwo}>
                            <Icon name="trash-sharp" size={22} color="#FF0000"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default GroupContactBox
const styles = StyleSheet.create({
    Container: {
        width: hp('43%'),
        height: hp('8.5%'),
        backgroundColor: '#f8fcff',
        borderRadius: 15,
        marginTop: 10,
        borderColor: '#4772E1',

    },
    Status:{
        color: '#10AF58',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 110,
    },
    options:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    BottomLayer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 18,
    },
    ContentTitleContainer:{
        marginLeft: 20,
        marginTop: 10,
        width: 200,
    },
    ContentTitle:{
    },
    MoreOptionsIcon:{
        marginTop: 6,
        marginLeft: 55,
    },
    MoreOptionsIconTwo:{
        marginTop: 6,
        marginLeft: 15,
    },
    theGroupsContainer:{
        alignItems: "center",
    },
})