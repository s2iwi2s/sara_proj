import React from 'react';
import { Box, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, Typography } from '@material-ui/core';


import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { PAGE_URL, StyledTableHeadCell, StyledTableHeadRow, StyledTableRow } from '../../api/Utils';
import PaginationComponent from '../common/PaginationComponent';

const SearchResultsHtmlComponent = (props) => {

 return (
  <>
   <Box py={3}><Divider /></Box>
   <Box pb={3}><Typography variant="h5">Search Results</Typography></Box>

   <PaginationComponent
    paging={props.store.paging}
    onChangePage={props.onChangePage}
    onChangeRowsPerPage={props.onChangeRowsPerPage}
   />

   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <StyledTableHeadRow>
       <StyledTableHeadCell>Student ID</StyledTableHeadCell>
       <StyledTableHeadCell>Name</StyledTableHeadCell>
       <StyledTableHeadCell>Grade Level</StyledTableHeadCell>
       <StyledTableHeadCell align="right">
        <IconButton aria-label="add" onClick={() => props.doEdit(-1)}>
         <AddIcon fontSize="large" />
        </IconButton>
       </StyledTableHeadCell>
      </StyledTableHeadRow>
     </TableHead>
     <TableBody>
      {props.store.list.map(row => (
       <StyledTableRow key={row.id}>
        <TableCell variant="head">{row.studentId}</TableCell>
        <TableCell>{row.firstName} {row.lastName}</TableCell>
        <TableCell>{row.level.description}</TableCell>
        <TableCell align="right">
         <IconButton aria-label="payment" href={PAGE_URL.BILLING_PAYABLES_URL + '/' + row.id}>
          <AccountBalanceWalletIcon fontSize="large" />
         </IconButton>
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
   </TableContainer>

   <PaginationComponent
    paging={props.store.paging}
    onChangePage={props.onChangePage}
    onChangeRowsPerPage={props.onChangeRowsPerPage}
   />
  </>
 )
}

export default SearchResultsHtmlComponent;