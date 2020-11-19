import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@material-ui/core';


import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { PAGE_URL, StyledTableHeadCell, StyledTableHeadRow, StyledTableRow } from '../../api/Utils';
import PaginationComponent from '../common/PaginationComponent';

const SearchResultsHtmlComponent = (props) => {
 const { list, paging } = props.store;
 const history = useHistory();

 const doPayables = (id) => {
  history.push(PAGE_URL.BILLING_PAYABLES_URL + '/' + id)
 }

 const doEditUser = (id) => {
  history.push(PAGE_URL.STUDENT_DETAIL_URL + '/' + id)
 }

 const doDeleteUser = (id) => {
  // history.push(PAGE_URL.STUDENT_DETAIL_URL + '/' + id)
 }
 const CustomTableHead = () => {
  return (<>
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
  </>)
 }
 const CustomTableBody = () => {
  return (<>
   <TableBody>
    {list.map(({ id, studentId, lastName, firstName, level }) => (
     <StyledTableRow key={id}>
      <TableCell variant="head">{studentId}</TableCell>
      <TableCell>{firstName} {lastName}</TableCell>
      <TableCell>{level.description}</TableCell>
      <TableCell align="right">
       {/* href={PAGE_URL.BILLING_PAYABLES_URL + '/' + row.id} */}
       {/* onClick={() => doPayables(row.id)} */}
       <IconButton aria-label="payment" href={PAGE_URL.BILLING_PAYABLES_URL + '/' + id}>
        <AccountBalanceWalletIcon fontSize="large" />
       </IconButton>
       <IconButton aria-label="edit" onClick={() => doEditUser(id)}>
        <EditIcon fontSize="large" />
       </IconButton>
       {/* <IconButton aria-label="delete" onClick={() => doDeleteUser(row.id)}>
          <DeleteIcon fontSize="large" />
         </IconButton> */}
      </TableCell>
     </StyledTableRow>
    ))}
   </TableBody>
  </>)
 }

 return (
  <>
   <Box py={3}><Divider /></Box>
   <Box ><Typography variant="h5">Search Results</Typography></Box>

   <PaginationComponent
    paging={paging}
    onChangePage={props.onChangePage}
    onChangeRowsPerPage={props.onChangeRowsPerPage}
   />

   <TableContainer component={Paper}>
    <Table>
     <CustomTableHead />
     <CustomTableBody />
    </Table>
   </TableContainer>

   <PaginationComponent
    paging={paging}
    onChangePage={props.onChangePage}
    onChangeRowsPerPage={props.onChangeRowsPerPage}
   />
  </>
 )
}

export default SearchResultsHtmlComponent;