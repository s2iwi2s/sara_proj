import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


export default function SaveBillingDialog(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog fullWidth="true" maxWidth="md"
                open={props.open}
                onClose={props.closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Please confirm and click save</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeDialog} >
                        Cancel
          </Button>
                    <Button onClick={props.saveDialog} autoFocus>
                        Save
          </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}