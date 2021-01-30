import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthServices } from './useAuthServices'

const AuthenticatedRoute = (props) => {
    const useAuths = useAuthServices()

    const isLoggedin = useAuths.isUserLoggedIn()
    console.log(`[AuthenticatedRoute] isLoggedin=>`, isLoggedin)
    if (isLoggedin) {
        return <Route {...props} />;
    } else {
        return <Redirect to="/login" />;
    }
}

export default AuthenticatedRoute