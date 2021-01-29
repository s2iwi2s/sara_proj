import React, { useState } from 'react';

import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { getActiveList } from '../../api/accountPayablesSettings/AccountPayablesSettingsService';
import CustomTableGrid from '../common/CustomTableGrid'
import { ERROR_CODE } from '../../api/Utils';
import { useMessageAlert } from "../../api/useMessageAlert"

export default function GradeLevelAccountPayablesSettingsListComponent(props) {

  const alert = useMessageAlert();
  const [store, setStore] = useState({
    list: [],
    searchValue: '',
    paging: {
      rowsPerPage: 25,
      totalElements: 0,
      currentPage: 0
    }
  });

  const showErrorMsgAlert = (error, errorCode, formMethod, serviceName) => {
    alert({
      type: 'form-error',
      payload: {
        error: error,
        errorCode: errorCode,
        formMethod: formMethod,
        serviceName: serviceName
      }
    })
  }

  const doRetrieve = () => {
    console.log(`[GradeLevelAccountPayablesSettingsListComponent.doRetrieve] props.selectedItem==>`, props.selectedItem)
    if (!props.selectedItem.period || !props.selectedItem.period.id) {
      alert({
        type: 'error',
        payload: 'Please select period'
      })
      return
    }
    getActiveList(props.selectedItem.period.id, store.searchValue, store.paging.currentPage, store.paging.rowsPerPage)
      .then(response => {
        let data = {
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
      }).catch(error => showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'GradeLevelAccountPayablesSettingsListComponent.retrieve', 'AccountPayablesSettingsService.getActiveList'))
  }

  const doHandleChangePage = (e, newPage) => {
    let data = {
      ...store
    }
    let paging = data.paging;
    paging.currentPage = newPage
    setStore(data);

    doRetrieve();
  }

  const doHandleChangeRowsPerPage = (e) => {
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
      headerName: 'Period',
      render: function (row) {
        return row.period ? row.period.description : ''
      }
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
        onChangePage={doHandleChangePage}
        onChangeRowsPerPage={doHandleChangeRowsPerPage}
        doRetrieve={doRetrieve}
        doSearch={doSearch}
      />
    </ >
  );
}



