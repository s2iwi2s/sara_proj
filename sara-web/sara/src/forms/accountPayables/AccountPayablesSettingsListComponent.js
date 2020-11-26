import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import { INIT_STATUS, PAGE_URL } from '../../api/Utils'
import AccountPayablesService from '../../api/AccountPayablesSettingsService';
import CustomTableGrid from '../common/CustomTableGrid'

export default function AccountPayablesSettingsListComponent(props) {
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
    AccountPayablesService.getList(store.searchValue, store.paging.currentPage, store.paging.rowsPerPage)
      .then(response => {
        console.log(`[AccountPayablesSettingsListComponent.doRetrieve] response=>`, response)
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
    console.log(`[AccountPayablesSettingsListComponent.edit] id=${id}`)
    props.history.push(`${PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_DETAIL_URL}/${id}`);
  }

  const doDelete = (id) => {
    console.log(`[AccountPayablesSettingsListComponent.delete] id=${id}`)
    AccountPayablesService.delete(id)
      .then(response => {
        console.log(`[AccountPayablesSettingsListComponent.delete] response==>`, response)
        doRetrieve();
      })
  }

  const doHandleChangePage = (e, newPage) => {
    console.log(`[AccountPayablesSettingsListComponent.delete] doHandleChangePage=${newPage}`)
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
    console.log(`[AccountPayablesSettingsListComponent.doHandleChangeRowsPerPage] rowsPerPage=${e.target.value}`)
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

  const cols = [
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
    },
    {
      field: 'applyToAll',
      headerName: 'Apply To All',
      render: function (row) {
        return row.applyToAll ? 'Y' : 'N';
      }
    },
    {
      field: 'active',
      headerName: 'Active',
      render: function (row) {
        return row.active ? 'Y' : 'N';
      }
    }
  ];

  return (
    <>
      <Box pb={3}><Typography variant="h4">Accounts Payables Settings List</Typography></Box>

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



