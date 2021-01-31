import React, { useEffect } from 'react';

import useSecurityServices from './useSecurityServices'
import { useGlobalVariable } from '../providers/GlobalVariableProvider'

export default function LogoutComponent() {
    const { userLogin } = useGlobalVariable();
    const { logout } = useSecurityServices()

    useEffect(() => {
        console.log('[LogoutComponent.useEffect]: userLogin', userLogin);
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
