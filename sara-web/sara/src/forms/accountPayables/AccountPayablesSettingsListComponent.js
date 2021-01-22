import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import { INIT_STATUS, PAGE_URL } from '../../api/Utils'
import CustomTableGrid from '../common/CustomTableGrid'

import { deleteItem, getList } from '../../api/accountPayablesSettings/AccountPayablesSettingsService';
import { selectPageable, resetSelectedItem, setPageable, setSelectedItem } from '../../api/accountPayablesSettings/AccountPayablesSettingsSlice';

export default function AccountPayablesSettingsListComponent(props) {
  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)



  const retrieve = ({ searchValue, paging }) => getList(searchValue, paging.currentPage, paging.rowsPerPage)
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

  const doRetrieve = () => retrieve({
    searchValue: currPageable.searchValue,
    paging: currPageable.paging
  })

  const doEdit = (selected) => {
    dispatch(setSelectedItem(selected))
    props.history.push(`${PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_DETAIL_URL}`);
  }

  const doDelete = (id) => deleteItem(id)
    .then(doRetrieve)

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
        store={currPageable}
        cols={cols}
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



