import React, {createContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null); 
  const [userId, setUserId] = useState(null); 

  const signIn = async (email, password) => {
    const authUser = {email, password}
    setIsLoading(true)

    try {
      const {data} = await axios.post('http://127.0.0.1:8000/api/login', authUser)
      console.log(data);

      if(data.responseCode == 200){
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
      console.log('login error', error)
    }
    setIsLoading(false)
  }

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
      const {data} = await axios.post('http://127.0.0.1:8000/api/createGroup', groupInfo, { headers: header})
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
    <AuthContext.Provider value={{signIn, createGroup, userId, isLoading, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
