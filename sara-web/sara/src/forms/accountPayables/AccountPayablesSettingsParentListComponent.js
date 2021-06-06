import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'


import { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils'
import CustomTableGrid from '../common/CustomTableGrid'

import { getList } from '../../api/accountPayablesSettings/AccountPayablesSettingsService';
import { selectPageable, setPageable, setSelectedItem } from '../../api/accountPayablesSettings/AccountPayablesSettingsSlice';
import useMessageAlert from "../../api/useMessageAlert"

export default function AccountPayablesSettingsParentListComponent(props) {
  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)
  const { showErrorMsgAlert } = useMessageAlert();


  let cols = [{
    field: 'description',
    headerName: 'Add',
    render: function (row) {
      return (<IconButton aria-label="add" onClick={() => props.setParent(row)}>
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
      return row.paymentPeriod ? row.paymentPeriod.description : '';
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

  useEffect(() => {
    retrieve({
      searchValue: currPageable.searchValue,
      paging: {
        ...currPageable.paging
      },
      periodId: props.paymentPeriod
    })

  }, []);

  const retrieve = ({ searchValue, paging, periodId = props.paymentPeriod }) => getList(searchValue, paging.currentPage, paging.rowsPerPage, periodId)
    .then(({ data }) => dispatch(setPageable({
      INIT_STATUS: INIT_STATUS.LOAD,
      list: data.pagingList.content,
      searchValue: searchValue,
      paging: {
        rowsPerPage: data.pagingList.size,
        currentPage: data.pagingList.pageable.pageNumber,
        totalElements: data.pagingList.totalElements,
        totalPage: data.pagingList.totalPage
      }
    })))
    .catch(error => showErrorMsgAlert(error, ERROR_CODE.RETRIEVE_ERROR, 'AccountPayablesSettingsListComponent.retrieve', 'AccountPayablesSettingsService.getList'));

  const doRetrieve = () => retrieve({
    searchValue: currPageable.searchValue,
    paging: currPageable.paging
  })


  const doHandleChangePage = (e, newPage) => retrieve({
    searchValue: currPageable.searchValue,
    paging: {
      ...currPageable.paging,
      currentPage: newPage
    }
  })

  const doHandleChangeRowsPerPage = (e) => retrieve({
    searchValue: currPageable.searchValue,
    paging: {
      ...currPageable.paging,
      rowsPerPage: e.target.value,
      currentPage: 0
    }
  })

  const doSearch = (searchValue) => retrieve({
    searchValue: searchValue,

    paging: {
      ...currPageable.paging
    }
  })

  return (
    <>
      <CustomTableGrid
        store={currPageable}
        cols={cols}
        onChangePage={doHandleChangePage}
        onChangeRowsPerPage={doHandleChangeRowsPerPage}
        doRetrieve={doRetrieve}
        doSearch={doSearch}
        showAction={false}
      />

    </ >
  );
}



