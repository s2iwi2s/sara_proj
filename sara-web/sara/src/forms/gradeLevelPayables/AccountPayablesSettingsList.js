import React, { useState } from 'react';

import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { INIT_STATUS } from '../../api/Utils'
import AccountPayablesService from '../../api/accountPayablesSettings/AccountPayablesSettingsService';
import CustomTableGrid from '../common/CustomTableGrid'

export default function AccountPayablesSettingsList(props) {
  const [store, setStore] = useState({
    INIT_STATUS: INIT_STATUS.DONE,
    list: [],
    searchValue: '',
    paging: {
      rowsPerPage: 25,
      totalElements: 0,
      currentPage: 0
    }
  });

  const doRetrieve = () => {
    AccountPayablesService.getActiveList(store.searchValue, store.paging.currentPage, store.paging.rowsPerPage)
      .then(response => {
        console.log(`[AccountPayablesSettingsList.doRetrieve AccountPayablesService.getActiveList] response=>`, response)
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

  }

  const doDelete = (id) => {

  }

  const doHandleChangePage = (e, newPage) => {
    console.log(`[AccountPayablesSettingsList.delete] doHandleChangePage=${newPage}`)
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
    console.log(`[AccountPayablesSettingsList.doHandleChangeRowsPerPage] rowsPerPage=${e.target.value}`)
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
  const doAddItem = (row) => {
    console.log(`[AccountPayablesSettingsList.doAddItem] row=>`, row)
    props.setGradeLevelPayables(row);
  }
  const cols = [
    {
      field: 'description',
      headerName: 'Add',
      render: function (row) {
        return (<IconButton aria-label="add" onClick={() => doAddItem(row)}>
          <AddIcon fontSize="large" />
        </IconButton>);
      }
    },
    {
      field: 'description',
      headerName: 'Description',
    },
    {
      headerName: 'Payment Period',
      render: function (row) {
        return row.paymentPeriod.description;
      }
    },
    {
      field: 'amount',
      headerName: 'Amount',
    },
    {
      field: 'priority',
      headerName: 'Priority',
    }
  ];

  return (
    <>
      <CustomTableGrid
        store={store}
        cols={cols}
        showAction={false}
        // list={this.state.list}
        // searchValue={this.state.searchValue}
        // paging={this.state.paging}
        onChangePage={doHandleChangePage}
        onChangeRowsPerPage={doHandleChangeRowsPerPage}
        doRetrieve={doRetrieve}
        doSearch={doSearch}
      />
    </ >
  );
}



