import React from 'react';
import './App.css';
import { AuthenticationProvider, useAuth } from './security/AuthenticationProvider';

import AppRouting from './AppRouting'
// function setUserObjReducer(state, userObj) {
//   return [...state, userObj]
// }

function App() {
  // const [userObj, setUserObj] = useState({
  //   userName: '',
  //   userFullName: 'Guest',
  //   schoolName: '',
  //   schoolLogo: ''
  // });

  // const userParam = {
  //   userObj: userObj,
  //   setUserObj: setUserObj
  // }

  return (
    <div className="App">
      <AuthenticationProvider>
        <AppRouting />
      </AuthenticationProvider>
    </div >
  );
}

export default App;
