import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';


import { PAGE_URL, INIT_STATUS } from '../../api/Utils'
import CustomTableGrid from '../common/CustomTableGrid';

import { deleteItem, getList } from '../../api/endUser/EndUserService';
import { resetSelectedItem, selectPageable, setPageable, setSelectedItem } from '../../api/endUser/UsersSlice';
export default function EndUserListComponent(props) {
  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)

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
    })

  const doRetrieve = () => retrieve({
    searchValue: currPageable.searchValue,
    paging: currPageable.paging
  })
  const doEdit = (selected) => {
    dispatch(setSelectedItem(selected))
    props.history.push(`${PAGE_URL.USER_DETAIL_URL}`);
  }

  const doNew = () => {
    dispatch(resetSelectedItem())
    props.history.push(`${PAGE_URL.USER_DETAIL_URL}/-1`);
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
      field: 'firstName',
      headerName: 'First Name',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      render: function (row) {
        return row.firstName + ' ' + row.lastName;
      }
    }
  ];

  return (
    <>
      <Box pb={3}><Typography variant="h4">Users</Typography></Box>
      <CustomTableGrid
        store={currPageable}
        cols={cols}
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

