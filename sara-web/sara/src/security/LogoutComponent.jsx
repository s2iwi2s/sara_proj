import React, { useEffect } from 'react';

import { useAuthServices } from './useAuthServices'
import { useAuth } from '../providers/AuthenticationProvider';

export default function LogoutComponent() {
    const [userObj] = useAuth();
    const [,
        ,
        ,
        ,
        ,
        logout] = useAuthServices()

    useEffect(() => {
        console.log('[LogoutComponent.useEffect]: userObj', userObj);
        logout();
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
