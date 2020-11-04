import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import { INIT_STATUS, PAGE_URL } from '../../api/Utils'
import CodeGroupsService from '../../api/codeGroups/CodeGroupsService';
import CustomTableGrid from '../common/CustomTableGrid'

export default function CodeGroupsListComponent(props) {
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
    CodeGroupsService.getList(store.searchValue, store.paging.currentPage, store.paging.rowsPerPage)
      .then(response => {
        console.log(response)
        let data = {
          INIT_STATUS: INIT_STATUS.LOAD,
          list: response.data.pagingList.content,
          searchValue: store.searchValue,
          paging: {
            rowsPerPage: response.data.pagingList.size,
            currentPage: response.data.pagingList.pageable.pageNumber,
            totalElements: response.data.pagingList.totalElements,
            totalPage: response.data.pagingList.totalPage
          }
        }
        setStore(data);
      })
  }
  const doEdit = (id) => {
    console.log(`[CodeGroupsComponent.edit] id=${id}`)
    props.history.push(`${PAGE_URL.CODE_GROUPS_DETAIL_URL}/${id}`);
  }

  const doDelete = (id) => {
    console.log(`[CodeGroupsComponent.delete] id=${id}`)
    CodeGroupsService.delete(id)
      .then(response => {
        console.log(`[CodeGroupsComponent.delete] response==>`, response)
        doRetrieve();
      })
  }

  const doHandleChangePage = (e, newPage) => {
    // let paging = this.state.paging;
    // paging.currentPage = newPage
    // this.setState({
    //   paging: paging
    // });
    store.paging.currentPage = newPage
    setStore(store);

    doRetrieve();
  }

  const doHandleChangeRowsPerPage = (e) => {
    let paging = store.paging;
    paging.rowsPerPage = e.target.value
    paging.currentPage = 0;
    setStore(store)
    doRetrieve();
  }

  const doSearch = (searchValue) => {
    store.searchValue = searchValue
    doRetrieve();
  }

  const cols = [
    {
      field: 'code',
      headerName: 'Code',
    },
    {
      field: 'value',
      headerName: 'Value',
    },
    {
      field: 'description',
      headerName: 'Description',
    }
  ];

  return (
    <>
      <Box pb={3}><Typography variant="h4">Code Groups List</Typography></Box>

      <CustomTableGrid
        store={store}
        cols={cols}
        // list={this.state.list}
        // searchValue={this.state.searchValue}
        // paging={this.state.paging}
        doHandleChangePage={doHandleChangePage}
        doHandleChangeRowsPerPage={doHandleChangeRowsPerPage}
        doRetrieve={doRetrieve}
        doEdit={doEdit}
        doDelete={doDelete}
        doSearch={doSearch}
      />
    </ >
  );
}



