
import React, { useEffect } from 'react';

import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@material-ui/core';
import { StyledTableCell, StyledTableHeadCell, StyledTableHeadRow, StyledTableRow } from '../../api/Utils';

import { formatter } from '../../api/Utils'

export default function SavePayablesConfimationHtml(props) {
 useEffect(() => {
  console.log(`[SavePayablesConfimationHtml.useEffect] confirmStore=>`, props.confirmStore)
 }, [])

 return (<>
  {console.log(`[SavePayablesConfimationHtml.return] confirmStore=>`, props.confirmStore)}
  <Box>
   <Paper elevation={3} variant="elevation" >
    <Grid container spacing={3}>
     <Grid item xs={12} sm={2}>Student Name</Grid>
     <Grid item xs={12} sm={4}>{props.confirmStore.entity.firstName + ' ' + props.confirmStore.entity.lastName}</Grid>
     <Grid item xs={12} sm={2}>Level</Grid>
     <Grid item xs={12} sm={4}>{props.confirmStore.entity.level.description}</Grid>

     <Grid item xs={12} sm={2}>Student Id</Grid>
     <Grid item xs={12} sm={10}>{props.confirmStore.entity.studentId}</Grid>
    </Grid>
    <Box display="flex" py={3}>
     <Box component={Paper} elevation={3} variant="elevation" px={3} m="auto">
      <Typography variant="h5">Total amount is {props.confirmStore.total}</Typography>
     </Box>
    </Box>
   </Paper>
  </Box>
  {/* <TableContainer component={Paper} elevation={3} variant="elevation">
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
      props.confirmStore.payables.map((row, i) => (
       < StyledTableRow >
        <TableCell>{row.name}</TableCell>
        <TableCell align="right">{formatter.format(row.amount)}</TableCell>
        <TableCell align="right">{formatter.format(row.balance)}</TableCell>
        <TableCell align="right">{row.payment}</TableCell>
       </StyledTableRow >
      ))}
     < StyledTableRow >
      <TableCell>Total</TableCell>
      <StyledTableCell align="right" colSpan={3}>{props.confirmStore.total}</StyledTableCell>
     </ StyledTableRow>
    </TableBody>
   </Table>
  </TableContainer> */}
 </>);
}
