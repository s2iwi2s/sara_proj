import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { ERROR_CODE, INIT_STATUS, OPTIONS, PAGE_URL } from '../../api/Utils'
import CustomTableGrid from '../common/CustomTableGrid'

import { deleteItem, getList } from '../../api/codeGroups/CodeGroupsService';
import { selectPageable, resetSelectedItem, setPageable, setSelectedItem } from '../../api/codeGroups/CodeGroupsSlice';
import TitleComponent from '../common/TitleComponent';
import { useMessageAlert } from "../../api/useMessageAlert"
import ConfirmMsgDialog from '../common/ConfirmMsgDialog';

export default function CodeGroupsListComponent(props) {
  const useAlert = useMessageAlert();
  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    dispatch(resetSelectedItem())
  }, []);

  const retrieve = ({ searchValue, paging }) => getList(searchValue, paging.currentPage, paging.rowsPerPage)
    .then(({ data }) => {
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
    }).catch(error => useAlert.showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'CodeGroupsListComponent.retrieve', 'CodeGroupsService.getList'))


  const doRetrieve = () => retrieve({
    searchValue: currPageable.searchValue,
    paging: currPageable.paging
  })

  const doEdit = (selected) => {
    dispatch(setSelectedItem(selected))
    props.history.push(`${PAGE_URL.CODE_GROUPS_DETAIL_URL}`);
  }

  const doNew = () => props.history.push(`${PAGE_URL.CODE_GROUPS_DETAIL_URL}/-1`)

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
    .catch(error => useAlert.showErrorMsgAlert(error, ERROR_CODE.DELETE_ERROR, 'CodeGroupsListComponent.doDelete', 'CodeGroupsService.deleteItem'))

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
      field: 'code',
      headerName: 'Code',
    },
    {
      field: 'value',
      headerName: 'Value',
    },
    {
      field: 'description',
      headerName: 'Description',
    },
    {
      field: 'priority',
      headerName: 'Priority',
    }
  ]

  return (
    <>
      <TitleComponent>Code Groups List</TitleComponent>
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



