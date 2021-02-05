import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { ERROR_CODE, INIT_STATUS, OPTIONS, PAGE_URL } from '../../api/Utils'
import CustomTableGrid from '../common/CustomTableGrid'
import { deleteItem, getList, getOptions } from '../../api/gradeLevelPayables/GradeLevelPayablesService';
import { selectPageable, setPageable, setSelectedItem, resetSelectedItem } from '../../api/gradeLevelPayables/GradeLevelSlice';
import TitleComponent from '../common/TitleComponent';
import useMessageAlert from "../../api/useMessageAlert"
import ConfirmMsgDialog from '../common/ConfirmMsgDialog';
import { Box, Grid, Paper } from '@material-ui/core';
import SubTitleComponent from '../common/SubTitleComponent';
import SelectGrid from '../common/SelectGrid';


export default function GradeLevelPayablesListComponent(props) {


  const { showErrorMsgAlert } = useMessageAlert();

  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [optionsList, setOptionsList] = useState({
    periodList: []
  });

  const [filter, setFilter] = useState({
    period: { id: 'All' }
  });

  const cols = [
    {
      headerName: 'Level',
      render: function (row) {
        return row.level.description
      }
    },
    {
      headerName: 'Period',
      render: function (row) {
        return row.period ? row.period.description : ''
      }
    },
    {
      field: 'active',
      headerName: 'Active',
      render: function (row) {
        return row.active ? 'Y' : 'N'
      }
    }
  ];

  useEffect(() => {
    dispatch(resetSelectedItem())

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


  const retrieve = ({ searchValue, paging, periodId = filter.period.id }) =>
    getList(searchValue, paging.currentPage, paging.rowsPerPage, periodId)
      .then(({ data }) => {
        console.log(`[GradeLevelPayablesListComponent.retrieve] data=`, data)
        dispatch(setPageable({
          INIT_STATUS: INIT_STATUS.LOAD,
          list: data.pagingList.content,
          searchValue: searchValue,
          paging: {
            rowsPerPage: data.pagingList.size,
            currentPage: data.pagingList.pageable.pageNumber,
            totalElements: data.pagingList.totalElements,
            totalPage: data.pagingList.totalPage
          }
        }))
      }).catch(error => showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'GradeLevelPayablesListComponent.retrieve', 'GradeLevelPayablesService.getList'))

  const doRetrieve = () => {
    retrieve({
      searchValue: currPageable.searchValue,
      paging: currPageable.paging
    })
  }

  const doEdit = (selected) => {
    let aps = [...selected.accountPayablesSettings]
    aps.sort((a, b) => {
      return a.priority - b.priority;
    })
    dispatch(setSelectedItem({
      ...selected,
      accountPayablesSettings: [...aps]
    }))
    props.history.push(`${PAGE_URL.GRADE_LEVEL_PAYABLES_DETAIL_URL}`);
  }

  const doNew = () => {
    props.history.push(`${PAGE_URL.GRADE_LEVEL_PAYABLES_DETAIL_URL}/-1`);
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
  const doDelete = (id) => {
    deleteItem(id)
      .then(doRetrieve)
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'GradeLevelPayablesListComponent.doDelete', 'GradeLevelPayablesService.deleteItem'))
  }

  const doHandleChangePage = (e, newPage) => {
    retrieve({
      searchValue: currPageable.searchValue,
      paging: {
        ...currPageable.paging,
        currentPage: newPage
      }
    })
  }

  const doHandleChangeRowsPerPage = (e) => {
    retrieve({
      searchValue: currPageable.searchValue,
      paging: {
        ...currPageable.paging,
        rowsPerPage: e.target.value,
        currentPage: 0
      }
    })
  }

  const doSearch = (searchValue) => {
    retrieve({
      searchValue: searchValue,
      paging: {
        ...currPageable.paging
      }
    })
  }

  const changeSelectState = (e) => {
    const { name, value } = e.target
    console.log(`[AccountPayablesSettingsListComponent.changeSelectState] name=${name}, value=${value}`)
    setFilter({
      ...filter,
      [name]: { id: value }
    })
    console.log(`[AccountPayablesSettingsListComponent.changeSelectState]  filter=`, filter)

    retrieve({
      searchValue: currPageable.searchValue,
      paging: {
        ...currPageable.paging
      },
      periodId: value
    })
  }


  return (
    <>
      <TitleComponent>Grade Level Payables List</TitleComponent>

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
        // list={this.state.list}
        // searchValue={this.state.searchValue}
        // paging={this.state.paging}
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



