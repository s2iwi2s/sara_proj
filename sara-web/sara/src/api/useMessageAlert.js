
import { useGlobalVariable } from '../providers/GlobalVariableProvider'

export const useMessageAlert = () => {

    // const [globalProps, , setAlertProps, , , , ,] = useGlobalVariable();
    const [globalProps, , setAlertProps] = useGlobalVariable();
    const showErrorMsgAlert = (error, errorCode, formMethod, serviceName) => {
        let errMsg = getFormatedErrorMessage(error, errorCode, formMethod, serviceName)
        showMsgAlert(true, errMsg, 'error')
    }

    const showErrorAlert = (msg) => {
        showMsgAlert(true, msg, 'error')
    }

    const showInfoAlert = (msg) => {
        showMsgAlert(true, msg, 'info')
    }

    const showWarningAlert = (msg) => {
        showMsgAlert(true, msg, 'warning')
    }

    const showSuccessAlert = (msg) => {
        showMsgAlert(true, msg, 'success')
    }

    const showMsgAlert = (open, msg, severity) => {
        setAlertProps({
            open: open,
            severity: severity,
            msg: msg,
        })
    }

    const closeMsgAlert = () => {
        console.log(`[useMessageAlert.closeMsgAlert] 1 globalProps=>`, globalProps)
        setAlertProps({
            open: false
        })

        console.log(`[useMessageAlert.closeMsgAlert] 2 globalProps=>`, globalProps)
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

    return [
        globalProps,
        showErrorAlert,
        showErrorMsgAlert,
        showInfoAlert,
        showWarningAlert,
        showSuccessAlert,
        closeMsgAlert
    ]
}
