import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthServices } from './useAuthServices'

const AuthenticatedRoute = (props) => {
    const [,
        ,
        ,
        ,
        isUserLoggedIn,

    ] = useAuthServices()

    const isLoggedin = isUserLoggedIn()
    console.log(`[AuthenticatedRoute] isLoggedin=>`, isLoggedin)
    if (isUserLoggedIn()) {
        return <Route {...props} />;
    } else {
        return <Redirect to="/login" />;
    }
}

export default AuthenticatedRoute