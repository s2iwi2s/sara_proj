import React, { useEffect } from 'react'

import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'

import { INIT_STATUS, PAGE_URL } from '../../api/Utils'
import { deleteItem, getList } from '../../api/school/SchoolService'
import CustomTableGrid from '../common/CustomTableGrid'

import { useSelector, useDispatch } from 'react-redux'
import { resetSelectedItem, selectPageable, setPageable, setSelectedItem, } from '../../api/school/SchoolSlice'

export default function SchoolListComponent(props) {
  const dispatch = useDispatch()
  const currPageableSchools = useSelector(selectPageable)

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
        )
    )

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

  const doDelete = (id) =>
    deleteItem(id).then(doRetrieve())

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
      field: 'schoolYear',
      headerName: 'School Year',
    },
    {
      field: 'logo',
      headerName: 'Logo',
    },
  ]

  return (
    <>
      <Box pb={3}>
        <Typography variant='h4'>Schools</Typography>
      </Box>

      <CustomTableGrid
        store={currPageableSchools}
        cols={cols}
        onChangePage={doHandleChangePage}
        onChangeRowsPerPage={doHandleChangeRowsPerPage}
        doRetrieve={doRetrieve}
        doEdit={doEdit}
        doNew={doNew}
        doDelete={doDelete}
        doSearch={doSearch}
      />
    </>
  )
}
