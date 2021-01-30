import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSecurityServices } from './useSecurityServices'

const AuthenticatedRoute = (props) => {
    const useSec = useSecurityServices()

    const isLoggedin = useSec.isUserLoggedIn()
    console.log(`[AuthenticatedRoute] isLoggedin=>`, isLoggedin)
    if (isLoggedin) {
        return <Route {...props} />;
    } else {
        return <Redirect to="/login" />;
    }
}

export default AuthenticatedRoute