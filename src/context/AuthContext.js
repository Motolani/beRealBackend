import React, {createContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

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
            setUserToken(userInfo.data.token);
            console.log(userInfo.data.token);
            
      }
    } catch (error) {
      console.log('login error', error)
    }
    setIsLoading(false)
  }
  
  
  return (
    <AuthContext.Provider value={{signIn, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
