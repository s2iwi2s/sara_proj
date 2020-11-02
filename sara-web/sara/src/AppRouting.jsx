import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { Container, CssBaseline } from '@material-ui/core';

import ErrorComponent from './api/ErrorComponent'
import FooterComponent from './forms/common/FooterComponent'
import EndUserListComponent from './forms/endUser/EndUserListComponent';
import EndUserDetailComponent from './forms/endUser/EndUserDetailComponent';
import AddressListComponent from './forms/address/AddressListComponent';
import AddressDetailComponent from './forms/address/AddressDetailComponent';

import AuthenticatedRoute from './security/AuthenticatedRoute'
import SignInComponent from './security/SignInComponent';
import LogoutComponent from './security/LogoutComponent'
import CodeGroupsListComponent from './forms/codeGroups/CodeGroupsListComponent';
import CodeGroupsDetailComponent from './forms/codeGroups/CodeGroupsDetailComponent';
import Dashboard from './forms/Dashboard';
import AppBarComponent from './forms/common/AppBarComponent';
import StudentDetailComponent from './forms/student/StudentDetailComponent';
import StudentListComponent from './forms/student/StudentListComponent';

import BillingSearchComponent from './forms/billing/BillingSearchComponent';

import { PAGE_URL } from './api/Utils';
import { useStyles } from './forms/common/CSS'
import { AuthenticationProvider, useAuth } from './security/AuthenticationProvider';
import AuthenticationService from './security/AuthenticationService';


const AppRouting = props => {
 const [userObj, setUserObj] = useAuth();

 useEffect(() => {
  setUserObj(AuthenticationService.getLoggedUserObj());
 }, []);

 const [data, setData] = useState([]);
 const [country, setCountry] = useState('');
 const [darkMode, setDarkMode] = useState(false);

 const theme = createMuiTheme({
  palette: {
   type: darkMode ? "dark" : "light",
  },
 });
 const toggleDarkMode = () => setDarkMode(!darkMode);

 // render = () => {
 const classes = useStyles();

 return (
  <MuiThemeProvider theme={theme}>
   <CssBaseline />

   <div className="AppRouting">
    <Router>
     <>
      {/* <AppBarDrawerComponent /> */}

      <AppBarComponent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />


      <Container component="main" className={classes.container}>
       <Switch>
        <Route path={PAGE_URL.ROOT} exact component={Dashboard} />
        <Route path={PAGE_URL.INDEX} exact component={Dashboard} />

        <Route path={PAGE_URL.LOGOUT} component={LogoutComponent} />
        <Route path={PAGE_URL.LOGIN} component={SignInComponent} />

        <Route path={PAGE_URL.STUDENT_LIST} component={StudentListComponent} />
        <Route path={PAGE_URL.STUDENT_DETAIL} component={StudentDetailComponent} />

        <AuthenticatedRoute path={PAGE_URL.BILLING} exact component={BillingSearchComponent} />

        <AuthenticatedRoute path={PAGE_URL.USER_LIST} exact component={EndUserListComponent} />
        <AuthenticatedRoute path={PAGE_URL.USER_DETAIL} exact component={EndUserDetailComponent} />

        <AuthenticatedRoute path={PAGE_URL.ADDRESS_LIST} exact component={AddressListComponent} />
        <AuthenticatedRoute path={PAGE_URL.ADDRESS_DETAIL} exact component={AddressDetailComponent} />
        <AuthenticatedRoute path={PAGE_URL.USER_ADDRESS_DETAIL} exact component={AddressDetailComponent} />

        <AuthenticatedRoute path={PAGE_URL.CODE_GROUPS_LIST} exact component={CodeGroupsListComponent} />
        <AuthenticatedRoute path={PAGE_URL.CODE_GROUPS_DETAIL} exact component={CodeGroupsDetailComponent} />
        <Route component={ErrorComponent} />
       </Switch>
      </Container>
      <FooterComponent />
     </>
    </Router>
   </div>
  </MuiThemeProvider>
 );
 // }
}

export default AppRouting;