import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { ERROR_CODE, INIT_STATUS, OPTIONS, PAGE_URL } from '../../api/Utils'
import CustomTableGrid from '../common/CustomTableGrid'
import { deleteItem, getList } from '../../api/gradeLevelPayables/GradeLevelPayablesService';
import { selectPageable, setPageable, setSelectedItem, resetSelectedItem } from '../../api/gradeLevelPayables/GradeLevelSlice';
import TitleComponent from '../common/TitleComponent';
import { useMessageAlert } from "../../api/useMessageAlert"
import ConfirmMsgDialog from '../common/ConfirmMsgDialog';

export default function GradeLevelPayablesListComponent(props) {
  const [,
    ,
    showErrorMsgAlert,
    ,
    ,
    ,
  ] = useMessageAlert();

  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

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

  return (
    <>
      <TitleComponent>Grade Level Payables List</TitleComponent>

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



