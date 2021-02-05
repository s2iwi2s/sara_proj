import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { ERROR_CODE, INIT_STATUS, OPTIONS, PAGE_URL } from '../../api/Utils'
import CustomTableGrid from '../common/CustomTableGrid'

import { deleteItem, getList, getOptions } from '../../api/accountPayablesSettings/AccountPayablesSettingsService';
import { selectPageable, setPageable, setSelectedItem } from '../../api/accountPayablesSettings/AccountPayablesSettingsSlice';
import TitleComponent from '../common/TitleComponent';
import useMessageAlert from "../../api/useMessageAlert"
import ConfirmMsgDialog from '../common/ConfirmMsgDialog';
import SubTitleComponent from '../common/SubTitleComponent';
import { Box, Grid, Paper } from '@material-ui/core';
import SelectGrid from '../common/SelectGrid';

export default function AccountPayablesSettingsListComponent(props) {
  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)
  const { showErrorMsgAlert } = useMessageAlert();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [optionsList, setOptionsList] = useState({
    periodList: []
  });

  const [filter, setFilter] = useState({
    period: { id: 'All' }
  });

  useEffect(() => {
    doInitOptions()
  }, []);

  const doInitOptions = () => {
    getOptions().then(response => {
      let list = {
        ...response.data.listService,
        periodList: [{
          "id": "ALL",
          "description": "All",
        },
        ...response.data.listService.periodList]
      }

      setOptionsList(list)
    })
  }

  const retrieve = ({ searchValue, paging }) => getList(searchValue, paging.currentPage, paging.rowsPerPage, filter.period.id)
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
    if (!data.paymentPeriod) {
      data.paymentPeriod = { 'id': '' }
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


  const changeSelectState = (e) => {
    const { name, value } = e.target
    console.log(`[AccountPayablesSettingsListComponent.changeSelectState] name=${name}, value=${value}`)
    setFilter({
      ...filter,
      [name]: { id: value }
    })
    console.log(`[AccountPayablesSettingsListComponent.changeSelectState]  filter=`, filter)
  }
  return (
    <>
      <TitleComponent>Accounts Payables Settings List</TitleComponent>

      <Box py={5}>
        <Paper elevation={2} variant="elevation" >
          <Box pb={3} px={3}>
            <SubTitleComponent>Filter</SubTitleComponent>
            <Grid container spacing={3}>
              <SelectGrid sm={3} name="period" label="Period" value={filter.period.id} options={optionsList.periodList}
                onChange={e => changeSelectState(e)} />
            </Grid>
          </Box>
        </Paper>
      </Box>

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



