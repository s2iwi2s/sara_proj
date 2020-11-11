import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';


import EndUserService from '../../api/endUser/EndUserService';
import { PAGE_URL, INIT_STATUS } from '../../api/Utils'
import CustomTableGrid from '../common/CustomTableGrid';
export default function EndUserListComponent(props) {
  const [store, setStore] = useState({
    INIT_STATUS: INIT_STATUS.INIT,
    list: [],
    searchValue: '',
    paging: {
      rowsPerPage: 25,
      totalElements: 0,
      currentPage: 0
    }
  });

  const doRetrieve = () => {
    EndUserService.getList(store.searchValue, store.paging.currentPage, store.paging.rowsPerPage)
      .then(response => {
        console.log(`[EndUserListComponent.retrieve ] EndUserService.getList response=>`, response)
        let data = {
          ...store,
          INIT_STATUS: INIT_STATUS.RESET,
          list: response.data.pagingList.content,
          searchValue: response.data.searchValue,
          paging: {
            rowsPerPage: response.data.pagingList.size,
            totalElements: response.data.pagingList.totalElements,
            currentPage: response.data.pagingList.pageable.pageNumber,
            sort: 'title',
            direction: 'ASC'
          }
        }
        setStore(data)
      })
  }
  const doEdit = (id) => {
    console.log(`[EndUserListComponent.edit] id=${id}`)
    props.history.push(`${PAGE_URL.USER_DETAIL_URL}/${id}`);
  }
  const doDelete = (id) => {
    console.log(`[EndUserListComponent.delete] id=${id}`)
    EndUserService.delete(id)
      .then(response => {
        console.log(`[EndUserListComponent.delete] response==>`, response)
        doRetrieve();
      })
  }

  const doHandleChangePage = (e, newPage) => {
    //store.paging.currentPage = newPage;
    let paging = {
      ...store.paging
    }
    paging.currentPage = newPage
    let data = {
      ...store,
      paging: paging
    }
    setStore(data);

    doRetrieve();
  }
  const doHandleChangeRowsPerPage = (e) => {
    let paging = {
      ...store.paging
    }
    paging.rowsPerPage = e.target.value
    paging.currentPage = 0;

    let data = {
      ...store,
      paging: paging
    }
    setStore(data);

    doRetrieve();
  }

  const doSearch = (searchValue) => {
    store.searchValue = searchValue
    doRetrieve();
  }

  const cols = [
    {
      field: 'firstName',
      headerName: 'First Name',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      render: function (row) {
        return row.firstName + ' ' + row.lastName;
      }
    }
  ];

  return (
    <>
      <Box pb={3}><Typography variant="h4">Users</Typography></Box>
      <CustomTableGrid
        // showPaging={false}
        store={store}
        cols={cols}
        // list={store.list}
        // searchValue={store.searchValue}
        // paging={store.paging}
        onChangePage={doHandleChangePage}
        onChangeRowsPerPage={doHandleChangeRowsPerPage}
        doRetrieve={doRetrieve}
        doEdit={doEdit}
        doDelete={doDelete}
        doSearch={doSearch}
      />
    </ >
  );

}

