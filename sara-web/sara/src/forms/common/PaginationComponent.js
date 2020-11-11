import { TablePagination } from '@material-ui/core';
import React from 'react';

const PaginationComponent = (props) => {
 return (
  <TablePagination rowsPerPageOptions={[5, 10, 25, 50, 100]}
   component="div"
   page={props.paging.currentPage}
   count={props.paging.totalElements}
   rowsPerPage={props.paging.rowsPerPage}
   onChangePage={props.onChangePage}
   onChangeRowsPerPage={props.onChangeRowsPerPage}
  />
 )
}
export default PaginationComponent;