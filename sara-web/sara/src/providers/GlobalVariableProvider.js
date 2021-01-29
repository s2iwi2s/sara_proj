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
        },
        alert: {
            title: '',
            type: 'OK',
            open: false,
            severity: 'info',
            msg: '',
            value: {}
        }
    })

    const setAlertProps = (prop) => {
        console.log(`[useGlobalVariable.setAlertProps] 1 prop=>`, prop)
        setGlobalProps({
            ...globalProps,
            alert: {
                ...globalProps.alert,
                ...prop
            }
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

    const value = useMemo(() => [globalProps, setGlobalProps, setAlertProps, setUIProps],
        [globalProps])
    return <GlobalVariableContext.Provider value={value} {...props} />
}

export { GlobalVariableProvider, useGlobalVariable }

