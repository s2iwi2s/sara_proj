import React, { useState } from 'react';

import AuthenticationService from './AuthenticationService.js'
import { useHistory } from "react-router-dom";
import SignInHtml from './SignInHtml.js';
// import { useForm } from 'react-hook-form';

export default function SignInComponent() {
  const history = useHistory();

  const [message, setMessage] = useState("");

  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");

  // const handleUserNameChange = (e) => setUserName(e.target.value);
  // const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSignon = (userName, password) => {
    setMessage('');
    console.log(`onSubmitPage userName=${userName}, password=${password}`);
    AuthenticationService.executeJwtAuthenticationService(userName, password)
      //executeBasicAuthenticationService(this.state.username, this.state.password)
      .then(response => {
        console.log('[SignInComponent.onSubmitPage]: response', response);
        AuthenticationService.registerJwtSucessfulLogin(userName, response.data.token)

        //registerBasicAuthSucessfulLogin(this.state.username, this.state.password);
        setMessage('Login Successful!');
        history.push(`/`);

      }).catch(error => {
        console.log(`[SignInComponent.onSubmitPage]: error=${JSON.stringify(error)}`);
        setMessage('Login in failed. Your User Name and Password do not match.');
      });
  }
  return (
    <SignInHtml message={message} onSignon={onSignon} />
  );
}
