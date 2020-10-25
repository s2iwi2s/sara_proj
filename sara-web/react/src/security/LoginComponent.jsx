import { FormControl, TextField } from '@material-ui/core';
import React from 'react';

import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: 'test',
            hasLoginFailed: false,
            message: '',
            alertClass: ''
        }
    }

    changeHandler = event => {
        console.log(`name: ${event.target.name}, value: ${event.target.value}`);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loginClicked = event => {
        console.log('state: ', this.state);
        // if(this.state.username==='test' && this.state.password==='test') {
        //     AuthenticationService.registerSucessfulLogin(this.state.username, this.state.password);
        //     console.log('success');
        //     this.setState({
        //         hasLoginFailed : false,
        //         showSuccessMsg: true
        //     });
        //     this.props.history.push(`/welcome/${this.state.username}`);
        // }else{
        //     this.setState({
        //         hasLoginFailed : true,
        //         showSuccessMsg: false
        //     });
        // }
        //event.preventDefault();
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            //executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(response => {
                console.log('[LoginComponent.loginClicked]: response', response);
                AuthenticationService.registerJwtSucessfulLogin(this.state.username, response.data.token)
                //registerBasicAuthSucessfulLogin(this.state.username, this.state.password);
                this.setState({
                    hasLoginFailed: false,
                    message: 'Login Successful!',
                    alertClass: 'alert-success'
                });
                this.props.history.push(`/`);
            }
            ).catch(error => {
                console.log(`[LoginComponent.loginClicked]: error=${JSON.stringify(error)}`);
                this.setState({
                    alertClass: 'alert-danger',
                    message: `Invalid ID or password. Please try again.`,
                    hasLoginFailed: true
                });
            });
    }

    render = () => {
        return (
            <div>
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                    {this.state.message != null && <div className={'text-center alert ' + this.state.alertClass}>{this.state.message}</div>}
                    <FormControl fullWidth margin="normal">
                        <TextField label="Username" placeholder="Enter Username"
                            name="username" value={this.state.username}
                            onChange={(e) => this.changeHandler(e)} />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField type="password" label="Password" placeholder="Enter Password"
                            name="password" value={this.state.password}
                            onChange={(e) => this.changeHandler(e)} />
                    </FormControl>

                    <button type="button" className="btn btn-lg btn-primary btn-block" onClick={this.loginClicked}>Sign in</button>
                </form>
            </div>
        );
    }
}

export default LoginComponent;