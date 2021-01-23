import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils'
import CustomTableGrid from '../common/CustomTableGrid'
import { deleteItem, getList } from '../../api/gradeLevelPayables/GradeLevelPayablesService';
import { selectPageable, setPageable, setSelectedItem, resetSelectedItem } from '../../api/gradeLevelPayables/GradeLevelSlice';
import { useGlobalVariable } from '../../providers/GlobalVariableProvider';

export default function GradeLevelPayablesListComponent(props) {
  const [globalProps, setGlobalProps, showErrorAlert, showInfoAlert, showWarningAlert, showSuccessAlert] = useGlobalVariable();
  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)

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
        return row.active ? 'Y' : 'N';
      }
    }
  ];

  useEffect(() => {
    dispatch(resetSelectedItem())
  }, []);

  const retrieve = ({ searchValue, paging }) =>
    getList(searchValue, paging.currentPage, paging.rowsPerPage)
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
      }).catch(error => setError(error, ERROR_CODE.LIST_ERROR, 'GradeLevelPayablesListComponent.retrieve', 'GradeLevelPayablesService.getList'))

  const setError = (error, errorCode, formMethod, serviceName) => {
    console.error(`[GradeLevelPayablesListComponent.setError]  error=`, error)
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName)
    showErrorAlert(errMsg)
  }


  const doRetrieve = () => {
    retrieve({
      searchValue: currPageable.searchValue,
      paging: currPageable.paging
    })
  }

  const doEdit = (selected) => {
    dispatch(setSelectedItem(selected))
    props.history.push(`${PAGE_URL.GRADE_LEVEL_PAYABLES_DETAIL_URL}`);
  }

  const doNew = () => {
    props.history.push(`${PAGE_URL.GRADE_LEVEL_PAYABLES_DETAIL_URL}/-1`);
  }

  const doDelete = (id) => {
    deleteItem(id)
      .then(doRetrieve)
      .catch(error => setError(error, ERROR_CODE.LIST_ERROR, 'GradeLevelPayablesListComponent.doDelete', 'GradeLevelPayablesService.deleteItem'))
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

  return (
    <>
      <Box pb={3}><Typography variant="h4">Grade Level Payables List</Typography></Box>

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
        doDelete={doDelete}
        doSearch={doSearch}
      />
    </ >
  );
}



