import { USER_TEMP } from '../api/Utils'
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
 const [userObj, setUserObj] = useState(USER_TEMP);

 const value = useMemo(() => [userObj, setUserObj], [userObj])
 return <AuthenticationContext.Provider value={value} {...props} />
}

export { AuthenticationProvider, useAuth }

