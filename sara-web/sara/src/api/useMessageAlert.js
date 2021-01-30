
import { useGlobalVariable } from '../providers/GlobalVariableProvider'

const useMessageAlert = () => {

    const [globalProps, , setAlertProps,] = useGlobalVariable();

    const showErrorMsgAlert = (error, errorCode, formMethod, serviceName) => {
        let errMsg = getFormatedErrorMessage(error, errorCode, formMethod, serviceName)
        showMsgAlert('Error', errMsg, 'error')
    }

    const showErrorAlert = (msg) => {
        showMsgAlert('Error', msg, 'error')
    }

    const showInfoAlert = (msg) => {
        showMsgAlert('Information', msg, 'info')
    }

    const showWarningAlert = (msg) => {
        showMsgAlert('Warning', msg, 'warning')
    }

    const showSuccessAlert = (msg) => {
        showMsgAlert('Alert', msg, 'success')
    }

    const showMsgAlert = (title, msg, severity) => {
        setAlertProps({
            title: title,
            open: true,
            severity: severity,
            msg: msg
        })
    }
    const closeMsgAlert = () => {
        setAlertProps({
            open: false
        })
    }

    const getFormatedErrorMessage = (error, errorCode, formMethod, serviceName) => {
        console.error(`[useMessageAlert.getFormatedErrorMessage] error=>`, JSON.stringify(error));
        let errMsg = `Error (${errorCode}): ${error.message} `;
        console.error(`[${formMethod}] ${serviceName} error `, JSON.stringify(error));

        if (error.message) {
            console.error(`[useMessageAlert.getFormatedErrorMessage] error.message=>`, JSON.stringify(error.message));
            errMsg = error.message
        }

        if (error.response) {
            console.error(`[useMessageAlert.getFormatedErrorMessage] error.response=>`, JSON.stringify(error.response));
            // Request made and server responded
            console.log('error.response.data', error.response.data);
            console.log('error.response.status', error.response.status);
            console.log('error.response.headers', error.response.headers);
            if (error.response.data.error && error.response.data.status) {
                errMsg = `[${error.response.data.status}: ${error.response.data.error}] - ${error.response.data.message}`
            } else {
                errMsg = `${error.response.data}`
            }
        }

        console.error(`[${formMethod}] ${serviceName} error msg: ${errMsg}`);
        return errMsg;
    }

    return {
        props: globalProps.alert,
        closeMsgAlert: closeMsgAlert,
        showErrorMsgAlert: showErrorMsgAlert,
        showErrorAlert: showErrorAlert,
        showInfoAlert: showInfoAlert,
        showWarningAlert: showWarningAlert,
        showSuccessAlert: showSuccessAlert
    }
}
export default useMessageAlert