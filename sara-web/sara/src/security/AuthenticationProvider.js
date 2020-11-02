import { createContext, useContext, useMemo, useState } from 'react';

const AuthenticationContext = createContext();

function useAuth() {
 const context = useContext(AuthenticationContext)
 if (!context) {
  throw new Error(`useAuth must be used within an AuthenticationProvider`)
 }
 return context;
}

function AuthenticationProvider(props) {
 const [userObj, setUserObj] = useState({
  userName: '',
  userFullName: 'Guest',
  schoolName: '',
  schoolLogo: ''
 });

 const value = useMemo(() => [userObj, setUserObj], [userObj])
 return <AuthenticationContext.Provider value={value} {...props} />
}

export { AuthenticationProvider, useAuth }

