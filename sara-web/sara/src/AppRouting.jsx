import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { CssBaseline } from '@material-ui/core';

import { PAGE_URL } from './api/Utils';

import ErrorComponent from './api/ErrorComponent'
import FooterComponent from './forms/common/FooterComponent'

import EndUserListComponent from './forms/endUser/EndUserListComponent';
import EndUserDetailComponent from './forms/endUser/EndUserDetailComponent';

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
import BillingComponent from './forms/billing/BillingComponent';
import AccountPayablesSettingsListComponent from './forms/accountPayables/AccountPayablesSettingsListComponent';
import AccountPayablesSettingsDetailComponent from './forms/accountPayables/AccountPayablesSettingsDetailComponent';
import GradeLevelPayablesListComponent from './forms/gradeLevelPayables/GradeLevelPayablesListComponent';
import GradeLevelPayablesDetailsComponent from './forms/gradeLevelPayables/GradeLevelPayablesDetailsComponent';
import GlobalAlertMsgDialog from './forms/common/GlobalAlertMsgDialog';
import ClosePeriodComponent from './forms/closePeriod/ClosePeriodComponent';

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

}));

const AppRouting = () => {
 const classes = useStylesRouting();

 return (
  <>
   <CssBaseline />
   <Router>
    <div className={classes.root}>

     <AppBarComponent />

     <main className={classes.content}>

      {/* to display content below the toolbar */}
      <div className={classes.toolbar} />

      <GlobalAlertMsgDialog />

      <Switch>
       <Route path={PAGE_URL.ROOT} exact component={Dashboard} />
       <Route path={PAGE_URL.INDEX} exact component={Dashboard} />

       <Route path={PAGE_URL.LOGOUT} component={LogoutComponent} />
       <Route path={PAGE_URL.LOGIN} component={SignInComponent} />

       <AuthenticatedRoute path={PAGE_URL.STUDENT_LIST} component={StudentListComponent} />
       <AuthenticatedRoute path={PAGE_URL.STUDENT_DETAIL} component={StudentDetailComponent} />
       <AuthenticatedRoute path={PAGE_URL.STUDENT_DETAIL_URL} component={StudentDetailComponent} />

       <AuthenticatedRoute path={PAGE_URL.BILLING_PAYABLES} exact component={BillingComponent} />
       <AuthenticatedRoute path={PAGE_URL.BILLING} exact component={BillingComponent} />

       <AuthenticatedRoute path={PAGE_URL.USER_LIST} exact component={EndUserListComponent} />
       <AuthenticatedRoute path={PAGE_URL.USER_DETAIL} exact component={EndUserDetailComponent} />
       <AuthenticatedRoute path={PAGE_URL.USER_DETAIL_URL} exact component={EndUserDetailComponent} />

       <AuthenticatedRoute path={PAGE_URL.CODE_GROUPS_LIST} exact component={CodeGroupsListComponent} />
       <AuthenticatedRoute path={PAGE_URL.CODE_GROUPS_DETAIL} exact component={CodeGroupsDetailComponent} />
       <AuthenticatedRoute path={PAGE_URL.CODE_GROUPS_DETAIL_URL} exact component={CodeGroupsDetailComponent} />

       <AuthenticatedRoute path={PAGE_URL.SCHOOL_LIST} exact component={SchoolListComponent} />
       <AuthenticatedRoute path={PAGE_URL.SCHOOL_DETAIL} exact component={SchoolDetailComponent} />
       <AuthenticatedRoute path={PAGE_URL.SCHOOL_DETAIL_URL} exact component={SchoolDetailComponent} />

       <AuthenticatedRoute path={PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_LIST} exact component={AccountPayablesSettingsListComponent} />
       <AuthenticatedRoute path={PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_DETAIL} exact component={AccountPayablesSettingsDetailComponent} />
       <AuthenticatedRoute path={PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_DETAIL_URL} exact component={AccountPayablesSettingsDetailComponent} />

       <AuthenticatedRoute path={PAGE_URL.GRADE_LEVEL_PAYABLES_LIST} exact component={GradeLevelPayablesListComponent} />
       <AuthenticatedRoute path={PAGE_URL.GRADE_LEVEL_PAYABLES_DETAIL} exact component={GradeLevelPayablesDetailsComponent} />
       <AuthenticatedRoute path={PAGE_URL.GRADE_LEVEL_PAYABLES_DETAIL_URL} exact component={GradeLevelPayablesDetailsComponent} />
       <AuthenticatedRoute path={PAGE_URL.CLOSE_PERIOD_DETAIL_URL} exact component={ClosePeriodComponent} />


       <Route component={ErrorComponent} />
      </Switch>

      <FooterComponent />
     </main>
    </div>
   </Router>
  </>
 );

}

export default AppRouting;