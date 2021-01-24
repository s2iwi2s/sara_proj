
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PrintIcon from '@material-ui/icons/Print';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from "react-to-print";

import { formatter, INIT_STATUS, StyledTableCell, StyledTableHeadCell, StyledTableHeadRow, StyledTableRow } from '../../api/Utils';
import { useAuth } from '../../providers/AuthenticationProvider';
import { selectConfirmPayables } from '../../api/billing/BillingSlice';

export default function SavePayablesConfimationHtml(props) {
  const currConfirmPayables = useSelector(selectConfirmPayables)

  const [userObj] = useAuth();
  const { reset } = useForm(currConfirmPayables);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const { status, setStatus } = useState(INIT_STATUS.INIT_STATUS);

  useEffect(() => {
    console.log(`[SavePayablesConfimationHtml.useEffect] confirmStore=>`, currConfirmPayables)
    if (status === INIT_STATUS.RESET) {
      reset(currConfirmPayables);
      setStatus(INIT_STATUS.DONE)
    }
    //currConfirmPayables.INIT_STATUS = INIT_STATUS.DONE;
  }, [status])

  const ConfirmPage = () => {
    return (<>
      {/* <div className={classes.root}>
        <table width="100%" border="0" >
          <tr >
            <th align="right" width="20%">Student Name:</th>
            <th align="left">{currConfirmPayables.entity.firstName + ' ' + currConfirmPayables.entity.lastName}</th>
            <th align="right" width="20%">Invoice Date:</th>
            <th align="left">{currConfirmPayables.invoiceDate}</th>
          </tr>
          <tr >
            <th align="right">Student Id:</th>
            <th align="left">{currConfirmPayables.entity.studentId}</th>
            <th align="right">Level:</th>
            <th align="left">{currConfirmPayables.entity.level.description}</th>
          </tr>
        </table>
      </div> */}
      <Box pb={3}>
        <Paper elevation={3} variant="elevation" >

          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>Student Name</Grid>
            <Grid item xs={12} sm={4}>{currConfirmPayables.entity.firstName + ' ' + currConfirmPayables.entity.lastName}</Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={4}></Grid>

            <Grid item xs={12} sm={2}>Student Id</Grid>
            <Grid item xs={12} sm={4}>{currConfirmPayables.entity.studentId}</Grid>
            <Grid item xs={12} sm={2}>Level</Grid>
            <Grid item xs={12} sm={4}>{currConfirmPayables.entity.level.description}</Grid>
          </Grid>
        </Paper>
      </Box>
      <TableContainer component={Paper} elevation={3} variant="elevation">
        {currConfirmPayables.payables.length > 0 &&
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
              {currConfirmPayables.payables.map((row) => <>
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
                  {currConfirmPayables.balanceTotal > 0 &&
                    <Typography variant="h6" color="textPrimary">Remaining balance is {formatter.format(currConfirmPayables.balanceTotal)}</Typography>
                  }
                </TableCell>
                <StyledTableCell align="right" colSpan={3}>
                  <Typography variant="h5" color="textPrimary">Total amount is {formatter.format(currConfirmPayables.paymentTotal)}</Typography>
                </StyledTableCell>
              </ StyledTableRow>
              {currConfirmPayables.invoiceNo && <>
                <StyledTableRow>
                  <StyledTableCell align="right" colSpan={1}><Typography variant="h4" color="textPrimary">Invoice No: </Typography></StyledTableCell>
                  <StyledTableCell align="left" colSpan={2}>
                    <Typography variant="h5" color="textPrimary">{currConfirmPayables.invoiceNo}</Typography>

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

          {/* <th align="left">{("0000000000" + currConfirmPayables.invoiceNo).slice(-10)}</th> */}
          {/* <tr>
            <th align="left" width="25%">Invoice No:</th>
            <th align="left">{currConfirmPayables.invoiceNo}</th>
            <th align="left" width="25%">Invoice Date:</th>
            <th align="left">{currConfirmPayables.invoiceDate}</th>
          </tr> */}

          <tr>
            <th align="left" width="20%">Student Name:</th>
            <th align="left">{currConfirmPayables.entity.firstName + ' ' + currConfirmPayables.entity.lastName}</th>
            <th align="left" width="20%">Invoice No:</th>
            <th align="left">{currConfirmPayables.invoiceNo}</th>
          </tr>
          <tr>
            <th align="left">Student Id:</th>
            <th align="left">{currConfirmPayables.entity.studentId}</th>
            <th align="left">Invoice Date:</th>
            <th align="left">{currConfirmPayables.invoiceDate}</th>
          </tr>
          <tr>
            <th align="left">Level:</th>
            <th align="left">{currConfirmPayables.entity.level.description}</th>
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
          {currConfirmPayables.payablesByInvoiceNo.map((row) => <>
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
            <td colSpan={4} align="right"><h3>Total Amount Paid: {formatter.format(currConfirmPayables.paymentTotal)}</h3></td>
          </tr>
        </table>
        {/* <Table>
          <TableBody>
            <TableRow>
              <TableCell>Student Name:</TableCell>
              <TableCell>{currConfirmPayables.entity.firstName + ' ' + currConfirmPayables.entity.lastName} </TableCell>
              <TableCell>{currConfirmPayables.invoiceNo && <>Invoice Date:</>}</TableCell>
              <TableCell>{currConfirmPayables.invoiceNo && <>{currConfirmPayables.invoiceDate}</>}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Student Id:</TableCell>
              <TableCell>{currConfirmPayables.entity.studentId}</TableCell>
              <TableCell>Level:</TableCell>
              <TableCell>{currConfirmPayables.entity.level.description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {currConfirmPayables.payablesByInvoiceNo.length > 0 &&
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
              {currConfirmPayables.payablesByInvoiceNo.map((row, i) => <>
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
                  <Typography variant="h4" color="textPrimary">{currConfirmPayables.invoiceNo}</Typography>
                </TableCell>
                <StyledTableCell align="right" colSpan={2}>
                  <Typography variant="h5" color="textPrimary">Total amount paid is {formatter.format(currConfirmPayables.paymentTotal)}</Typography>
                </StyledTableCell>
              </ StyledTableRow>

            </TableBody>
          </Table>
        } */}
      </div>
    </>);
  }
  return (<>
    {console.log(`[SavePayablesConfimationHtml.return] confirmStore=>`, currConfirmPayables)}
    <Dialog fullWidth="true" maxWidth="md"
      open={props.open}
      onClose={props.closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{!currConfirmPayables.invoiceNo && <Alert severity="info" align="right">{props.title}</Alert>}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {!currConfirmPayables.invoiceNo && <ConfirmPage />}
          {currConfirmPayables.invoiceNo && <PrintableInvoicePage />}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {currConfirmPayables.invoiceNo &&
          <>
            <Button className="not-printable" onClick={handlePrint} variant="contained" color="primary" type="submit" startIcon={<PrintIcon />}>Print Invoice</Button>
            <Button className="not-printable" onClick={props.closeDialog} variant="contained" color="secondary" startIcon={<CancelIcon />}>Close</Button>
          </>
        }
        {!currConfirmPayables.invoiceNo &&
          <>
            <Button onClick={props.closeDialog} variant="contained" color="secondary" startIcon={<CancelIcon />} > Cancel</Button>
            <Button onClick={props.saveDialog} variant="contained" color="primary" autoFocus startIcon={<SaveIcon />} > Save</Button>
          </>
        }
      </DialogActions>
    </Dialog>
  </>);
}
