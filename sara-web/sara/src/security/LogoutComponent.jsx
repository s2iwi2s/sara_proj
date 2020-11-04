import React, { useEffect } from 'react';

import AuthenticationService from './AuthenticationService.js'
import { useAuth } from './AuthenticationProvider';
import { USER_TEMP } from '../api/Utils'


export default function LogoutComponent() {
    const [userObj, setUserObj] = useAuth();

    useEffect(() => {
        console.log('[SignInComponent.onSubmitPage]: userObj', userObj);
        AuthenticationService.logout();
        setUserObj(USER_TEMP);
    });

    return (
        <div className="container" >
            <h1>You are logged out</h1>
            <div className="container">
                Thank you. Come again!
                </div>
        </div>
    );

}
