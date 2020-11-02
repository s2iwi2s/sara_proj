import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

export default function CustomDataGrid(props) {
   const display = params => {
      console.log('====>', params)
   }

   const getRowCount = rowCount => {
      if (!rowCount) {
         rowCount = 0;
      }
      return rowCount;
   }
   const getRows = rows => {
      if (!rows) {
         return [];
      }
      return rows;
   }

   const getPageSize = (pageSize) => {
      if (!pageSize) {
         pageSize = 20;
      }
      return pageSize;
   }
   const getPage = (page) => {
      if (!page) {
         page = 0;
      }
      return page;
   }

   const doEdit = id => {
      console.log('doEdit id==>', id)
      props.doEdit(id)
   }

   const doDelete = id => {
      console.log('doDelete id==>', id)
      props.doDelete(id)
   }
   const doPageChange = params => {
      props.onPageChange({}, params.page)
   }

   const getColumns = cols => {
      let colsNew = [];
      console.log('cols==>', cols)
      if (cols) {
         cols.map(row => {
            colsNew.push(row);
         });
      }

      colsNew.push({
         field: 'id',
         headerName: 'Action',
         width: 150,
         renderCell: (params) => (
            <>
               <IconButton aria-label="edit" onClick={() => doEdit(params.value)}>
                  <EditIcon fontSize="large" />
               </IconButton>
               <IconButton aria-label="delete" onClick={() => doDelete(params.value)}>
                  <DeleteIcon fontSize="large" />
               </IconButton>
            </>
         ),
      })
      return colsNew;
   }

   return (
      <DataGrid
         rows={getRows(props.rows)}
         columns={getColumns(props.cols)}
         pagination
         rowsPerPageOptions={[5, 10, 20, 50, 100]}
         autoHeight={true}
         paginationMode={'server'}
         page={getPage(props.page)}
         pageSize={getPageSize(props.pageSize)}
         rowCount={getRowCount(props.rowCount)}
         doPageChange={doPageChange} />
   );
}
