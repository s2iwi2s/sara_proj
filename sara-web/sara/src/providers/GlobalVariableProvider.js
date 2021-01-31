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
    const USER_TEMP = {
        userName: '',
        userFullName: 'Guest',
        schoolName: 'SARA PROJECT',
        schoolAddress: '',
        schoolLogo: '',
        schoolId: '',
    }
    const [userLogin, setUserLogin] = useState(USER_TEMP)
    const [globalProps, setGlobalProps] = useState({
        ui: {
            darkMode: false
        },
        alert: {
            title: '',
            label: 'Ok',
            open: false,
            severity: 'info',
            msg: '',
            value: {}
        }
    })

    const clearUser = () => {
        setUserLogin(USER_TEMP)
    }

    const setAlertProps = (prop) => {
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

    const value = {
        globalProps: globalProps,
        USER_TEMP: USER_TEMP,
        userLogin: userLogin,
        clearUser: clearUser,
        setUserLogin: setUserLogin,
        setAlertProps: setAlertProps,
        setUIProps: setUIProps
    }
    return <GlobalVariableContext.Provider value={value} {...props} />
}

export { GlobalVariableProvider, useGlobalVariable }

