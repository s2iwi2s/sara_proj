import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import SignInHtml from './SignInHtml.js';
import { useMessageAlert } from "../api/useMessageAlert"
import { useAuth } from '../providers/AuthenticationProvider';
import { useAuthServices } from './useAuthServices'
import { ERROR_CODE } from '../api/Utils.js';

export default function SignInComponent() {

  const useAlert = useMessageAlert();

  const [,
    executeJwtAuthenticationService,
    registerJwtSucessfulLogin,
    ,
    ,
  ] = useAuthServices()


  const [message, setMessage] = useState("");
  const [userObj, setUserObj] = useAuth();

  const history = useHistory();

  // const setError = (error, errorCode, formMethod, serviceName) => {
  //   console.error(`[SignInComponent.setError]  error=`, error)
  //   showErrorMsgAlert(error, errorCode, formMethod, serviceName)
  // }

  const onSignon = (userName, password) => {
    console.error(`[SignInComponent.onSignon] userName=${userName}`)
    setMessage('');

    executeJwtAuthenticationService(userName, password)
      .then(response => {
        const userDetails = {
          ...response.data.userDetails,
          isLoggedIn: true
        }
        registerJwtSucessfulLogin(userDetails, response.data.token)
        setUserObj(userDetails)

        console.error(`[SignInComponent.onSignon useAuthServices.xecuteJwtAuthenticationService] userDetails=`, userDetails)
        console.error(`[SignInComponent.onSignon useAuthServices.xecuteJwtAuthenticationService] userObj=`, userObj)

        setMessage('Login Successful!');
        history.push(`/`);
      })
      // .catch(error => showErrorMsgAlert(error, ERROR_CODE.LOGIN_ERROR, 'SignInComponent.onSignon', 'useAuthServices.executeJwtAuthenticationService'))
      .catch(error => useAlert.showErrorMsgAlert(error, ERROR_CODE.LOGIN_ERROR, 'SignInComponent.onSignon', 'useAuthServices.executeJwtAuthenticationService'))
  }
  return (
    <SignInHtml message={message} onSignon={onSignon} />
  );
}
