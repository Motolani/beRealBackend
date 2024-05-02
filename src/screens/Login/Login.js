import { View, Text, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useContext, useState}  from 'react'
import InputWithText from '../../components/InputWithText/InputWithText';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Button } from '@rneui/themed';
import { AuthContext } from '../../context/AuthContext';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signIn } = useContext(AuthContext);
  const onSubmit = async() => {
    await signIn(email, password);
    console.log(email, password);
  }

  // const onSubmit = async() => {
  //   fetch('http://16.170.224.242/api')
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  // }

  

  // const handleBiometric = () => {
  //   console.log(TouchID.isSupported(optionalConfigObject))
  //   TouchID.isSupported(optionalConfigObject)
  //       .then(biometryType => {
  //           if (biometryType === 'TouchID') {
  //               // Touch ID is supported on iOS
  //           console.log('here IOS')
  //           }else
  //           {
  //               // Touch ID is supported on Android
  //               console.log('here android')
  //               // if(isAuthEnt){
  //               //     return null
  //               // }
  //               TouchID.authenticate('', optionalConfigObject)
  //               .then(success => {
  //                   console.log('Success', success);
  //                   setIsAuthEnt(success)
  //                   fingerPrintLogin()

  //               })
  //               .catch(err => {
  //                   BackHandler.exitApp();
  //               })
  //           }
  //       })
  //   .catch(error => {
  //       // User's device does not support Touch ID (or Face ID)
  //       // This case is also triggered if users have not enabled Touch ID on their device
  //   });
  // }

  // const test = async() => {
  //     console.log('here')
  //     await AsyncStorage.getItem("merchantEmailEnt").then(
  //         (result)=> console.log(result)
  //     )
  //     await AsyncStorage.getItem("merchantPasswordEnt").then(
  //         (resultTwo)=> console.log(resultTwo)
  //     )
  // }

  // const fingerPrintLogin = async() => {
  //     // const value = await AsyncStorage.getItem('@loginBiometric');

  //     await AsyncStorage.getItem("merchantEmailEnt").then(
  //         (result)=> {
  //             setUsername(result)
  //             $useer = result
  //         }
  //     )
  //     await AsyncStorage.getItem("merchantPasswordEnt").then(
  //         (resultTwo)=> {
  //             setPassword(resultTwo)
  //             $pwd = resultTwo
  //         }
  //     )
      
  //     console.log('pre submit')
  //     console.log(username)
  //     console.log(password)
      
  //     onSubmit($useer, $pwd);

  // }

  // const finger = async() => {
  //     await AsyncStorage.getItem("TouchLoginEnt").then(
  //         (result)=> {
  //             if(result == 'true'){
  //                 setIsAuthEnt(true)
  //                 console.log('result')
  //                 console.log(result)

  //             }else{
  //                 setIsAuthEnt(false)
  //                 console.log('result')
  //                 console.log(result)

  //             }
  //         }
  //     )
  //     console.log(isAuthEnt)
  // }

  

  // useEffect(() => {
  //     // handleBiometric()
  //     finger()
  // }, [])

  
  return (
    <View style={styles.container}>
      {/* <Text>Login</Text> */}
      <InputWithText
        placeholder="Email address"
        value={email}
        setValue={setEmail}
        label="Email Address"
      />
      <InputWithText
        placeholder="password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        label="Password"
      />
      
      <View style={styles.button}>
        <CustomButton
          text="Log in"
          onPress={onSubmit}
          type="BASE"
          textColor="White"
        />
      </View>
      <View style={styles.SiginRegisterButtonView}>
        <Text style={styles.SigInText}> Don't have an account? </Text>
        <TouchableOpacity>
          <Button onPress={() => navigation.navigate('Register')} style={styles.SigupRegisterButtonViewTwo} size="sm" type="clear">
            Sign up
          </Button> 
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    alignItems: "center",
    // backgroundColor: "#cae8f5",
    backgroundColor: "#e4f3fa",
  },
  button:{
    marginTop:380,
  },
  SiginRegisterButtonView:{
    flexDirection: 'row',
    marginTop: 1,
    alignContent: "center",

  },
  SigupRegisterButtonViewTwo:{
    marginTop: -8,
  }
})
export default Login