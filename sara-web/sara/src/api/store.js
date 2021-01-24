import { configureStore } from '@reduxjs/toolkit';
import SchoolReducer from './school/SchoolSlice';
import CodeGroupsReducer from './codeGroups/CodeGroupsSlice';
import UsersReducer from './endUser/UsersSlice';
import StudentReducer from './student/StudentSlice';
import GradeLevelReducer from './gradeLevelPayables/GradeLevelSlice';
import AccountPayablesSettingsReducer from './accountPayablesSettings/AccountPayablesSettingsSlice';
import BillingReducer from './billing/BillingSlice';

export default configureStore({
    reducer: {
        school: SchoolReducer,
        codeGroups: CodeGroupsReducer,
        users: UsersReducer,
        students: StudentReducer,
        gradeLevels: GradeLevelReducer,
        accountPayablesSettings: AccountPayablesSettingsReducer,
        billing: BillingReducer
    },
});