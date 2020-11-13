import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import SignInHtml from './SignInHtml.js';
import { useAuth } from './AuthenticationProvider';
import AuthenticationService from './AuthenticationService.js'

// import { useForm } from 'react-hook-form';

export default function SignInComponent() {
  const [message, setMessage] = useState("");
  const [userObj, setUserObj] = useAuth();

  const history = useHistory();


  const onSignon = (userName, password) => {
    setMessage('');
    console.log(`onSubmitPage userName=${userName}, password=${password}`);

    AuthenticationService.executeJwtAuthenticationService(userName, password)
      //executeBasicAuthenticationService(this.state.username, this.state.password)
      .then(response => {
        console.log('[SignInComponent.onSubmitPage]: response', response);
        AuthenticationService.registerJwtSucessfulLogin(response.data.userDetails, response.data.token)

        setUserObj(response.data.userDetails);
        console.log('[SignInComponent.onSubmitPage]: userObj', userObj);

        //registerBasicAuthSucessfulLogin(this.state.username, this.state.password);
        setMessage('Login Successful!');
        history.push(`/`);

      })
      .catch(error => {
        console.log(`[SignInComponent.onSubmitPage]: error=>`, error);
        setMessage('Login in failed. Your User Name and Password do not match.');
      });
  }
  return (
    <SignInHtml message={message} onSignon={onSignon} />
  );
}
