import axios from "axios"
import { AUTH_URL_BASE, AUTH_USER, AUTH_USER_OBJ, JWT_TOKEN } from "../api/Utils"

import { useGlobalVariable } from '../providers/GlobalVariableProvider'

let myInterceptor

const useSecurityServices = () => {
 const { userLogin, setUserLogin, clearUser } = useGlobalVariable();

 const initAxios = () => {
  if (isUserLoggedIn()) {
   let jwtTokenHeader = getJwtTokenHeader()
   setupAxiosInterceptors(jwtTokenHeader);
  }
 }

 const initUser = () => {
  let lu = getLoggedUserObj()
  if (lu == null) {
   clearUser()
  } else {
   setUserLogin(lu);
  }

 }

 const executeJwtAuthenticationService = (username, password) => {
  console.log('[useSecurityServices.executeJwtAuthenticationService]');

  return axios.post(`${AUTH_URL_BASE}`, { username, password })
 }

 const registerJwtSucessfulLogin = (userLogin, jwtToken) => {
  console.log('[useSecurityServices.registerJwtSucessfulLogin] jwtToken=', jwtToken);
  console.log('[useSecurityServices.registerJwtSucessfulLogin] userObj=', userLogin);
  sessionStorage.setItem(AUTH_USER_OBJ, JSON.stringify(userLogin));
  sessionStorage.setItem(AUTH_USER, userLogin.userName);
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
  console.log('[useSecurityServices.setupAxiosInterceptors] init..');
  console.log(`[useSecurityServices.setupAxiosInterceptors] authHeader: ${authHeader}`);
  myInterceptor = axios.interceptors.request.use(
   async config => {
    if (isUserLoggedIn()) {
     config.headers.authorization = authHeader;
    }
    return config;
   }
  );
  console.log('[useSecurityServices.setupAxiosInterceptors] done!');
 }

 const isUserLoggedIn = () => {
  let user = getSessionStorageLoginUser()
  return (user != null);
 }

 const getSessionStorageLoginUser = () => sessionStorage.getItem(AUTH_USER)

 const getLoggedUserObj = () => {
  let user = JSON.parse(sessionStorage.getItem(AUTH_USER_OBJ));
  console.error('[useSecurityServices.getLoggedUserObj] 1 user=>', user);
  if (!user) {
   user = null;
  }
  console.error('[useSecurityServices.getLoggedUserObj] 2 user=>', user);
  return user;
  // return {}
 }

 const logout = () => {
  axios.interceptors.request.eject(myInterceptor);
  sessionStorage.removeItem(AUTH_USER);
  sessionStorage.removeItem(AUTH_USER_OBJ);
  sessionStorage.removeItem(JWT_TOKEN);

  clearUser()
  console.log('[useSecurityServices.logout]  userLogin=>', userLogin);
 }

 return {
  initAxios: initAxios,
  initUser: initUser,
  executeJwtAuthenticationService: executeJwtAuthenticationService,
  registerJwtSucessfulLogin: registerJwtSucessfulLogin,
  getLoggedUserObj: getLoggedUserObj,
  isUserLoggedIn: isUserLoggedIn,
  logout: logout
 }

}

export default useSecurityServices;