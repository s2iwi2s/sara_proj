
import React, { useEffect } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@material-ui/core';
import { formatter, StyledTableCell, StyledTableHeadCell, StyledTableHeadRow, StyledTableRow } from '../../api/Utils';
import { Alert } from '@material-ui/lab';
import PrintIcon from '@material-ui/icons/Print';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import ReceiptIcon from '@material-ui/icons/Receipt';



export default function SavePayablesConfimationHtml(props) {

 useEffect(() => {
  console.log(`[SavePayablesConfimationHtml.useEffect] confirmStore=>`, props.confirmStore)
 }, [])

 return (<>
  {console.log(`[SavePayablesConfimationHtml.return] confirmStore=>`, props.confirmStore)}
  <Dialog fullWidth="true" maxWidth="md"
   open={props.open}
   onClose={props.closeDialog}
   aria-labelledby="alert-dialog-title"
   aria-describedby="alert-dialog-description"
  >
   <DialogTitle id="alert-dialog-title">{!props.confirmStore.invoiceNo && <Alert severity="info" align="right">{props.title}</Alert>}</DialogTitle>
   <DialogContent>
    <DialogContentText id="alert-dialog-description">
     <Box pb={3}>
      <Paper elevation={3} variant="elevation" >
       <Grid container spacing={3}>
        <Grid item xs={12} sm={2}>Student Name</Grid>
        <Grid item xs={12} sm={4}>{props.confirmStore.entity.firstName + ' ' + props.confirmStore.entity.lastName}</Grid>
        <Grid item xs={12} sm={2}>Level</Grid>
        <Grid item xs={12} sm={4}>{props.confirmStore.entity.level.description}</Grid>

        <Grid item xs={12} sm={2}>Student Id</Grid>
        <Grid item xs={12} sm={10}>{props.confirmStore.entity.studentId}</Grid>
       </Grid>
       {/* <Box display="flex" py={3}>
     <Box component={Paper} elevation={3} variant="elevation" px={3} m="auto">
      <Typography variant="h5">Total amount is {props.confirmStore.total}</Typography>
     </Box>
    </Box> */}
      </Paper>
     </Box>
     <TableContainer component={Paper} elevation={3} variant="elevation">
      <Table>
       <TableHead>
        <StyledTableHeadRow>
         <StyledTableHeadCell variant="head">Payables</StyledTableHeadCell>
         <StyledTableHeadCell variant="head" style={{ width: "20%" }} align="right">Total</StyledTableHeadCell>
         <StyledTableHeadCell variant="head" style={{ width: "20%" }} align="right">Balance</StyledTableHeadCell>
         <StyledTableHeadCell variant="head" style={{ width: "20%" }} align="right">Amount to Pay</StyledTableHeadCell>
        </StyledTableHeadRow>
       </TableHead>
       <TableBody>
        {
         props.confirmStore.payables.map((row, i) => <>
          {row.payment > 0 &&
           <StyledTableRow>
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">{formatter.format(row.amount)}</TableCell>
            <TableCell align="right">{formatter.format(row.balance)}</TableCell>
            <TableCell align="right">{formatter.format(row.payment)}</TableCell>
           </StyledTableRow >
          }
         </>
         )
        }
        < StyledTableRow >
         <TableCell>Remaining balance is {formatter.format(props.confirmStore.totalBalance)}</TableCell>
         <StyledTableCell align="right" colSpan={3}>
          <Typography variant="h5" color="textPrimary">Total amount is {formatter.format(props.confirmStore.total)}</Typography>
         </StyledTableCell>
        </ StyledTableRow>
        {props.confirmStore.invoiceNo && <>
         <StyledTableRow>
          <StyledTableCell align="right" colSpan={1}><Typography variant="h4" color="textPrimary">Invoice No: </Typography></StyledTableCell>
          <StyledTableCell align="left" colSpan={2}>
           <Typography variant="h5" color="textPrimary">{props.confirmStore.invoiceNo}</Typography>

          </StyledTableCell>
          <TableCell align="center">
           <Button variant="contained" color="primary" type="submit" startIcon={<PrintIcon />}>Print Invoice</Button>
          </TableCell>
         </ StyledTableRow>
        </>}
       </TableBody>
      </Table>
     </TableContainer>
    </DialogContentText>
   </DialogContent>
   <DialogActions>
    {props.confirmStore.invoiceNo &&
     <>
      <Button onClick={props.closeDialog} variant="contained" color="primary" startIcon={<CancelIcon />}>Close</Button>
     </>
    }
    {!props.confirmStore.invoiceNo &&
     <>
      <Button onClick={props.closeDialog} variant="contained" color="secondary" startIcon={<CancelIcon />} > Cancel</Button>
      <Button onClick={props.saveDialog} variant="contained" color="primary" autoFocus startIcon={<SaveIcon />} > Save</Button>
     </>
    }
   </DialogActions>
  </Dialog>
 </>);
}
