import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import { Container, CssBaseline } from '@material-ui/core';
import AppBarComponent from './forms/common/AppBarComponent';
import StudentDetailComponent from './forms/student/StudentDetailComponent';
import StudentListComponent from './forms/student/StudentListComponent';

import { useStyles } from './forms/common/CSS'

const AppRouting = props => {
 // class AppRouting extends React.Component {


 // render = () => {
 const classes = useStyles();

 return (
  <div className="AppRouting">
   <Router>
    <>
     <AppBarComponent />

     <Container component="main" className={classes.container}>
      <CssBaseline />
      <Switch>
       <Route path="/" exact component={Dashboard} />
       <Route path="/index.html" exact component={Dashboard} />

       <Route path="/dashboard" component={Dashboard} />
       <Route path="/logout" component={LogoutComponent} />
       <Route path="/login" component={SignInComponent} />
       <Route path="/student-detail/:id" component={StudentDetailComponent} />
       <Route path="/student-list" component={StudentListComponent} />

       <AuthenticatedRoute path="/end-user-list" exact component={EndUserListComponent} />
       <AuthenticatedRoute path="/end-user-detail/:id" exact component={EndUserDetailComponent} />
       <AuthenticatedRoute path="/address-list" exact component={AddressListComponent} />
       <AuthenticatedRoute path="/address-detail/:id" exact component={AddressDetailComponent} />
       <AuthenticatedRoute path="/address-detail/:id/:userId" exact component={AddressDetailComponent} />
       <AuthenticatedRoute path="/code-groups-list" exact component={CodeGroupsListComponent} />
       <AuthenticatedRoute path="/code-groups-detail/:id" exact component={CodeGroupsDetailComponent} />
       <Route component={ErrorComponent} />
      </Switch>
     </Container>
     <FooterComponent />
    </>
   </Router>
  </div>
 );
 // }
}

export default AppRouting;