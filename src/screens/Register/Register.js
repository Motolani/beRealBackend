import { View, Text, useWindowDimensions, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, {useContext, useState}  from 'react'
import InputWithText from '../../components/InputWithText/InputWithText';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Button } from "@rneui/themed";
8
const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [instagram, setInstagram] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  
  const onSubmit = async() => {
    console.log(email, password);
  }
  
  return (
    <View style={styles.container}>
      <ScrollView>

      
      {/* <Text>Login</Text> */}
      <InputWithText
        placeholder="Email address"
        value={email}
        setValue={setEmail}
        label="Email Address"
      />
      <InputWithText
        placeholder="Phone number"
        value={phoneNumber}
        setValue={setPhoneNumber}
        label="Phone Number"
      />
      <InputWithText
        placeholder="Date of birth"
        value={dob}
        setValue={setDob}
        label="Date of Birth"
      />
      <InputWithText
        placeholder="Instagram handle"
        value={instagram}
        setValue={setInstagram}
        label="Instagram Handle"
      />
      <InputWithText
        placeholder="password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        label="Password"
      />
      <InputWithText
        placeholder="Confirm password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        secureTextEntry={true}
        label="Confirm Password"
      />
      
      <View style={styles.button}>
        <CustomButton
          text="Sign Up"
          onPress={onSubmit}
          type="BASE"
          textColor="White"
        />
      </View>

      <View style={styles.SiginRegisterButtonView}>
        <Text style={styles.SigInText}> Already have an account? </Text>
        <TouchableOpacity>
          <Button onPress={() => navigation.navigate('Log in')} style={styles.SigupRegisterButtonViewTwo} size="sm" type="clear">
            Sign in
          </Button> 
        </TouchableOpacity>
        
      </View>
      </ScrollView>

    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#e4f3fa",
  },
  button:{
    marginTop:3,
  },
  SiginRegisterButtonView:{
    flexDirection: 'row',
    marginTop: 1,
    alignContent: "center",
    marginLeft: 30
  },
  SigupRegisterButtonViewTwo:{
    marginTop: -9
  }
})

export default Register