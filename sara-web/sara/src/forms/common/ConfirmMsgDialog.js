import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { OPTIONS } from '../../api/Utils';

export default function ConfirmMsgDialog(props) {
    const { open, closeDialog, title, msg, type = OPTIONS.YESNO } = props

    const setReturnValue = (value) => {
        props.closeDialog();
        props.setDialogSelection(value)
    }

    return (
        <>
            {console.log(`[ConfirmMsgDialog.return] type=${type}`)}
            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">
                    <Alert severity="info" align="right">
                        <Typography variant="h6">
                            {title}
                        </Typography>
                    </Alert>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {msg}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    {type === OPTIONS.YESNO && <>
                        <Button onClick={() => setReturnValue(OPTIONS.YES)}>{OPTIONS.YES}</Button>
                        <Button onClick={() => setReturnValue(OPTIONS.NO)}>{OPTIONS.NO}</Button>
                    </>}
                    {type === OPTIONS.OKCANCEL && <>
                        <Button onClick={() => setReturnValue(OPTIONS.OK)}>{OPTIONS.OK}</Button>
                        <Button onClick={() => setReturnValue(OPTIONS.CANCEL)}>{OPTIONS.CANCEL}</Button>
                    </>}
                </DialogActions>

            </Dialog>
        </>
    );
}