import React from 'react';
import AuthenticationService from './AuthenticationService.js'


class LogoutComponent extends React.Component {
    render = () => {
        AuthenticationService.logout();
        return (
            <div className="container">
                <h1>You are logged out</h1>
                <div className="container">
                    Thank you. Come again!
                </div>
            </div>
        );
    }
}

export default LogoutComponent;