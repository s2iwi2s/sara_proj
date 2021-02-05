
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { Box, Paper, Grid, TextField, Table, TableContainer, TableHead, TableCell, TableBody, Button, InputAdornment } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save'
import SubTitleComponent from '../common/SubTitleComponent'
import SelectGrid from '../common/SelectGrid'

const { StyledTableRow, StyledTableHeadRow, StyledTableHeadCell, INIT_STATUS } = require("../../api/Utils")


const PayablesHtmlComponent = (props) => {
  const { register, handleSubmit, reset } = useForm()

  const [total, setTotal] = useState(0)
  const [payables, setPayables] = useState({})
  const [currentState, setCurrentState] = useState({
    period: {
      id: props.store.periodId
    }
  })

  const changeSelectState = (e) => {
    const { name, value } = e.target
    console.log(`[PayablesHtmlComponent.changeSelectState] name=${name}, value=${value}`)
    setCurrentState({
      [name]: { id: value }
    })
    console.log(`[PayablesHtmlComponent.changeSelectState] currentState=>`, currentState)
  }


  const changeSelectStateByPeriod = (e) => {
    changeSelectState(e)
    const { value } = e.target
    // props.doUpdateCurrPageable({
    //   ...props.store.studentPayables,
    //   studentPayables: {
    //     payables: []
    //   },
    //   searchFlag: true,
    //   payablesFlag: false,
    // })
    props.doPayables(props.store.entity.id, value)
  }


  useEffect(() => {
    console.log(`[PayablesHtmlComponent.useEffect] INIT_STATUS=${props.store.INIT_STATUS}, props.store=>`, props.store)
    console.log(`[PayablesHtmlComponent.useEffect] currentState => `, currentState)
    console.log(`[PayablesHtmlComponent.useEffect] props.store.periodId => `, props.store.periodId)
    if (props.store.INIT_STATUS === INIT_STATUS.PAYABLES_RESET) {
      resetPayables();
      props.doUpdateCurrPageable({
        INIT_STATUS: INIT_STATUS.DONE
      })
      // setCurrentState({
      //   period: { id: props.store.periodId }
      // })

      reset(props.store);
    }
  }, [props.store])

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const resetPayables = () => {
    console.log(`[PayablesHtmlComponent.resetPayables] payables => `, payables);
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

    console.log(`[PayablesHtmlComponent.onPaymentBlur] value = ${value}, payables => `, payables)
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
    console.log(`[PayablesHtmlComponent.onPaymentBlur] total = ${total}, payables => `, payables)
  }

  return (
    <>
      {console.log(`[PayablesHtmlComponent.return] props.store => `, props.store)}
      <SubTitleComponent>Student Information</SubTitleComponent>
      <Paper elevation={3} variant="elevation" >
        <Box py={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>LRN</Grid>
            <Grid item xs={12} sm={10}>{props.store.entity.lrn}</Grid>
            <Grid item xs={12} sm={2}>Student Name</Grid>
            <Grid item xs={12} sm={10}>{props.store.entity.firstName + ' ' + props.store.entity.lastName}</Grid>
            <Grid item xs={12} sm={2}>Level</Grid>
            <Grid item xs={12} sm={10}>{props.store.entity.level.description}</Grid>
          </Grid>
        </Box>
      </Paper>
      <SubTitleComponent>Old Accounts</SubTitleComponent>
      <TableContainer component={Paper} elevation={3} variant="elevation" >
        <Table>
          <TableHead>
            <StyledTableHeadRow>
              <StyledTableHeadCell key={0} variant="head" style={{ width: "10%" }}>Total: P{props.store.paymentBalance.totalBalance.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })}</StyledTableHeadCell>
              {
                props.store.paymentBalance.balances.map(({ id, name, balance }) => (
                  <StyledTableHeadCell key={id} variant="head" align="right" style={{ width: "20%" }}>{name}: P{balance.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })}</StyledTableHeadCell>
                ))
              }
              <StyledTableHeadCell></StyledTableHeadCell>
            </StyledTableHeadRow>
          </TableHead>
          <TableBody>

          </TableBody>
        </Table>
      </TableContainer>
      <form onSubmit={handleSubmit(props.doShowSaveBillingDialog)}>
        <TextField
          type="hidden"
          name="id"
          value={props.store.entity.id}
          inputRef={register}
        />
        <SubTitleComponent>Payables</SubTitleComponent>
        <Box py={3} px={3}>
          <Grid container spacing={3}>
            <SelectGrid sm={3} required name="period" label="Period"
              value={currentState.period.id}
              options={props.store.optionsList.periodList}
              onChange={e => changeSelectStateByPeriod(e)} />
          </Grid>
        </Box>
        <TableContainer component={Paper} elevation={3} variant="elevation" >
          <Table>
            <TableHead>
              <StyledTableHeadRow>
                <StyledTableHeadCell variant="head" style={{ width: "10%" }} >Payables</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "10%" }} align="right">Total</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "10%" }} align="right">Paid</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "10%" }} align="right">Balance</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" >Amount to Pay</StyledTableHeadCell>
              </StyledTableHeadRow>
            </TableHead>
            <TableBody>
              {
                props.store.studentPayables.payables.map((row, i) => (
                  < StyledTableRow key={row.id}>
                    <TableCell>{row.aps ? row.aps.label : row.name}</TableCell>

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
              <Button fullWidth variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Save Payment</Button>
            </Grid>
            {/* <Grid item xs={12} sm={2}>
              <Button variant="contained" color="primary" type="submit" startIcon={<PrintIcon />}>Print Reciept</Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="contained" color="primary" type="submit" startIcon={<PrintIcon />}>Print Invoice</Button>
            </Grid> */}
          </Grid>
        </Box>
        <SubTitleComponent>Invoice</SubTitleComponent>
        <TableContainer component={Paper} elevation={3} variant="elevation" >
          <Table>
            <TableHead>
              <StyledTableHeadRow>
                <StyledTableHeadCell variant="head" style={{ width: "15%" }} >Date</StyledTableHeadCell>
                <StyledTableHeadCell variant="head" style={{ width: "10%" }} >Invoice #</StyledTableHeadCell>
                {
                  props.store.billingByInvoice.accountPayablesSettings.map(({ id, label }) => (
                    <StyledTableHeadCell key={id} variant="head" align="right">{label}</StyledTableHeadCell>
                  ))
                }
              </StyledTableHeadRow>
            </TableHead>
            <TableBody>
              {
                props.store.billingByInvoice.list.map(({ invoiceNo, invoiceDate, payablesMap }) => (
                  <StyledTableRow key={invoiceNo}>
                    <TableCell>{moment(invoiceDate).format('lll')}</TableCell>
                    <TableCell>{invoiceNo}</TableCell>
                    {
                      props.store.billingByInvoice.accountPayablesSettings.map(({ id }) => (
                        <>
                          {console.log(`invoiceNo=${invoiceNo}, id=$id, payablesMap==>`, payablesMap)}

                          <TableCell key={id} align="right">{(payablesMap[id] ? payablesMap[id].payment : 0).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                          }
                          )}
                          </TableCell>
                        </>
                      ))
                    }
                  </ StyledTableRow>
                ))
              }

            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </>
  )
}
export default PayablesHtmlComponent;