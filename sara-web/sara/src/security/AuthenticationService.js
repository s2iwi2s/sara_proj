import React from 'react';
import axios from "axios";
import { AUTH_URL_BASE, AUTH_USER, AUTH_USER_OBJ, JWT_TOKEN } from '../api/Utils.js'
import { useAuth } from './AuthenticationProvider';


let myInterceptor

class AuthenticationService extends React.Component {
    constructor() {
        super();
        this.initialize();
        console.log('[AuthenticationService.constructor] done')
    }

    initialize = () => {
        if (this.isUserLoggedIn()) {
            let jwtTokenHeader = this.getJwtTokenHeader()
            this.setupAxiosInterceptors(jwtTokenHeader);
        }
    }
    setLoggedUserObject = () => {
        if (this.isUserLoggedIn()) {
            this.setState({
                userObj: this.getLoggedUserObj()
            });
            console.log('[AuthenticationService.setLoggedUserObject] this.state.userObj=>', this.state.userObj);
        }
    }

    // executeBasicAuthenticationService = (username, password) => {
    //     const theurl = `${URL_BASE}/basicauth`
    //     return axios.get(theurl, Utils.getBasicAuthHeader(username, password));
    // }

    getBasicAuthHeader = (username, password) => {
        return {
            auth: {
                username: username,
                password: password
            }
        };
    }

    executeJwtAuthenticationService = (username, password) => {
        const theurl = `${AUTH_URL_BASE}`
        //console.log(`[AuthenticationService.executeJwtAuthenticationService] theurl=${theurl}`);
        return axios.post(theurl, { username, password });
    }

    // registerBasicAuthSucessfulLogin = (username, password) => {
    //     //console.log('[AuthenticationService.registerSucessfulLogin] init');
    //     sessionStorage.setItem(AUTH_USER, username);

    //     let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);
    //     this.setupAxiosInterceptors(basicAuthHeader);
    // }

    registerJwtSucessfulLogin = (userObj, jwtToken) => {
        console.log('[AuthenticationService.registerJwtSucessfulLogin] init');
        sessionStorage.setItem(AUTH_USER_OBJ, JSON.stringify(userObj));
        sessionStorage.setItem(AUTH_USER, userObj.userName);
        sessionStorage.setItem(JWT_TOKEN, jwtToken);

        this.setState({
            userObj: userObj
        });

        let jwtTokenHeader = this.getJwtTokenHeader()
        this.setupAxiosInterceptors(jwtTokenHeader);
    }

    getJwtTokenHeader = () => {
        let jwtToken = this.getJwtToken();
        let jwtTokenHeader = `Bearer ${jwtToken}`;
        return jwtTokenHeader;
    }

    getLoginUserName = () => {
        let user = sessionStorage.getItem(AUTH_USER);
        return user;
    }

    getLoggedUserObj = () => {
        let user = JSON.parse(sessionStorage.getItem(AUTH_USER_OBJ));
        console.log('[AuthenticationService.getLoggedUserObj] 1 user=>', user);
        if (!user) {
            user = {
                userName: '',
                userFullName: 'Guest',
                schoolName: '',
                schoolLogo: ''
            }
        }
        console.log('[AuthenticationService.getLoggedUserObj] 2 user=>', user);
        return user;
        // return {}
    }

    getJwtToken = () => {
        let jwtToken = sessionStorage.getItem(JWT_TOKEN);
        return jwtToken;
    }

    logout = () => {
        axios.interceptors.request.eject(myInterceptor);
        sessionStorage.removeItem(AUTH_USER);
        sessionStorage.removeItem(AUTH_USER_OBJ);
        sessionStorage.removeItem(JWT_TOKEN);
    }

    isUserLoggedIn = () => {
        let user = this.getLoginUserName();
        return (user != null);
    }

    setupAxiosInterceptors = (authHeader) => {
        console.log('[AuthenticationService.setupAxiosInterceptors] init..');
        console.log(`[AuthenticationService.setupAxiosInterceptors] authHeader: ${authHeader}`);
        myInterceptor = axios.interceptors.request.use(
            async config => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = authHeader;
                }
                return config;
            }
        );
        console.log('[AuthenticationService.setupAxiosInterceptors] done!');
    }
}
export default new AuthenticationService();