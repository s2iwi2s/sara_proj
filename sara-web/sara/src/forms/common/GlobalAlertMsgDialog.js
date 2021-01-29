import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useMessageAlert } from "../../api/useMessageAlert"

export default function GlobalAlertMsgDialog() {
    const [
        globalProps,
        ,
        ,
        ,
        ,
        ,
        closeMsgAlert,
        ,
        callback] = useMessageAlert();

    const setReturnValue = value => {
        console.log(`[GlobalAlertMsgDialog.setReturnValue] callback=${typeof callback}`);
        callback(value)
        closeMsgAlert()
    }
    return (
        <>
            <Dialog fullWidth={true} maxWidth="md"
                open={globalProps.alert.open}
                onClose={closeMsgAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><Alert severity={globalProps.alert.severity} align="right">
                    <Typography variant="h6">
                        {globalProps.alert.title}
                    </Typography>
                </Alert></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {globalProps.alert.msg}
                    </DialogContentText>
                </DialogContent>
                {globalProps.alert.type === 'OK' && <DialogActions>
                    <Button onClick={closeMsgAlert}>Ok</Button>
                </DialogActions>}
                {globalProps.alert.type === 'YESNO' && <DialogActions>
                    <Button onClick={() => setReturnValue('YES')}>YES</Button>
                    <Button onClick={() => setReturnValue('NO')}>NO</Button>
                </DialogActions>}

            </Dialog>
        </>
    );
}