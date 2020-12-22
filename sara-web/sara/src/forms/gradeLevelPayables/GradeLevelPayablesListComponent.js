import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import { INIT_STATUS, PAGE_URL } from '../../api/Utils'
import GradeLevelPayablesService from '../../api/GradeLevelPayablesService';
import CustomTableGrid from '../common/CustomTableGrid'

export default function GradeLevelPayablesListComponent(props) {
  const cols = [
    {
      headerName: 'Description',
      render: function (row) {
        return row.level.description;
      }
    },
    {
      field: 'active',
      headerName: 'Active',
      render: function (row) {
        return row.active? 'Y' : 'N';
      }
    }
  ];

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
    GradeLevelPayablesService.getList(store.searchValue, store.paging.currentPage, store.paging.rowsPerPage)
      .then(response => {
        console.log(`[GradeLevelPayablesListComponent.doRetrieve] response=>`, response)
        let data = {
          INIT_STATUS: INIT_STATUS.LOAD,
          list: response.data.pagingList ? response.data.pagingList.content : [],
          searchValue: store.searchValue,
          paging: {
            rowsPerPage: response.data.pagingList ? response.data.pagingList.size : 0,
            currentPage: response.data.pagingList ? response.data.pagingList.pageable.pageNumber : 0,
            totalElements: response.data.pagingList ? response.data.pagingList.totalElements : 0,
            totalPage: response.data.pagingList ? response.data.pagingList.totalPage : 0
          }
        }
        setStore(data);
      })
  }
  const doEdit = (id) => {
    console.log(`[GradeLevelPayablesListComponent.edit] id=${id}`)
    props.history.push(`${PAGE_URL.GRADE_LEVEL_PAYABLES_DETAIL_URL}/${id}`);
  }

  const doDelete = (id) => {
    console.log(`[GradeLevelPayablesListComponent.delete] id=${id}`)
    GradeLevelPayablesService.delete(id)
      .then(response => {
        console.log(`[GradeLevelPayablesListComponent.delete] response==>`, response)
        doRetrieve();
      })
  }

  const doHandleChangePage = (e, newPage) => {
    console.log(`[GradeLevelPayablesListComponent.delete] doHandleChangePage=${newPage}`)
    // let paging = this.state.paging;
    // paging.currentPage = newPage
    // this.setState({
    //   paging: paging
    // });
    let data = {
      ...store
    }
    let paging = data.paging;
    paging.currentPage = newPage
    setStore(data);

    doRetrieve();
  }

  const doHandleChangeRowsPerPage = (e) => {
    console.log(`[GradeLevelPayablesListComponent.doHandleChangeRowsPerPage] rowsPerPage=${e.target.value}`)
    let data = {
      ...store
    }
    let paging = data.paging;
    paging.rowsPerPage = e.target.value
    paging.currentPage = 0;

    setStore(data)
    doRetrieve();
  }

  const doSearch = (searchValue) => {
    store.searchValue = searchValue
    doRetrieve();
  }

  return (
    <>
      <Box pb={3}><Typography variant="h4">Grade Level Payables List</Typography></Box>

      <CustomTableGrid
        store={store}
        cols={cols}
        // list={this.state.list}
        // searchValue={this.state.searchValue}
        // paging={this.state.paging}
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



