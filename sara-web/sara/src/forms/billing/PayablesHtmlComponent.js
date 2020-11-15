
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Paper, Grid, TextField, Table, TableContainer, TableHead, TableCell, Divider, Typography, TableBody, Button, InputAdornment } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';

const { StyledTableRow, StyledTableHeadRow, StyledTableHeadCell, INIT_STATUS } = require("../../api/Utils")

const PayablesHtmlComponent = (props) => {
  const { control, register, handleSubmit, error, reset } = useForm();

  const [total, setTotal] = useState(0);
  const [payables, setPayables] = useState({});

  useEffect(() => {
    console.log(`[PayablesHtmlComponent.useEffect] INIT_STATUS=${props.store.INIT_STATUS}, props.store=>`, props.store)
    if (props.store.INIT_STATUS === INIT_STATUS.PAYABLES_RESET) {
      resetPayables();
      props.store.INIT_STATUS = INIT_STATUS.DONE;

      reset(props.store);
    }
  }, [props.store])

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const resetPayables = () => {
    console.log(`[PayablesHtmlComponent.resetPayables] payables=>`, payables);
    setTotal(0);

    let hasNext = true;
    let i = 0;
    let data = {
      ...payables
    }
    while (hasNext) {
      let payment = data[`payables[${i}].payment`];
      if (payment) {
        data[`payables[${i}].payment`] = formatter.format(0);
      } else {
        hasNext = false;
      }
      i++;
    }
    setPayables(data);
  }

  const onPaymentBlur = (e) => {
    const el = e.target
    let value = el.value;
    value = value ? value.replaceAll(',', '') : 0;
    el.value = formatter.format(value);

    console.log(`[PayablesHtmlComponent.onPaymentChange] value=${value}, payables=>`, payables)
    value = el.value;
    value = value ? value.replaceAll(',', '') : 0;
    let numValue = Number(value);
    let data = {
      ...payables,
    };

    data[el.name] = numValue;
    setPayables(data);

    let hasNext = true;
    let i = 0;
    let total = 0;
    while (hasNext) {
      let payment = data[`payables[${i}].payment`];
      if (payment) {
        total = total + payment;
      } else {
        hasNext = false;
      }
      i++;
    }
    setTotal(formatter.format(total));
    console.log(`[onPaymentBlur.onPaymentChange] total=${total}, payables=>`, payables)
  }

  return (
    <>
      <Box py={3}><Divider /></Box>
      <Box pb={3}><Typography variant="h5">Student Information</Typography></Box>
      <Paper elevation={3} variant="elevation" >
        <Box py={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>Student Id</Grid>
            <Grid item xs={12} sm={10}>{props.store.entity.studentId}</Grid>
            <Grid item xs={12} sm={2}>Student Name</Grid>
            <Grid item xs={12} sm={10}>{props.store.entity.firstName + ' ' + props.store.entity.lastName}</Grid>
            <Grid item xs={12} sm={2}>Level</Grid>
            <Grid item xs={12} sm={10}>{props.store.entity.level.description}</Grid>
          </Grid>
        </Box>
      </Paper>
      <Box py={3}><Divider /></Box>
      <Box ><Typography variant="h5">Payables</Typography></Box>
      <form onSubmit={handleSubmit(props.doShowSaveBillingDialog)}>
        <TextField
          type="hidden"
          name="id"
          value={props.store.entity.id}
          inputRef={register}
        />
        <TableContainer component={Paper} elevation={3} variant="elevation" >
          <Table>
            <TableHead>
              <StyledTableHeadRow>
                <StyledTableHeadCell variant="head">Payables</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "20%" }} align="right">Total</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "20%" }} align="right">Paid</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "20%" }} align="right">Balance</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "20%" }} align="right">Amount to Pay</StyledTableHeadCell>
              </StyledTableHeadRow>
            </TableHead>
            <TableBody>
              {
                props.store.studentPayables.payables.map((row, i) => (
                  < StyledTableRow >
                    <TableCell>{row.name}</TableCell>

                    {row.code === 'balance' &&
                      <>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">({row.payment})</TableCell>
                      </>
                    }

                    {row.code !== 'balance' &&
                      <>
                        <TableCell align="right">P{row.amount.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2
                        })}</TableCell>
                        <TableCell align="right">P{row.paid.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2
                        })}</TableCell>
                        <TableCell align="right">P{row.balance.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2
                        }
                        )}</ TableCell>
                        <TableCell align="right">
                          <TextField
                            type="hidden"
                            name={`payables[${i}].student.id`}
                            value={props.store.entity.id}
                            inputRef={register}
                          />
                          <TextField
                            type="hidden"
                            name={`payables[${i}].balance`}
                            value={row.balance}
                            inputRef={register}
                          />
                          <TextField
                            type="hidden"
                            name={`payables[${i}].order`}
                            value={i}
                            inputRef={register}
                          />
                          <TextField
                            type="hidden"
                            name={`payables[${i}].code`}
                            value={row.code}
                            inputRef={register}
                          />
                          <TextField
                            type="hidden"
                            name={`payables[${i}].amount`}
                            value={row.amount}
                            inputRef={register}
                          />
                          <TextField
                            type="hidden"
                            name={`payables[${i}].name`}
                            value={row.name}
                            inputRef={register}
                          />
                          <TextField
                            type="hidden"
                            name={`payables[${i}].paid`}
                            value={row.paid}
                            inputRef={register}
                          />
                          <TextField id={row.code}
                            type="currency"
                            name={`payables[${i}].payment`}
                            onBlur={e => onPaymentBlur(e)}
                            fullWidth
                            inputRef={register}
                            // disabled={row.balance === 0}
                            defaultValue={row.payment}
                            variant="filled"
                            inputStyle={{ textAlign: 'center' }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">P</InputAdornment>,
                            }} />

                        </TableCell>
                      </>}
                  </StyledTableRow>
                ))
              }
              <StyledTableRow>
                <TableCell colSpan="4" align="right">Total</TableCell>
                <TableCell align="right">{total}</TableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box pt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={10}>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Save Payment</Button>
            </Grid>
            {/* <Grid item xs={12} sm={2}>
              <Button variant="contained" color="primary" type="submit" startIcon={<PrintIcon />}>Print Reciept</Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="contained" color="primary" type="submit" startIcon={<PrintIcon />}>Print Invoice</Button>
            </Grid> */}
          </Grid>
        </Box>
      </form>
    </>
  )
}
export default PayablesHtmlComponent;