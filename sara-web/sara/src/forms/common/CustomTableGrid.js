
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Table, TableHead, TableCell, TableBody, FormControl, Input, Grid, IconButton, TableContainer, Paper } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

import { INIT_STATUS, StyledTableHeadCell, StyledTableHeadRow, StyledTableRow } from '../../api/Utils'
import PaginationComponent from './PaginationComponent';

export default function CustomTableGrid(props) {
 const { showPaging = true, showSearch = true, showAction = true } = props;

 const { register, reset } = useForm();
 const [counter, setCounter] = useState(0);

 useEffect(() => {
  console.log(`[CustomTableGrid.useEffect] counter=${counter}`)
  // if (props.store.INIT_STATUS === INIT_STATUS.INIT) {
  //  props.doRetrieve();
  // } else if (props.store.INIT_STATUS === INIT_STATUS.RESET) {
  //  reset(props.store);
  // }
 }, [props.store])

 const doHandleKeyDown = (e) => {
  if (e.key === 'Enter') {
   props.doSearch(e.target.value)
   e.preventDefault();
  }
  setCounter(counter + 1)
 }

 return (
  <>
   <Grid container spacing={3}>
    {
     showSearch &&
     <Grid item xs={12} sm={8}>
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
    }

    {
     showPaging &&
     <Grid item xs={12} sm={4}>
      <PaginationComponent
       paging={props.store.paging}
       onChangePage={props.onChangePage}
       onChangeRowsPerPage={props.onChangeRowsPerPage}
      />
     </Grid>
    }

   </Grid>

   <TableContainer component={Paper} elevation={3} variant="elevation" >
    <Table>
     <TableHead>
      <StyledTableHeadRow>
       {props.cols.map(params => (
        <>
         <StyledTableHeadCell key={params.field}>{params.headerName}</StyledTableHeadCell>
        </>
       ))}
       {showAction && <StyledTableHeadCell align="right">
        Action
        <IconButton aria-label="add" onClick={() => props.doNew()}>
         <AddIcon fontSize="large" />
        </IconButton>
       </StyledTableHeadCell>}

      </StyledTableHeadRow>
     </TableHead>
     <TableBody>
      {props.store.list.map(row => (
       <StyledTableRow key={row.id}>
        {props.cols.map(params => (
         <>
          <TableCell>{params.render ? params.render(row) : row[params.field]}</TableCell>
         </>
        ))}
        {showAction && <TableCell align="right">
         <IconButton aria-label="edit" onClick={() => props.doEdit(row)}>
          <EditIcon fontSize="large" />
         </IconButton>
         <IconButton aria-label="delete" onClick={() => props.doDelete(row.id)}>
          <DeleteIcon fontSize="large" />
         </IconButton>
        </TableCell>}

       </StyledTableRow>
      ))}
     </TableBody>
    </Table>
   </TableContainer>

   {props.showPaging && <PaginationComponent
    paging={props.store.paging}
    doHandleChangePage={props.doHandleChangePage}
    doHandleChangeRowsPerPage={props.doHandleChangeRowsPerPage}
   />}

  </ >
 );
}