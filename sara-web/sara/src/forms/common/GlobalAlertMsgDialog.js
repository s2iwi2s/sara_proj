import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useMessageAlert from "../../api/useMessageAlert"

export default function GlobalAlertMsgDialog() {

    const { props, closeMsgAlert } = useMessageAlert();

    return (
        <>
            {/* <Dialog fullWidth={true} maxWidth="md" */}
            <Dialog
                open={props.open}
                onClose={() => closeMsgAlert()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Alert severity={props.severity} align="right">
                        <Typography variant="h6">
                            {props.title}
                        </Typography>
                    </Alert>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeMsgAlert()}>{props.label}</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}