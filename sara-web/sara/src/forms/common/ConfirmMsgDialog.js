import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { OPTIONS } from '../../api/Utils';

export default function ConfirmMsgDialog(props) {
    const setReturnValue = (value) => {
        props.closeDialog();
        props.setDialogSelection(value)
    }

    return (
        <>
            <Dialog fullWidth={true} maxWidth="md"
                open={props.open}
                onClose={props.closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">
                    <Alert severity="info" align="right">
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
                    <Button onClick={() => setReturnValue(OPTIONS.YES)}>YES</Button>
                    <Button onClick={() => setReturnValue(OPTIONS.NO)}>NO</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}