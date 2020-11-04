
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination, FormControl, Input, Grid, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

import { INIT_STATUS, StyledTableRow } from '../../api/Utils'

export default function CustomTableGrid(props) {
 const { register, reset } = useForm();

 useEffect(() => {
  console.log('==>props.store=>', props.store)
  if (props.store.INIT_STATUS === INIT_STATUS.INIT) {
   props.doRetrieve();
  } else if (props.store.INIT_STATUS === INIT_STATUS.LOAD) {
   reset(props.store);
  }
 }, [props.store])

 const doHandleKeyDown = (e) => {
  if (e.key === 'Enter') {
   props.doSearch(e.target.value)
   e.preventDefault();
  }
 }
 const PAGINATION = () => {
  return (
   <TablePagination
    component="div"
    page={props.store.paging.currentPage}
    count={props.store.paging.totalElements}
    rowsPerPage={props.store.paging.rowsPerPage}
    onChangePage={props.doHandleChangePage}
    onChangeRowsPerPage={props.doHandleChangeRowsPerPage}
   />
  )
 }
 return (
  <>
   <Grid container spacing={3}>
    <Grid item xs={12} sm={5}>
    </Grid>
    <Grid item xs={12} sm={3}>
     <FormControl variant="filled">
      <Input name="searchValue"
       defaultValue={props.store.searchValue}
       onKeyDown={e => doHandleKeyDown(e)}
       placeholder="Search"
       inputRef={register}
       endAdornment={<SearchIcon onClick={() => props.doRetrieve()} />}
      />
     </FormControl>
    </Grid>
    <Grid item xs={12} sm={4}>
     <PAGINATION
     />
    </Grid>

   </Grid>
   <Table>
    <TableHead>
     <TableRow>
      {props.cols.map(params => (
       <>
        <TableCell>{params.headerName}</TableCell>
       </>
      ))}
      <TableCell align="right">
       Action
        <IconButton aria-label="add" onClick={() => props.doEdit(-1)}>
        <AddIcon fontSize="large" />
       </IconButton>
      </TableCell>
     </TableRow>
    </TableHead>
    <TableBody>
     {props.store.list.map(row => (
      <StyledTableRow key={row.id}>
       {props.cols.map(params => (
        <>
         <TableCell>{row[params.field]}</TableCell>
        </>
       ))}

       <TableCell align="right">
        <IconButton aria-label="edit" onClick={() => props.doEdit(row.id)}>
         <EditIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => props.doDelete(row.id)}>
         <DeleteIcon fontSize="large" />
        </IconButton>
       </TableCell>
      </StyledTableRow>
     ))}
    </TableBody>
   </Table>
   <PAGINATION />
  </ >
 );
}