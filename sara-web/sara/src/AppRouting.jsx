import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { Container, CssBaseline } from '@material-ui/core';

import { PAGE_URL, INIT_STATUS, THEME } from './api/Utils';
import { useStyles } from './forms/common/CSS'
import { useAuth } from './security/AuthenticationProvider';

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
import Dashboard from './forms/dashboard/Dashboard';
import AppBarComponent from './forms/common/AppBarComponent';
import StudentDetailComponent from './forms/student/StudentDetailComponent';
import StudentListComponent from './forms/student/StudentListComponent';
import SchoolDetailComponent from './forms/school/SchoolDetailComponent';
import SchoolListComponent from './forms/school/SchoolListComponent';

import AuthenticationService from './security/AuthenticationService';
import BillingComponent from './forms/billing/BillingComponent';

import AccountPayablesSettingsListComponent from './forms/accountPayables/AccountPayablesSettingsListComponent';
import AccountPayablesSettingsDetailComponent from './forms/accountPayables/AccountPayablesSettingsDetailComponent';

import GradeLevelPayablesListComponent from './forms/gradeLevelPayables/GradeLevelPayablesListComponent';
import GradeLevelPayablesDetailsComponent from './forms/gradeLevelPayables/GradeLevelPayablesDetailsComponent';

const useStylesRouting = makeStyles((theme) => ({
 root: {
  display: 'flex',
 },
 toolbar: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
 },
 content: {
  flexGrow: 1,
  padding: theme.spacing(3),
 },
 container: {
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
 },
 // content: {
 //  backgroundColor:
 //   theme.palette.mode === 'light'
 //    ? theme.palette.grey[100]
 //    : theme.palette.grey[900],
 //  flexGrow: 1,
 //  height: '100vh',
 //  overflow: 'auto',
 // },
}));

const AppRouting = () => {

 const [store, setStore] = useState({ 'INIT_STATUS': INIT_STATUS.INIT_STATUS });
 const [userObj, setUserObj] = useAuth();

 useEffect(() => {
  console.log(`[AuthenticationService.useEffect] userObj=>`, userObj)
  if (store.INIT_STATUS === INIT_STATUS.INIT_STATUS) {
   //initialize theme
   initTheme();

   //initialize user
   setUserObj(AuthenticationService.getLoggedUserObj());

   // update INIT_STATUS to DONE to prevent inifinite loop
   setStore({
    INIT_STATUS: INIT_STATUS.DONE
   });
  }
 });
 const initTheme = () => {
  const themeDarkMode = localStorage.getItem(THEME.THEME_STORAGE_NAME);
  console.log(`[AuthenticationService.useEffect] themeDarkMode=${themeDarkMode}, userObj=>`, userObj)

  setDarkMode(themeDarkMode === 'Y' ? true : false);
 }

 const [darkMode, setDarkMode] = useState(false);

 const theme = createMuiTheme({
  palette: {
   type: darkMode ? THEME.DARK_MODE : THEME.LIGHT_MODE,
  },
 });
 const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  localStorage.setItem(THEME.THEME_STORAGE_NAME, !darkMode ? 'Y' : 'N');
 }

 // render = () => {
 const classes = useStylesRouting();

 return (
  <div className="">
   <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
     <div className={classes.root}>

      <AppBarComponent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className={classes.content}>
       <div className={classes.toolbar} />
       {/* <Container component="main" className={classes.container}> */}
       <Switch>
        <Route path={PAGE_URL.ROOT} exact component={Dashboard} />
        <Route path={PAGE_URL.INDEX} exact component={Dashboard} />

        <Route path={PAGE_URL.LOGOUT} component={LogoutComponent} />
        <Route path={PAGE_URL.LOGIN} component={SignInComponent} />

        <Route path={PAGE_URL.STUDENT_LIST} component={StudentListComponent} />
        <Route path={PAGE_URL.STUDENT_DETAIL} component={StudentDetailComponent} />

        <AuthenticatedRoute path={PAGE_URL.BILLING_PAYABLES} exact component={BillingComponent} />
        <AuthenticatedRoute path={PAGE_URL.BILLING} exact component={BillingComponent} />

        <AuthenticatedRoute path={PAGE_URL.USER_LIST} exact component={EndUserListComponent} />
        <AuthenticatedRoute path={PAGE_URL.USER_DETAIL} exact component={EndUserDetailComponent} />

        <AuthenticatedRoute path={PAGE_URL.ADDRESS_LIST} exact component={AddressListComponent} />
        <AuthenticatedRoute path={PAGE_URL.ADDRESS_DETAIL} exact component={AddressDetailComponent} />
        <AuthenticatedRoute path={PAGE_URL.USER_ADDRESS_DETAIL} exact component={AddressDetailComponent} />

        <AuthenticatedRoute path={PAGE_URL.CODE_GROUPS_LIST} exact component={CodeGroupsListComponent} />
        <AuthenticatedRoute path={PAGE_URL.CODE_GROUPS_DETAIL} exact component={CodeGroupsDetailComponent} />

        <AuthenticatedRoute path={PAGE_URL.SCHOOL_LIST} exact component={SchoolListComponent} />
        <AuthenticatedRoute path={PAGE_URL.SCHOOL_DETAIL} exact component={SchoolDetailComponent} />

        <AuthenticatedRoute path={PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_LIST} exact component={AccountPayablesSettingsListComponent} />
        <AuthenticatedRoute path={PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_DETAIL} exact component={AccountPayablesSettingsDetailComponent} />

        <AuthenticatedRoute path={PAGE_URL.GRADE_LEVEL_PAYABLES_LIST} exact component={GradeLevelPayablesListComponent} />
        <AuthenticatedRoute path={PAGE_URL.GRADE_LEVEL_PAYABLES_DETAIL} exact component={GradeLevelPayablesDetailsComponent} />

        <Route component={ErrorComponent} />
       </Switch>
       {/* </Container> */}
       <FooterComponent />
      </main>
     </div>
    </Router>
   </MuiThemeProvider>
  </div>
 );
 // }
}

export default AppRouting;