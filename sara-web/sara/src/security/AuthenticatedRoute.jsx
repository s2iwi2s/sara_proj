import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useSecurityServices from './useSecurityServices'

const AuthenticatedRoute = (props) => {
    const { isUserLoggedIn } = useSecurityServices()

    const isLoggedin = isUserLoggedIn()
    console.log(`[AuthenticatedRoute] isLoggedin=>`, isLoggedin)
    if (isLoggedin) {
        return <Route {...props} />;
    } else {
        return <Redirect to="/login" />;
    }
}

export default AuthenticatedRoute