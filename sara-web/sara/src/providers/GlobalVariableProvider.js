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
        ui: {
            darkMode: false
        }
    })

    const [alertProp, setAlertProp] = useState({
        title: '',
        label: 'Ok',
        open: false,
        severity: 'info',
        msg: '',
        value: {}
    })
    
    const setAlertProps = (prop) => {
        setAlertProp({
            ...alertProp,
            ...prop
        })
    }

    const setUIProps = (prop) => {
        setGlobalProps({
            ...globalProps,
            ui: {
                ...globalProps.ui,
                ...prop
            }
        })
    }

    const value = useMemo(() => [globalProps, setGlobalProps, setAlertProps, setUIProps, alertProp],
        [globalProps, alertProp])
    return <GlobalVariableContext.Provider value={value} {...props} />
}

export { GlobalVariableProvider, useGlobalVariable }

