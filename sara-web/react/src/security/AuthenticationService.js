import React from 'react';
import axios from "axios";
import { AUTH_URL_BASE, AUTH_USER, JWT_TOKEN } from '../api/Utils.js'
let myInterceptor
class AuthenticationService extends React.Component {
    constructor() {
        super();
        this.initialize();
    }
    initialize = () => {
        if (this.isUserLoggedIn()) {
            let jwtTokenHeader = this.getJwtTokenHeader()
            this.setupAxiosInterceptors(jwtTokenHeader);
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

    registerJwtSucessfulLogin = (username, jwtToken) => {
        console.log('[AuthenticationService.registerJwtSucessfulLogin] init');
        sessionStorage.setItem(AUTH_USER, username);
        sessionStorage.setItem(JWT_TOKEN, jwtToken);

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

    getJwtToken = () => {
        let jwtToken = sessionStorage.getItem(JWT_TOKEN);
        return jwtToken;
    }

    logout = () => {
        axios.interceptors.request.eject(myInterceptor);
        sessionStorage.removeItem(AUTH_USER);
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