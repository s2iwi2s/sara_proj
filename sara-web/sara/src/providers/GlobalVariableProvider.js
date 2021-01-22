import { createContext, useContext, useMemo, useState } from 'react';

const GlobalVariableContext = createContext();

function useGlobalVariable() {
    const context = useContext(GlobalVariableContext)
    if (!context) {
        throw new Error(`useGlobalVariable must be used within an GlobalVariableProvider`)
    }
    return context;
}

function GlobalVariableProvider(props) {
const [globalProps, setGlobalProps] = useState({
    alert: {
        open: false,
        severity: 'info',
        msg: ''
    }
});

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
    setGlobalProps({
        ...globalProps,
        alert: {
            open: open,
            msg: msg,
            severity: severity
        }
    })
}

const closeMsgAlert = () => {
    setGlobalProps({
        ...globalProps,
        alert: {
            ...globalProps.alert,
            open: false
        }
    })
}

 const value = useMemo(() => [globalProps, setGlobalProps, showErrorAlert, showInfoAlert, showWarningAlert, showSuccessAlert, closeMsgAlert], 
    [globalProps, showErrorAlert, showInfoAlert, showWarningAlert, showSuccessAlert, closeMsgAlert])
 return <GlobalVariableContext.Provider value={value} {...props} />
}

export { GlobalVariableProvider, useGlobalVariable }

