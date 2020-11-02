import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Divider, FormControl, FormControlLabel, Grid, Input, MenuItem, Paper, Radio, Table, TableBody, TableCell, TableHead, TextField, Typography, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

import { INIT_STATUS, StyledTableHeadRow, StyledTableRow } from '../../api/Utils'
import { useStyles } from '../common/CSS'

export default function BillingSearchHtml(props) {
 const { register, handleSubmit, errors, reset } = useForm();
 const classes = useStyles;
 useEffect(() => {
  // setCounter(counter + 1);
  // console.log(`[StudentDetailHtml.useEffect] props.entity.initStatus=>${props.entity.initStatus}, counter=${counter}`);
  if (props.formData.initStatus === INIT_STATUS.LOAD) {
   //props.doRetrieve(props.entity.entityId);
  } if (props.formData.initStatus === INIT_STATUS.RESET) {
   reset(props.formData)
  }
 }, [props.formData])

 const debug = (value) => {
  console.log('debug value=', value);
 }
 const doEdit = (id) => {

 }
 const doDelete = (id) => {

 }

 return (
  <>

   <Box pb={3}><Typography variant="h4">Billing</Typography></Box>

   <Paper elevation={0} variant="outlined" >
    <Box my={3} mx={3}>
     <Grid container spacing={3}>
      <Grid item xs={12} sm={2}><Typography variant="h5">Search By</Typography></Grid>
      <Grid item xs={12} sm={2}>
       <TextField id="searchBy"
        required shrink
        select autoFocus
        name="searchBy"
        // label="Search By"
        fullWidth
        autoComplete="billing-search-by"
        inputRef={register}
        defaultValue={props.formData.billingSearchBy}
       >
        {props.formData.optionsList.billingSearchBy.map(row => (
         <MenuItem key={row.id} value={row.value}>{row.description}</MenuItem>
        ))}
       </TextField>

      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField id="searchValue"
        required shrink
        name="searchValue"
        // label="Search By"
        fullWidth
        autoComplete="billing-search-value"
        inputRef={register}
        defaultValue={props.formData.billingSearchBy}
       />
      </Grid>

      <Grid item xs={12} sm={1}>
       <Button variant="contained" color="primary" type="submit" startIcon={<SearchIcon />}>Search</Button>
      </Grid>
     </Grid>
    </Box>
   </Paper>
   <Box py={3}><Divider /></Box>


   <Box pb={3}><Typography variant="h5">Search Results</Typography></Box>
   <Table>
    <TableHead>
     <StyledTableHeadRow>
      <TableCell>Student ID</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Grade Level</TableCell>
      <TableCell align="right">
       Action
                <IconButton aria-label="add" onClick={() => this.doEdit(-1)}>
        <AddIcon fontSize="large" />
       </IconButton>
      </TableCell>
     </StyledTableHeadRow>
    </TableHead>
    <TableBody>
     {props.formData.list.map(row => (
      <StyledTableRow key={row.id}>
       <TableCell>{row.id}</TableCell>
       <TableCell>{row.firstName} {row.lastName}</TableCell>
       <TableCell>{row.level.description}</TableCell>
       <TableCell>{row.level && row.level.value}</TableCell>

       <TableCell align="right">
        <IconButton aria-label="edit" onClick={() => this.doEdit(row.id)}>
         <EditIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => this.doDelete(row.id)}>
         <DeleteIcon fontSize="large" />
        </IconButton>
       </TableCell>
      </StyledTableRow>
     ))}
    </TableBody>
   </Table>
  </>
 )
}