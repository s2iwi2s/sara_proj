import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useMessageAlert } from "../../api/useMessageAlert"

export default function GlobalAlertMsgDialog() {
    const alert = useMessageAlert();

    const closeDialog = () => {
        alert({
            type: 'close'
        })
    }
    return (
        <>
            <Dialog fullWidth={true} maxWidth="md"
                open={alert().open}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><Alert severity={alert().severity} align="right">
                    <Typography variant="h6">
                        {alert().title}
                    </Typography>
                </Alert></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {alert().msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>{alert().label}</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}