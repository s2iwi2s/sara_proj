
import { TableCell, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


export const INIT_STATUS = {
    INIT: 'INIT',
    DONE: 'DONE',
    LOAD: 'LOAD',
    RESET: 'RESET',
    PAYABLES: 'PAYABLES',
    PAYABLES_RESET: 'PAYABLES_RESET'
}

export const defaultPageable = {
    INIT_STATUS: INIT_STATUS.INIT,
    list: [],
    searchValue: '',
    paging: {
        rowsPerPage: 25,
        totalElements: 0,
        currentPage: 0,
        totalPage: 0
    }
}


export const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const USER_TEMP = {
    userName: '',
    userFullName: 'Guest',
    schoolName: 'SARA PROJECT',
    schoolAddress: '',
    schoolLogo: '',
    schoolId: '',
}
// export const URL_BASE = 'http://localhost:8081';
export const URL_BASE_DEV = 'http://localhost:5000';
export const URL_BASE = process.env.NODE_ENV === 'development' ? URL_BASE_DEV : '';
export const AUTH_URL_BASE = URL_BASE + '/auth';
export const API_URL_BASE = URL_BASE + '/api/';

export const URL_LIST = "/l";
export const URL_DELETE = "/d";
export const URL_DETAILS = "/g";
export const URL_OPTIONS = "/o";
export const URL_SAVE = "/s";

export const AUTH_USER = 'auth/setUser';
export const AUTH_USER_OBJ = 'auth/setUserObj';
export const JWT_TOKEN = 'auth/setToken';

export const UPDATE_ERROR = 'Error: Unable to update. Please contact system administrator.';
export const REQUIRED_DESCRIPTION = 'Description is required';
export const REQUIRED_5_DESCRIPTION = 'Description should be atleast 5 characters';
export const REQUIRED_TARGET_DATE = 'Target date is required';
export const THEME = {
    DARK_MODE: 'dark',
    LIGHT_MODE: 'light',
    THEME_STORAGE_NAME: 'THEME_DARK_MODE'
}
export const PAGE_URL = {
    LOGO_URL: '/r/logo/',
    ROOT: '/',
    INDEX: '/index.html',
    DASHBOARD: '/dashboard',
    LOGOUT: '/logout',
    LOGIN: '/login',
    GRADE_LEVEL_PAYABLES_LIST: '/ui/grade-level-payables-list',
    GRADE_LEVEL_PAYABLES_DETAIL: '/ui/grade-level-payables-detail/:id',
    GRADE_LEVEL_PAYABLES_DETAIL_URL: '/ui/grade-level-payables-detail',
    ACCOUNT_PAYABLES_SETTINGS_LIST: '/ui/account-payables-settings-list',
    ACCOUNT_PAYABLES_SETTINGS_DETAIL: '/ui/account-payables-settings-detail/:id',
    ACCOUNT_PAYABLES_SETTINGS_DETAIL_URL: '/ui/account-payables-settings-detail',
    SCHOOL_LIST: '/ui/school-list',
    SCHOOL_DETAIL: '/ui/school-detail/:id',
    SCHOOL_DETAIL_URL: '/ui/school-detail',
    STUDENT_LIST: '/ui/student-list',
    STUDENT_DETAIL: '/ui/student-detail/:id',
    STUDENT_DETAIL_URL: '/ui/student-detail',
    BILLING: '/ui/billing',
    BILLING_PAYABLES: '/ui/billing/:id',
    BILLING_PAYABLES_URL: '/ui/billing',
    USER_LIST: '/ui/user-list',
    USER_DETAIL: '/ui/user-detail/:id',
    USER_DETAIL_URL: '/ui/user-detail',
    CODE_GROUPS_DETAIL: '/ui/code-groups-detail/:id',
    CODE_GROUPS_DETAIL_URL: '/ui/code-groups-detail',
    CODE_GROUPS_LIST: '/ui/code-groups-list',
    ADDRESS_LIST: '/ui/address-list',
    ADDRESS_DETAIL: '/ui/address-detail/:id',
    USER_ADDRESS_DETAIL: '/ui/address-detail/:id/:refId/:typeId'
}
export const ERROR_CODE = {
    LOGIN_ERROR: '100000',
    RETRIEVE_ERROR: '100001',
    SAVE_ERROR: '100002',
    DELETE_ERROR: '100003',
    LIST_ERROR: '100004'
}

export const ADDRESS_TYPE = {
    USER: '1',
    STUDENT: '2',
    PARENT: '3'
}
export const StyledTableHeadRow = withStyles((theme) => ({
    root: {
        fontWeight: "bold",
        // '&:nth-of-type(odd)': {
        //     backgroundColor: theme.palette.background,
        // },
    },
    head: {
        // backgroundColor: theme.palette.common.black,
        // color: theme.palette.common.white,
    },
    // body: {
    //     fontSize: 14,
    //     fontWeight: "bold",
    // },
}))(TableRow);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        }
    },
}))(TableRow);

export const StyledTableHeadCell = withStyles((theme) => ({
    head: {
        fontWeight: "bold",
        fontStyle: "bold",
        fontSize: 16,
        //     backgroundColor: theme.palette.common.black,
        //     color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);


export const StyledTableCell = withStyles((theme) => ({
    head: {
        fontWeight: "bold",
        fontStyle: "bold",
        fontSize: 14,
        //     backgroundColor: theme.palette.common.black,
        //     color: theme.palette.common.white,
    },
    body: {
        fontWeight: "bold",
        fontStyle: "bold",
        fontSize: 20,
    },
}))(TableCell);


class Utils {

    getFormatedErrorMessage = (error, errorCode, formMethod, serviceName) => {
        let errMsg = `Error (${errorCode}): ${error.message} `;
        console.error(`[${formMethod}] ${serviceName} error msg: ${errMsg}`, error);
        console.error(`[${formMethod}] ${serviceName} error `, JSON.stringify(error));

        if (error.message) {
            errMsg = error.message
        }

        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            errMsg = `${error.response.data}`
        }

        return errMsg;
    }
    urlListPattern = (entity) => API_URL_BASE + entity + URL_LIST
    urlDeletePattern = (entity) => API_URL_BASE + entity + URL_DELETE
    urlDetailsPattern = (entity) => API_URL_BASE + entity + URL_DETAILS
    urlOptionsPattern = (entity) => API_URL_BASE + entity + URL_OPTIONS
    urlSavePattern = (entity) => API_URL_BASE + entity + URL_SAVE
}

export default new Utils();