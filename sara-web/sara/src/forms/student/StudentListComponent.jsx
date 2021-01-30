import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { ERROR_CODE, INIT_STATUS, OPTIONS, PAGE_URL } from '../../api/Utils';
import CustomTableGrid from '../common/CustomTableGrid';

import { deleteItem, getList } from '../../api/student/StudentService'
import { resetSelectedItem, selectPageable, setPageable, setSelectedItem } from '../../api/student/StudentSlice';
import TitleComponent from '../common/TitleComponent';
import { useMessageAlert } from "../../api/useMessageAlert"
import ConfirmMsgDialog from '../common/ConfirmMsgDialog';

export default function StudentListComponent(props) {
  const useAlert = useMessageAlert();

  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    dispatch(resetSelectedItem())
  }, [currPageable]);

  const retrieve = ({ searchValue, paging }) =>
    getList(searchValue, paging.currentPage, paging.rowsPerPage)
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
      }).catch(error => useAlert.showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'StudentListComponent.retrieve', 'StudentService.getList'))



  const doRetrieve = () => {
    retrieve({
      searchValue: currPageable.searchValue,
      paging: currPageable.paging
    })
  }
  const doEdit = (selected) => {
    dispatch(setSelectedItem(selected))
    props.history.push(`${PAGE_URL.STUDENT_DETAIL_URL}`);
  }

  const doNew = () => {
    props.history.push(`${PAGE_URL.STUDENT_DETAIL_URL}/-1`);
  }

  const doCloseConfirmDelete = () => {
    setDeleteDialogOpen(false)
  }
  const doShowConfirmDelete = (id) => {
    setDeleteId(id)
    setDeleteDialogOpen(true)
  }
  const setDeleteDialogSelection = (value) => {
    console.log(`[StudentListComponent.setDeleteDialogSelection] value=${value}`);
    if (value === OPTIONS.YES) {
      doDelete(deleteId)
    }
    setDeleteId(null)
  }
  const doDelete = (id) => {
    deleteItem(id)
      .then(doRetrieve)
      .catch(error => useAlert.showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'StudentListComponent.doDelete', 'StudentService.deleteItem'))
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

  const cols = [
    // {
    //   field: 'studentId',
    //   headerName: 'Student ID',
    // },
    {
      field: 'lrn',
      headerName: 'LRN',
    },
    {
      headerName: 'Name',
      render: function (row) {
        return <>
          {row.firstName} {row.lastName}
        </>
      }
    },
    {
      field: 'gender',
      headerName: 'Gender',
    },
    {
      headerName: 'Level',
      render: function (row) {
        return <>
          {row.level && row.level.description}
        </>
      }
    }
  ];

  return (
    <>
      <TitleComponent>Student List</TitleComponent>
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
  )

}




