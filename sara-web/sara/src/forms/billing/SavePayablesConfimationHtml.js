
import React, { useEffect, useRef } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PrintIcon from '@material-ui/icons/Print';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from "react-to-print";

import { formatter, INIT_STATUS, StyledTableCell, StyledTableHeadCell, StyledTableHeadRow, StyledTableRow } from '../../api/Utils';
import { useAuth } from '../../providers/AuthenticationProvider';

export default function SavePayablesConfimationHtml(props) {
  const [userObj] = useAuth();
  const { reset } = useForm(props.confirmStore);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  useEffect(() => {
    console.log(`[SavePayablesConfimationHtml.useEffect] confirmStore=>`, props.confirmStore)
    if (props.confirmStore.INIT_STATUS === INIT_STATUS.RESET) {
      reset(props.confirmStore);
    }
    props.confirmStore.INIT_STATUS = INIT_STATUS.DONE;
  }, [props.confirmStore])

  const ConfirmPage = () => {
    return (<>
      {/* <div className={classes.root}>
        <table width="100%" border="0" >
          <tr >
            <th align="right" width="20%">Student Name:</th>
            <th align="left">{props.confirmStore.entity.firstName + ' ' + props.confirmStore.entity.lastName}</th>
            <th align="right" width="20%">Invoice Date:</th>
            <th align="left">{props.confirmStore.invoiceDate}</th>
          </tr>
          <tr >
            <th align="right">Student Id:</th>
            <th align="left">{props.confirmStore.entity.studentId}</th>
            <th align="right">Level:</th>
            <th align="left">{props.confirmStore.entity.level.description}</th>
          </tr>
        </table>
      </div> */}
      <Box pb={3}>
        <Paper elevation={3} variant="elevation" >

          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>Student Name</Grid>
            <Grid item xs={12} sm={4}>{props.confirmStore.entity.firstName + ' ' + props.confirmStore.entity.lastName}</Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={4}></Grid>

            <Grid item xs={12} sm={2}>Student Id</Grid>
            <Grid item xs={12} sm={4}>{props.confirmStore.entity.studentId}</Grid>
            <Grid item xs={12} sm={2}>Level</Grid>
            <Grid item xs={12} sm={4}>{props.confirmStore.entity.level.description}</Grid>
          </Grid>
        </Paper>
      </Box>
      <TableContainer component={Paper} elevation={3} variant="elevation">
        {props.confirmStore.payables.length > 0 &&
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
              {props.confirmStore.payables.map((row) => <>
                {row.payment > 0 &&
                  <StyledTableRow>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{formatter.format(row.amount)}</TableCell>
                    <TableCell align="right">{formatter.format(row.balance)}</TableCell>
                    <TableCell align="right">{formatter.format(row.payment)}</TableCell>
                  </StyledTableRow >
                }
              </>
              )}
              < StyledTableRow >
                <TableCell>
                  {props.confirmStore.balanceTotal > 0 &&
                    <Typography variant="h6" color="textPrimary">Remaining balance is {formatter.format(props.confirmStore.balanceTotal)}</Typography>
                  }
                </TableCell>
                <StyledTableCell align="right" colSpan={3}>
                  <Typography variant="h5" color="textPrimary">Total amount is {formatter.format(props.confirmStore.paymentTotal)}</Typography>
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
        }
      </TableContainer>
    </>);
  }

  const PrintableInvoicePage = () => {
    return (<>
      <div ref={componentRef} className="root">
        <table width="100%" border="0">
          <tr>
            <th colSpan={4} align="center">{userObj.schoolName}</th>
          </tr>
          <tr>
            <th colSpan={4} align="center">{userObj.schoolAddress}</th>
          </tr>
          <tr>
            <th colSpan={4} align="center">&nbsp;</th>
          </tr>

          {/* <th align="left">{("0000000000" + props.confirmStore.invoiceNo).slice(-10)}</th> */}
          {/* <tr>
            <th align="left" width="25%">Invoice No:</th>
            <th align="left">{props.confirmStore.invoiceNo}</th>
            <th align="left" width="25%">Invoice Date:</th>
            <th align="left">{props.confirmStore.invoiceDate}</th>
          </tr> */}

          <tr>
            <th align="left" width="20%">Student Name:</th>
            <th align="left">{props.confirmStore.entity.firstName + ' ' + props.confirmStore.entity.lastName}</th>
            <th align="left" width="20%">Invoice No:</th>
            <th align="left">{props.confirmStore.invoiceNo}</th>
          </tr>
          <tr>
            <th align="left">Student Id:</th>
            <th align="left">{props.confirmStore.entity.studentId}</th>
            <th align="left">Invoice Date:</th>
            <th align="left">{props.confirmStore.invoiceDate}</th>
          </tr>
          <tr>
            <th align="left">Level:</th>
            <th align="left">{props.confirmStore.entity.level.description}</th>
            <th align="left"></th>
            <th align="left"></th>
          </tr>
        </table>
        <br />
        <table width="100%" border="0">
          <tr>
            <th></th>
            <th width="25%" align="right">Total</th>
            <th width="25%" align="right">Balance</th>
            <th width="25%" align="right">Amount Paid</th>
          </tr>
          {props.confirmStore.payablesByInvoiceNo.map((row) => <>
            {row.paid != 0 &&
              <tr>
                <td align="left">{row.name}</td>
                <td align="right">{formatter.format(row.amount)}</td>
                <td align="right">{formatter.format(row.balance)}</td>
                <td align="right">{formatter.format(row.paid)}</td>
              </tr>
            }
          </>
          )}
          <tr>
            <td></td>
            <td colSpan={4} align="right"><h3>Total Amount Paid: {formatter.format(props.confirmStore.paymentTotal)}</h3></td>
          </tr>
        </table>
        {/* <Table>
          <TableBody>
            <TableRow>
              <TableCell>Student Name:</TableCell>
              <TableCell>{props.confirmStore.entity.firstName + ' ' + props.confirmStore.entity.lastName} </TableCell>
              <TableCell>{props.confirmStore.invoiceNo && <>Invoice Date:</>}</TableCell>
              <TableCell>{props.confirmStore.invoiceNo && <>{props.confirmStore.invoiceDate}</>}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Student Id:</TableCell>
              <TableCell>{props.confirmStore.entity.studentId}</TableCell>
              <TableCell>Level:</TableCell>
              <TableCell>{props.confirmStore.entity.level.description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {props.confirmStore.payablesByInvoiceNo.length > 0 &&
          <Table>
            <TableHead>
              <StyledTableHeadRow>
                <StyledTableHeadCell variant="head">Invoice</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "20%" }} align="right">Total</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "20%" }} align="right">Balance</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "20%" }} align="right">Amount Paid</StyledTableHeadCell>
              </StyledTableHeadRow>
            </TableHead>
            <TableBody>
              {props.confirmStore.payablesByInvoiceNo.map((row, i) => <>
                {row.paid > 0 &&
                  <StyledTableRow>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{formatter.format(row.amount)}</TableCell>
                    <TableCell align="right">{formatter.format(row.balance)}</TableCell>
                    <TableCell align="right">{formatter.format(row.paid)}</TableCell>
                  </StyledTableRow >
                }
              </>
              )}
              < StyledTableRow >
                <TableCell colSpan={2}>
                  <Typography variant="h5" color="textPrimary">Invoice No: </Typography>
                  <Typography variant="h4" color="textPrimary">{props.confirmStore.invoiceNo}</Typography>
                </TableCell>
                <StyledTableCell align="right" colSpan={2}>
                  <Typography variant="h5" color="textPrimary">Total amount paid is {formatter.format(props.confirmStore.paymentTotal)}</Typography>
                </StyledTableCell>
              </ StyledTableRow>

            </TableBody>
          </Table>
        } */}
      </div>
    </>);
  }
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
          {!props.confirmStore.invoiceNo && <ConfirmPage />}
          {props.confirmStore.invoiceNo && <PrintableInvoicePage />}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.confirmStore.invoiceNo &&
          <>
            <Button className="not-printable" onClick={handlePrint} variant="contained" color="primary" type="submit" startIcon={<PrintIcon />}>Print Invoice</Button>
            <Button className="not-printable" onClick={props.closeDialog} variant="contained" color="secondary" startIcon={<CancelIcon />}>Close</Button>
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
