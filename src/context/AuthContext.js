import React, {createContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null); 
  const [userId, setUserId] = useState(null); 

  const BaseUrl = 'https://myfamconnect.com/api';

  // const signIn = async (email=null, password=null) => {
  //   const authUser = {email, password}
  //   setIsLoading(true)

  //   try {
  //     const header = { 
  //       'Accept': 'application/vnd.api+json', 
  //       'Content-Type': 'application/vnd.api+json', 
  //     }
  //     const url = BaseUrl+'/login'
  //     console.log('herrreeeee')
  //     const {data} = await axios.post(url, authUser, { headers: header})
      

  //     console.log(data);

  //     if(data.responseCode == 200){
  //       // setErrorMessage(null);
  //         let userInfo = data;
  //         console.log(userInfo);
  //         setUserId(userInfo.data.user.id);
  //         setUserToken(userInfo.data.token);
  //         setUserInfo(userInfo.data.user);
  //         // setUserId(userInfo.data);
  //         console.log(userInfo.data.token);
  //         console.log(userInfo.data.user);
  //         console.log(userInfo.data.user.id);
  //     }
  //   } catch (error) {
  //     console.log('login error', error)
  //   }
  //   setIsLoading(false)
  // }

  // const onSubmit = async (useer=null, pwd=null) => {
  //   setLoading(true)

  //   if(useer != null && pwd != null){
  //       await entSignIn(useer, pwd);
  //   }else{

  //       console.log(username)
  //       console.log(password)
  //       if(!username || !password){
  //           return alert("Fill in all fields")
  //       }
  //       console.log('username - ' + username, 'password - ' + password);


  //       await entSignIn(username, password);

  //       await AsyncStorage.setItem("merchantEmailEnt", username).then(
  //           () => AsyncStorage.getItem("merchantEmailEnt")
  //               .then((result)=>console.log(result))
  //       )

  //       await AsyncStorage.setItem("merchantPasswordEnt", password).then(
  //           () => AsyncStorage.getItem("merchantPasswordEnt")
  //               .then((result)=>console.log(result))
  //       )

  //       console.log(username, password);


  //       if(error){
  //           return [
  //               alert(error),
  //               setLoading(false)
  //           ]    
  //       }
  //   }
  //   setLoading(false)
  // }

  const signIn = async (email = null, password = null) => {
    const authUser = { email, password };
    setIsLoading(true);

    try {
        const header = {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
        };
        const url = BaseUrl + '/login';
        console.log('herrreeeee');

        const requestOptions = {
            method: 'POST',
            headers: header,
            body: JSON.stringify(authUser),
        };

        const response = await fetch(url, requestOptions);
        const data = await response.json();

        console.log(data);

        if (data.responseCode === 200) {
            // setErrorMessage(null);
            let userInfo = data;
            console.log(userInfo);
            setUserId(userInfo.data.user.id);
            setUserToken(userInfo.data.token);
            setUserInfo(userInfo.data.user);
            // setUserId(userInfo.data);
            console.log(userInfo.data.token);
            console.log(userInfo.data.user);
            console.log(userInfo.data.user.id);
        }
    } catch (error) {
        console.log('login error', error);
    }
    setIsLoading(false);
};

  const createGroup = async (groupName, selectedContacts) => {
    const header = { 
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': 'Bearer '+userToken,
    }
    console.log(userToken);

    const groupInfo = {groupName, selectedContacts}
    setIsLoading(true)

    try {
      const {data} = await axios.post(BaseUrl+'/createGroup', groupInfo, { headers: header})
      // console.log(data);

      if(data.responseCode == 200){
        setErrorMessage(null);
      }
    } catch (error) {
      console.log('login error', error)
    }
    setIsLoading(false)
  }
  
  
  return (
    <AuthContext.Provider value={{signIn, createGroup, userId, BaseUrl, isLoading, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
