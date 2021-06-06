import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton } from '@material-ui/core'

import { Button, Grid } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import { ERROR_CODE, INIT_STATUS } from '../../api/Utils'
import { getList } from '../../api/accountPayablesSettings/AccountPayablesSettingsService'
import {
  selectPageable,
  setPageable,
  selectSelectedItem,
  setSelectedItem
} from '../../api/accountPayablesSettings/AccountPayablesSettingsSlice'
import useMessageAlert from '../../api/useMessageAlert'
import CustomTableGrid from '../common/CustomTableGrid'

export default function AccountPayablesSettingsParentComponent (props) {
  const dispatch = useDispatch()
  const selectedItem = useSelector(selectSelectedItem)

  const currPageable = useSelector(selectPageable)
  const { showErrorMsgAlert } = useMessageAlert()

  useEffect(() => {
    retrieve({
      searchValue: currPageable.searchValue,
      paging: {
        ...currPageable.paging
      },
      periodId: selectedItem.period.id
    })
  }, [])

  const retrieve = ({
    searchValue,
    paging,
    periodId = selectedItem.period.id
  }) =>
    getList(searchValue, paging.currentPage, paging.rowsPerPage, periodId, 'y')
      .then(({ data }) => {
        if (data.pagingList) {
          let list = data.pagingList.content
          list = list.filter(item => item.id !== selectedItem.id)
          return {
            ...data,
            pagingList: {
              ...data.pagingList,
              content: list
            }
          }
        }
        return data
      })
      .then(data =>
        dispatch(
          setPageable({
            INIT_STATUS: INIT_STATUS.LOAD,
            list: data.pagingList.content,
            searchValue: searchValue,
            paging: {
              rowsPerPage: data.pagingList.size,
              currentPage: data.pagingList.pageable.pageNumber,
              totalElements: data.pagingList.totalElements,
              totalPage: data.pagingList.totalPage
            }
          })
        )
      )
      .catch(error =>
        showErrorMsgAlert(
          error,
          ERROR_CODE.RETRIEVE_ERROR,
          'AccountPayablesSettingsParentComponent.retrieve',
          'AccountPayablesSettingsService.getList'
        )
      )

  const doRetrieve = () =>
    retrieve({
      searchValue: currPageable.searchValue,
      paging: currPageable.paging
    })

  const cols = [
    {
      field: 'description',
      headerName: 'Add',
      render: function (row) {
        return (
          <IconButton aria-label='add' onClick={() => setParent(row)}>
            <AddIcon fontSize='large' />
          </IconButton>
        )
      }
    },
    {
      field: 'description',
      headerName: 'Description'
    },
    {
      headerName: 'Period',
      render: function (row) {
        return row.period ? row.period.description : ''
      }
    },
    {
      field: 'amount',
      headerName: 'Amount'
    },
    {
      field: 'priority',
      headerName: 'Priority'
    }
  ]
  const setParent = row => {
    dispatch(
      setSelectedItem({
        ...selectedItem,
        parent: row
      })
    )
  }

  const removeParent = () => {
    setParent({ id: '' })
  }

  const doHandleChangePage = (e, newPage) =>
    retrieve({
      searchValue: currPageable.searchValue,
      paging: {
        ...currPageable.paging,
        currentPage: newPage
      }
    })

  const doHandleChangeRowsPerPage = e =>
    retrieve({
      searchValue: currPageable.searchValue,
      paging: {
        ...currPageable.paging,
        rowsPerPage: e.target.value,
        currentPage: 0
      }
    })

  const doSearch = searchValue =>
    retrieve({
      searchValue: searchValue,

      paging: {
        ...currPageable.paging
      }
    })

  return (
    <>
      <Box py={3}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            Parent:{' '}
            {selectedItem.parent ? selectedItem.parent.description : '<NONE>'}
            <Button
              color='primary'
              type='button'
              onClick={() => removeParent()}
              startIcon={<RemoveIcon />}
            ></Button>
          </Grid>

          <CustomTableGrid
            store={currPageable}
            cols={cols}
            onChangePage={doHandleChangePage}
            onChangeRowsPerPage={doHandleChangeRowsPerPage}
            doRetrieve={doRetrieve}
            doSearch={doSearch}
            showAction={false}
          />
        </Grid>
      </Box>
    </>
  )
}
