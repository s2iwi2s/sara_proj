import React from 'react';
import AuthenticationService from './AuthenticationService.js'
import { Route, Redirect } from 'react-router-dom';

class AuthenticatedRoute extends React.Component {
    render = () => {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        //console.log(`[AuthenticatedRoute]: isUserLoggedIn ${isUserLoggedIn}`);
        if (isUserLoggedIn) {
            return <Route {...this.props} />;
        } else {
            return <Redirect to="/login" />;
        }
    }
}
export default AuthenticatedRoute;