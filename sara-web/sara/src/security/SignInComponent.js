import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { ERROR_CODE } from '../api/Utils.js';
import useMessageAlert from "../api/useMessageAlert"
import SignInHtml from './SignInHtml.js';
import useSecurityServices from './useSecurityServices.js';
import { useGlobalVariable } from '../providers/GlobalVariableProvider'

export default function SignInComponent() {

  const { userLogin, setUserLogin } = useGlobalVariable();
  const { showErrorMsgAlert } = useMessageAlert();
  const { executeJwtAuthenticationService, registerJwtSucessfulLogin } = useSecurityServices()


  const [message, setMessage] = useState("");

  const history = useHistory();

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
        setUserLogin(userDetails);// setUserObj(userDetails)

        console.error(`[SignInComponent.onSignon useSec.registerJwtSucessfulLogin] userDetails=`, userDetails)
        console.error(`[SignInComponent.onSignon useSec.registerJwtSucessfulLogin] userLogin=`, userLogin)

        setMessage('Login Successful!');
        history.push(`/`);
      })
      // .catch(error => showErrorMsgAlert(error, ERROR_CODE.LOGIN_ERROR, 'SignInComponent.onSignon', 'useAuthServices.executeJwtAuthenticationService'))
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.LOGIN_ERROR, 'SignInComponent.onSignon', 'useAuthServices.executeJwtAuthenticationService'))
  }
  return (
    <SignInHtml message={message} onSignon={onSignon} />
  );
}
