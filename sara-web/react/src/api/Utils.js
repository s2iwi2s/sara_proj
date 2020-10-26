
// export const URL_BASE = 'http://localhost:8081';
export const URL_BASE_DEV = 'http://localhost:5000';
export const URL_BASE = process.env.NODE_ENV === 'development' ? URL_BASE_DEV : '';
export const AUTH_URL_BASE = URL_BASE + '/auth';
export const API_URL_BASE = URL_BASE + '/api/';


export const URL_LIST = "/l";
export const URL_DELETE = "/d";
export const URL_DETAILS = "/g";
export const URL_SAVE = "/s";

export const AUTH_USER = 'auth/setUser';
export const JWT_TOKEN = 'auth/setToken';

export const UPDATE_ERROR = 'Error: Unable to update. Please contact system administrator.';
export const REQUIRED_DESCRIPTION = 'Description is required';
export const REQUIRED_5_DESCRIPTION = 'Description should be atleast 5 characters';
export const REQUIRED_TARGET_DATE = 'Target date is required';

class Utils {
    urlListPattern = (entity) => {
        return API_URL_BASE + entity + URL_LIST;
    }
    urlDeletePattern = (entity) => {
        return API_URL_BASE + entity + URL_DELETE;
    }
    urlDetailsPattern = (entity) => {
        return API_URL_BASE + entity + URL_DETAILS;
    }
    urlSavePattern = (entity) => {
        return API_URL_BASE + entity + URL_SAVE;
    }
    handleErrorResponse = (error, comp) => {
        const errStr = JSON.stringify(error);
        console.error(`Utils[][${comp}][ERROR] ${errStr}`)
        if (error.status) {
            //{"timestamp":"2020-08-24T23:57:30.853+00:00","status":401,"error":"Unauthorized","message":"Unauthorized","path":"/users/test/todos"}
            console.error(`[Utils][${comp}][ERROR] ${error.status}: ${error.message}`)
        } else {
            console.error(`[Utils][${comp}][ERROR] ${error.name}: ${error.message}`)
            console.error(`[Utils][${comp}][ERROR] stack ${error.stack}`)
        }

        //const errorMessage = `${error.name}: ${error.message}`;
        //this.handleState('', errorMessage);
        //console.error(error);
    }
}

export default new Utils();