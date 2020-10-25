import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorComponent from './api/ErrorComponent'
import HeaderComponent from './forms/common/HeaderComponent'
import FooterComponent from './forms/common/FooterComponent'
import EndUserListComponent from './forms/endUser/EndUserListComponent';
import EndUserDetailComponent from './forms/endUser/EndUserDetailComponent';
import AddressListComponent from './forms/address/AddressListComponent';
import AddressDetailComponent from './forms/address/AddressDetailComponent';

import AuthenticatedRoute from './security/AuthenticatedRoute'
import LoginComponent from './security/LoginComponent'
import LogoutComponent from './security/LogoutComponent'
import CodeGroupsListComponent from './forms/codeGroups/CodeGroupsListComponent';
import CodeGroupsDetailComponent from './forms/codeGroups/CodeGroupsDetailComponent';
import Dashboard from './forms/Dashboard';

class AppRouting extends React.Component {
 render = () => {
  return (
   <div className="AppRouting">
    <Router>
     <>
      <HeaderComponent />
      <div className="container pt-3">
       <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/index.html" exact component={Dashboard} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/logout" component={LogoutComponent} />
        <AuthenticatedRoute path="/end-user-list" exact component={EndUserListComponent} />
        <AuthenticatedRoute path="/end-user-detail/:id" exact component={EndUserDetailComponent} />
        <AuthenticatedRoute path="/address-list" exact component={AddressListComponent} />
        <AuthenticatedRoute path="/address-detail/:id" exact component={AddressDetailComponent} />
        <AuthenticatedRoute path="/address-detail/:id/:endUserId" exact component={AddressDetailComponent} />
        <AuthenticatedRoute path="/code-groups-list" exact component={CodeGroupsListComponent} />
        <AuthenticatedRoute path="/code-groups-detail/:id" exact component={CodeGroupsDetailComponent} />
        <Route component={ErrorComponent} />
       </Switch>
      </div>
      <FooterComponent />
     </>
    </Router>
   </div>
  );
 }
}

export default AppRouting;