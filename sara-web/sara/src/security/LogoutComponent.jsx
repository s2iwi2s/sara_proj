import React, { useEffect } from 'react';

import { useSecurityServices } from './useSecurityServices'
import { useAuth } from '../providers/AuthenticationProvider';

export default function LogoutComponent() {
    const [userObj] = useAuth();
    const useSec = useSecurityServices()

    useEffect(() => {
        console.log('[LogoutComponent.useEffect]: userObj', userObj);
        useSec.logout();
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
