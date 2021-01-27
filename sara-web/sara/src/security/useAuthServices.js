import axios from "axios"
import { AUTH_URL_BASE, AUTH_USER, AUTH_USER_OBJ, JWT_TOKEN, USER_TEMP } from "../api/Utils"

import { useAuth } from '../providers/AuthenticationProvider';

let myInterceptor

export const useAuthServices = () => {
 const [userObj, setUserObj] = useAuth();

 const initialize = () => {
  if (isUserLoggedIn()) {
   let jwtTokenHeader = getJwtTokenHeader()
   setupAxiosInterceptors(jwtTokenHeader);
  }
 }

 const executeJwtAuthenticationService = (username, password) => {
  console.log('[useAuthServices.executeJwtAuthenticationService]');

  return axios.post(`${AUTH_URL_BASE}`, { username, password })
 }

 const registerJwtSucessfulLogin = (userObj, jwtToken) => {
  console.log('[useAuthServices.registerJwtSucessfulLogin] jwtToken=', jwtToken);
  console.log('[useAuthServices.registerJwtSucessfulLogin] userObj=', userObj);
  sessionStorage.setItem(AUTH_USER_OBJ, JSON.stringify(userObj));
  sessionStorage.setItem(AUTH_USER, userObj.userName);
  sessionStorage.setItem(JWT_TOKEN, jwtToken);


  let jwtTokenHeader = getJwtTokenHeader()
  setupAxiosInterceptors(jwtTokenHeader);
 }

 const getJwtTokenHeader = () => {
  let jwtToken = getJwtToken();
  let jwtTokenHeader = `Bearer ${jwtToken}`;
  return jwtTokenHeader;
 }

 const getJwtToken = () => sessionStorage.getItem(JWT_TOKEN)

 const setupAxiosInterceptors = (authHeader) => {
  console.log('[useAuthServices.setupAxiosInterceptors] init..');
  console.log(`[useAuthServices.setupAxiosInterceptors] authHeader: ${authHeader}`);
  myInterceptor = axios.interceptors.request.use(
   async config => {
    if (isUserLoggedIn()) {
     config.headers.authorization = authHeader;
    }
    return config;
   }
  );
  console.log('[useAuthServices.setupAxiosInterceptors] done!');
 }

 const isUserLoggedIn = () => {
  let user = getSessionStorageLoginUser()
  return (user != null);
 }

 const getSessionStorageLoginUser = () => sessionStorage.getItem(AUTH_USER)

 const getLoggedUserObj = () => {
  let user = JSON.parse(sessionStorage.getItem(AUTH_USER_OBJ));
  console.error('[useAuthServices.getLoggedUserObj] 1 user=>', user);
  if (!user) {
   user = USER_TEMP;
  }
  console.error('[useAuthServices.getLoggedUserObj] 2 user=>', user);
  return user;
  // return {}
 }

 const logout = () => {
  axios.interceptors.request.eject(myInterceptor);
  sessionStorage.removeItem(AUTH_USER);
  sessionStorage.removeItem(AUTH_USER_OBJ);
  sessionStorage.removeItem(JWT_TOKEN);

  setUserObj(USER_TEMP)
  console.log('[useAuthServices.logout]  userObj=>', userObj);
 }

 return [
  initialize,
  executeJwtAuthenticationService,
  registerJwtSucessfulLogin,
  getLoggedUserObj,
  isUserLoggedIn,
  logout
 ]
}