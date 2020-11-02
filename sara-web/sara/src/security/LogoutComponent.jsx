import React, { useEffect } from 'react';

import AuthenticationService from './AuthenticationService.js'
import { useAuth } from './AuthenticationProvider';


export default function LogoutComponent() {
    const [userObj, setUserObj] = useAuth();

    useEffect(() => {
        AuthenticationService.logout();
        setUserObj({
            userName: '',
            userFullName: 'Guest',
            schoolName: '',
            schoolLogo: ''
        });
    }, []);

    return (
        <div className="container" >
            <h1>You are logged out</h1>
            <div className="container">
                Thank you. Come again!
                </div>
        </div>
    );

}
