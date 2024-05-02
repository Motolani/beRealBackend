import { View, Text, ScrollView, StyleSheet} from 'react-native'
import React, { useState, useContext, useEffect} from 'react';
import HomeBorder from '../../../components/HomeBorder/HomeBorder'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios';

const Dashboard = ({ navigation }) => {
  const { userToken, BaseUrl } = useContext(AuthContext);
  const [schdeduleData, setSchdeduleData] = useState([]);
  // const [error, setError] = useState([]);

  
  
  const schedules = async () => {
    try {
      const {data, responseCode} = await axios.get(BaseUrl+'/schedule', { headers: { 
        'Authorization': 'Bearer '+userToken
      }} )
      
      console.log(data)
      console.log(responseCode)

      setSchdeduleData(data);

      } catch (error) {
        console.log(error)
      }
      
    }

    const editSchedule = async(id) => {
      
      try {
          console.log('reminderId');
          console.log(id);
          const url = BaseUrl+'/schedule/'+id+'/edit';
          console.log(url);
          const {data} = await axios.get(url, { headers: { 
            'Authorization': 'Bearer '+userToken
          }})
          console.log(data);
          console.log('here');
          console.log(data.status);
        
          // setPrevousData(data);
      
          // if(data.status == 200){
          //     const theData = data.data;
          // const newData = theData.map(object => {
          //     return Object.assign(object, {key: object.id, value: object.name});
          // })

          //   console.log (data)
          //   console.log ('newGroupData')
          //   console.log (newData)
          //   setUserContactGroups(newData)
          // }else if(data.status == 500){
          //     console.log(data.required_fields)
          // }else if(data.status == 300){
          //     console.log(data.message)
          // }
            navigation.navigate('Edit Reminder', {
            data: data
          })
  
      } catch (error) {
          console.log('edit schedule Data', error)
      }
      // setIsLoading(false)
  }

    useEffect(() => {
      const focusHandler = navigation.addListener('focus', () => {
        schedules();
      });
      return focusHandler;
    }, [navigation]);
  
  return (
    <ScrollView style={styles.back}>
       <View>
          <Text style={styles.groupTitleText}>Scheduled</Text>
        </View>
      <View  style={styles.Container}>
      {schdeduleData.map((schdedule) => (
          <HomeBorder 
          timeStamp={schdedule.start_at}
          status={schdedule.status}
          title={schdedule.title}
          onPressDelete={() => editSchedule(schdedule.id)}
          // onPressDelete={() => navigation.navigate('Edit Reminder', {
          //   id: schdedule.id
          // })}
          />
          // <li key={season.id}>{season}</li>
        ))}

      </View>
    </ScrollView>
  )
}

export default Dashboard
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
  },
  back:{
    backgroundColor: '#e2f0fd',
  },
  groupTitleText:{
    color: '#4772E1',
    fontWeight:'bold',
    fontSize: 16,
    marginLeft: 28,
    marginTop: 15
  },
})