import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useMessageAlert } from "../../api/useMessageAlert"

export default function GlobalAlertMsgDialog() {

    const useAppMessageAlert = useMessageAlert();

    return (
        <>
            <Dialog fullWidth={true} maxWidth="md"
                open={useAppMessageAlert.props.open}
                onClose={() => useAppMessageAlert.closeMsgAlert()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Alert severity={useAppMessageAlert.props.severity} align="right">
                        <Typography variant="h6">
                            {useAppMessageAlert.props.title}
                        </Typography>
                    </Alert>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {useAppMessageAlert.props.msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => useAppMessageAlert.closeMsgAlert()}>{useAppMessageAlert.props.label}</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}