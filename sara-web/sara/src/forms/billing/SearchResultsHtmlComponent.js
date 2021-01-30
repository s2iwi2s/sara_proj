import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead } from '@material-ui/core';


import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { PAGE_URL, StyledTableHeadCell, StyledTableHeadRow, StyledTableRow } from '../../api/Utils';
import PaginationComponent from '../common/PaginationComponent';
import SubTitleComponent from '../common/SubTitleComponent';

const SearchResultsHtmlComponent = (props) => {
 const { list, paging } = props.store;
 const history = useHistory();


 const doEditUser = id => history.push(PAGE_URL.STUDENT_DETAIL_URL + '/' + id)

 const doShowPayables = (row) => props.doPayables(row.id, row.school.currentPeriod.id)

 const CustomTableHead = () => {
  return (<>
   <TableHead>
    <StyledTableHeadRow>
     <StyledTableHeadCell>LRN</StyledTableHeadCell>
     <StyledTableHeadCell>Name</StyledTableHeadCell>
     <StyledTableHeadCell>Grade Level</StyledTableHeadCell>

    </StyledTableHeadRow>
   </TableHead>
  </>)
 }
 const CustomTableBody = () => {
  return (<>
   <TableBody>
    {list.map(row => (
     <StyledTableRow key={row.id}>
      <TableCell variant="head">{row.lrn}</TableCell>
      <TableCell>{row.firstName} {row.lastName}</TableCell>
      <TableCell>{row.level.description}</TableCell>
      <TableCell align="right">
       <IconButton aria-label="payment" onClick={() => doShowPayables(row)}>
        <AccountBalanceWalletIcon fontSize="large" />
       </IconButton>
       <IconButton aria-label="edit" onClick={() => doEditUser(row.id)}>
        <EditIcon fontSize="large" />
       </IconButton>
      </TableCell>
     </StyledTableRow>
    ))}
   </TableBody>
  </>)
 }

 return (
  <>
   <SubTitleComponent>Search Results</SubTitleComponent>
   {/* <PaginationComponent
    paging={paging}
    onChangePage={props.onChangePage}
    onChangeRowsPerPage={props.onChangeRowsPerPage}
   /> */}

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