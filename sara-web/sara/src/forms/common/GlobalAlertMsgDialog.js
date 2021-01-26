import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useGlobalVariable } from "../../providers/GlobalVariableProvider"

export default function GlobalAlertMsgDialog(props) {
    const [globalProps, setGlobalProps] = useGlobalVariable();

    const handleClose = () => {
        setGlobalProps({
            ...globalProps,
            alert: {
                ...globalProps.alert,
                open: false
            }
        })
    };

    return (
        <>
            <Dialog fullWidth="true" maxWidth="md"
                open={globalProps.alert.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><Alert severity={globalProps.alert.severity} align="right">
                    <Typography variant="h6">
                        {globalProps.alert.severity === 'error' && 'Error'}
                        {globalProps.alert.severity === 'info' && 'Alert'}
                        {globalProps.alert.severity === 'warning' && 'Warning'}
                        {globalProps.alert.severity === 'success' && 'Success'}
                    </Typography>
                </Alert></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {globalProps.alert.msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}