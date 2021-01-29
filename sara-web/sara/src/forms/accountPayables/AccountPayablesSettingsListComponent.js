import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { ERROR_CODE, INIT_STATUS, OPTIONS, PAGE_URL } from '../../api/Utils'
import CustomTableGrid from '../common/CustomTableGrid'

import { deleteItem, getList } from '../../api/accountPayablesSettings/AccountPayablesSettingsService';
import { selectPageable, setPageable, setSelectedItem } from '../../api/accountPayablesSettings/AccountPayablesSettingsSlice';
import TitleComponent from '../common/TitleComponent';
import { useMessageAlert } from "../../api/useMessageAlert"
import ConfirmMsgDialog from '../common/ConfirmMsgDialog';

export default function AccountPayablesSettingsListComponent(props) {
  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)
  const [,
    ,
    showErrorMsgAlert,
    ,
    ,
    ,
  ] = useMessageAlert();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();


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
    .catch(error => showErrorMsgAlert(error, ERROR_CODE.RETRIEVE_ERROR, 'AccountPayablesSettingsListComponent.retrieve', 'AccountPayablesSettingsService.getList'));

  const doRetrieve = () => retrieve({
    searchValue: currPageable.searchValue,
    paging: currPageable.paging
  })

  const doEdit = (selected) => {
    let data = {
      ...selected
    }
    if (!data.period) {
      data.period = { 'id': '' }
    }
    console.log(`[AccountPayablesSettingsListComponent.doEdit]  data=`, data)
    dispatch(setSelectedItem(data))
    props.history.push(`${PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_DETAIL_URL}`);
  }

  const doNew = () => {
    props.history.push(`${PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_DETAIL_URL}/-1`);
  }

  const doCloseConfirmDelete = () => {
    setDeleteDialogOpen(false)
  }
  const doShowConfirmDelete = (id) => {
    setDeleteId(id)
    setDeleteDialogOpen(true)
  }
  const setDeleteDialogSelection = (value) => {
    console.log(`[CodeGroupsListComponent.setDeleteDialogSelection] value=${value}`);
    if (value === OPTIONS.YES) {
      doDelete(deleteId)
    }
    setDeleteId(null)
  }
  const doDelete = (id) => deleteItem(id)
    .then(doRetrieve)
    .catch(error => showErrorMsgAlert(error, ERROR_CODE.RETRIEVE_ERROR, 'AccountPayablesSettingsListComponent.doDelete', 'AccountPayablesSettingsService.deleteItem'));

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
      <TitleComponent>Accounts Payables Settings List</TitleComponent>

      <CustomTableGrid
        store={currPageable}
        cols={cols}
        onChangePage={doHandleChangePage}
        onChangeRowsPerPage={doHandleChangeRowsPerPage}
        doRetrieve={doRetrieve}
        doEdit={doEdit}
        doNew={doNew}
        doDelete={doShowConfirmDelete}
        doSearch={doSearch}
      />

      <ConfirmMsgDialog
        open={deleteDialogOpen}
        title="Confirm delete"
        msg="Are you sure you want to delete?"
        closeDialog={doCloseConfirmDelete}
        setDialogSelection={setDeleteDialogSelection} />
    </ >
  );
}



