import React, { useEffect, useState } from 'react'


import { ERROR_CODE, INIT_STATUS, OPTIONS, PAGE_URL } from '../../api/Utils'
import { deleteItem, getList } from '../../api/school/SchoolService'
import CustomTableGrid from '../common/CustomTableGrid'

import { useSelector, useDispatch } from 'react-redux'
import { resetSelectedItem, selectPageable, setPageable, setSelectedItem, } from '../../api/school/SchoolSlice'
import TitleComponent from '../common/TitleComponent'
import { useMessageAlert } from "../../api/useMessageAlert"
import ConfirmMsgDialog from '../common/ConfirmMsgDialog'

export default function SchoolListComponent(props) {
  const [,
    ,
    showErrorMsgAlert,
    ,
    ,
    ,
  ] = useMessageAlert();
  const dispatch = useDispatch()
  const currPageableSchools = useSelector(selectPageable)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    dispatch(resetSelectedItem())
  }, [])

  const retrieve = ({ searchValue, paging }) =>
    getList(searchValue, paging.currentPage, paging.rowsPerPage).then(
      ({ data }) =>
        dispatch(
          setPageable({
            INIT_STATUS: INIT_STATUS.LOAD,
            list: data.pagingList.content,
            searchValue: searchValue,
            paging: {
              rowsPerPage: data.pagingList.size,
              currentPage: data.pagingList.pageable.pageNumber,
              totalElements: data.pagingList.totalElements,
              totalPage: data.pagingList.totalPage,
            },
          })
        )).catch(error => showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'SchoolListComponent.retrieve', 'SchoolService.getList'))



  const doRetrieve = () =>
    retrieve({
      searchValue: currPageableSchools.searchValue,
      paging: currPageableSchools.paging,
    })

  const doEdit = (selected) => {
    dispatch(setSelectedItem(selected))
    props.history.push(`${PAGE_URL.SCHOOL_DETAIL_URL}`)
  }

  const doNew = () => {
    dispatch(resetSelectedItem())
    props.history.push(`${PAGE_URL.SCHOOL_DETAIL_URL}/-1`)
  }

  const doCloseConfirmDelete = () => {
    setDeleteDialogOpen(false)
  }
  const doShowConfirmDelete = (id) => {
    setDeleteId(id)
    setDeleteDialogOpen(true)
  }
  const setDeleteDialogSelection = (value) => {
    console.log(`[SchoolListComponent.setDeleteDialogSelection] value=${value}`);
    if (value === OPTIONS.YES) {
      doDelete(deleteId)
    }
    setDeleteId(null)
  }
  const doDelete = (id) =>
    deleteItem(id)
      .then(doRetrieve())
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'SchoolListComponent.retrieve', 'SchoolService.getList'))

  const doHandleChangePage = (e, newPage) =>
    retrieve({
      searchValue: currPageableSchools.searchValue,
      paging: {
        ...currPageableSchools.paging,
        currentPage: newPage,
      },
    })

  const doHandleChangeRowsPerPage = (e) =>
    retrieve({
      searchValue: currPageableSchools.searchValue,
      paging: {
        ...currPageableSchools.paging,
        rowsPerPage: e.target.value,
        currentPage: 0,
      },
    })

  const doSearch = (searchValue) =>
    retrieve({
      searchValue: searchValue,
      paging: {
        ...currPageableSchools.paging,
      },
    })

  const cols = [
    {
      field: 'name',
      headerName: 'Name',
    },
    {
      headerName: 'Current Period',
      render: function (row) {
        return row.currentPeriod ? row.currentPeriod.description : ''
      }
    },
    {
      field: 'logo',
      headerName: 'Logo',
    },
  ]

  return (
    <>
      <TitleComponent>Schools</TitleComponent>

      <CustomTableGrid
        store={currPageableSchools}
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
    </>
  )
}
