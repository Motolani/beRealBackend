import { View, Text, ScrollView, StyleSheet} from 'react-native'
import React, { useState, useContext, useEffect} from 'react';
import HomeBorder from '../../../components/HomeBorder/HomeBorder'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios';

const Dashboard = () => {
  const { userToken } = useContext(AuthContext);
  const [schdeduleData, setSchdeduleData] = useState([]);
  // const [error, setError] = useState([]);

  const schedules = async () => {
    try {
      const {data, responseCode} = await axios.get('http://127.0.0.1:8000/api/schedule', { headers: { 
        'Authorization': 'Bearer '+userToken
      }} )
      
      console.log(data)
      console.log(responseCode)

      setSchdeduleData(data);

      } catch (error) {
        console.log(error)
      }
      
    }

    useEffect(() => {
      schedules();
  }, []);
  
  return (
    <ScrollView style={styles.back}>
      <View  style={styles.Container}>
      {schdeduleData.map((schdedule) => (
          <HomeBorder 
          timeStamp={schdedule.created_at}
          status={schdedule.status}
          title={schdedule.title}
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
  }
})