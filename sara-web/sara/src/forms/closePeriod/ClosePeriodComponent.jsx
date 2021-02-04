import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { Box, Button, Grid, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SaveIcon from '@material-ui/icons/Save';
import TitleComponent from "../common/TitleComponent";
import SelectGrid from "../common/SelectGrid";
import SubTitleComponent from "../common/SubTitleComponent";
import { ProcessingService } from "../../api/processing/ProcessingService";
import useMessageAlert from "../../api/useMessageAlert"
import { ERROR_CODE, INIT_STATUS, OPTIONS, PAGE_URL } from "../../api/Utils";
import { selectPageable, setPageable, setSelectedItem } from '../../api/processing/ProcessingSlice';
import CustomTableGrid from "../common/CustomTableGrid";
import ConfirmMsgDialog from "../common/ConfirmMsgDialog";

export default function ClosePeriodComponent(props) {

  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)

  const { getFormatedErrorMessage, showErrorMsgAlert, showErrorAlert } = useMessageAlert();
  const { deleteItem, getListClosePeriod, getOptions, saveClosePeriod } = ProcessingService()
  const [filter, setFilter] = useState({
    periodFrom: { id: '' },
    periodTo: { id: '' }
  });
  const [optionsList, setOptionsList] = useState({
    periodList: []
  });

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [message, setMessage] = useState('Loading. Please wait...');

  useEffect(() => {
    doInitOptions()
  }, []);


  const doInitOptions = () => {
    setMessage('Loading. Please wait...')
    getOptions().then(response => {
      console.log(`[ClosePeriodComponent.doInitOptions] response=>`, response)
      let list = {
        ...response.data.listService,
        periodList: [
          ...response.data.listService.periodList]
      }
      setMessage('')
      setOptionsList(list)
    })
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.RETRIEVE_ERROR, 'ClosePeriodComponent.onRetrieve', 'ClosePeriodComponent.getOptions'));
  }

  const doShowProcessConfirmDialog = () => {
    setMessage('')

    if (doValidateParameters()) {
      setConfirmDialogOpen(true)
    }

  }
  const doCloseProcessConfirmDialog = () => {
    setConfirmDialogOpen(false)
  }

  const setConfirmDialogSelection = (value) => {
    console.log(`[ClosePeriodComponent.setDeleteDialogSelection] value=${value}`);
    if (value === OPTIONS.OK) {
      doProcesses()
    }
  }
  const doValidateParameters = () => {
    let errorMsg = []

    if (!filter.periodFrom.id) {
      errorMsg.push('Invalid Period From')
    }
    if (!filter.periodTo.id) {
      errorMsg.push('Invalid Period To')
    }
    if (errorMsg.length == 0) {
      if (filter.periodFrom.id == filter.periodTo.id) {
        errorMsg.push('Invalid Period From and To. Period From and To should not be equal.')
      }
    }
    if (errorMsg.length > 0) {
      const msg = errorMsg.join(', ')
      setMessage(msg);
      //showErrorAlert(msg)
      return false;
    }

    return true
  }

  const doProcesses = () => {
    setMessage(`Process has started...`);
    saveClosePeriod({
      type: 'CLOSE_PERIOD',
      params: {
        fromPeriodId: filter.periodFrom.id,
        toPeriodId: filter.periodTo.id
      }
    }).then(request => {
      console.log(`[ClosePeriodComponent.changeSelectState] request=>`, request)

      setMessage(`Done processing! Please see message in the list below.`);
      doRetrieve()
    })
      .catch(error => {
        setMessage(getFormatedErrorMessage(error, ERROR_CODE.SAVE_ERROR, 'ClosePeriodComponent.onRetrieve', 'ClosePeriodComponent.save'));
        showErrorMsgAlert(error, ERROR_CODE.SAVE_ERROR, 'ClosePeriodComponent.onRetrieve', 'ClosePeriodComponent.save')
        doRetrieve()
      });
  }

  const changeSelectState = (e) => {
    const { name, value } = e.target
    console.log(`[ClosePeriodComponent.changeSelectState] name=${name}, value=${value}`)
    setFilter({
      ...filter,
      [name]: { id: value }
    })
    console.log(`[ClosePeriodComponent.changeSelectState]  filter=`, filter)
  }

  const retrieve = ({ searchValue, paging }) =>
    getListClosePeriod(searchValue, paging.currentPage, paging.rowsPerPage)
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
      }).catch(error => showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'ClosePeriodComponent.retrieve', 'ClosePeriodComponent.getListClosePeriod'))


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
    console.log(`[ClosePeriodComponent.setDeleteDialogSelection] value=${value}`);
    if (value === OPTIONS.YES) {
      doDelete(deleteId)
    }
    setDeleteId(null)
  }

  const doDelete = (id) => deleteItem(id)
    .then(doRetrieve)
    .catch(error => showErrorMsgAlert(error, ERROR_CODE.DELETE_ERROR, 'ClosePeriodComponent.doDelete', 'CodeGroupsService.deleteItem'))

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
      field: 'type',
      headerName: 'Type',
    }, {
      field: 'status',
      headerName: 'Status',
      render: function (row) {
        let status = row.status
        if (status === 'X') {
          status = 'Not Processed'
        } else if (status === 'P') {
          status = 'Pending'
        } else if (status === 'R') {
          status = 'Running'
        } else if (status === 'F') {
          status = 'Failed'
        } else if (status === 'C') {
          status = 'Completed'
        }
        return status
      }
    }, {
      field: 'statusMessage',
      headerName: 'Message',
    }, {
      headerName: 'User',
      render: function (row) {
        return row.user ? row.user.userName : ''
      }
    }, {
      headerName: 'Creation',
      render: function (row) {
        return row.createdDate ? moment(row.createdDate).format('lll') : ''
      }
    },
  ]

  return (
    <>
      {console.log(`[ClosePeriodComponent.return] `)}
      <TitleComponent>Close Period</TitleComponent>
      {message && <Alert severity="info">{message}</Alert>}
      <form>
        <Box py={5}>
          <Paper elevation={2} variant="elevation" >
            <Box pb={3} px={3}>
              <SubTitleComponent>Filter</SubTitleComponent>
              <Grid container spacing={3}>
                <SelectGrid sm={3} name="periodFrom" label="From Period" value={filter.periodFrom.id} options={optionsList.periodList}
                  onChange={e => changeSelectState(e)} />
                <SelectGrid sm={3} name="periodTo" label="To Period" value={filter.periodTo.id} options={optionsList.periodList}
                  onChange={e => changeSelectState(e)} />
              </Grid>
            </Box>
          </Paper>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" type="button" onClick={() => doShowProcessConfirmDialog()} startIcon={<SaveIcon />}>Process</Button>
          </Grid>
          <Grid item xs={12} sm={11}>
          </Grid>
        </Grid>

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
          type={OPTIONS.YESNO}
          title="Confirm delete"
          msg="Are you sure you want to delete?"
          closeDialog={doCloseConfirmDelete}
          setDialogSelection={setDeleteDialogSelection} />

        <ConfirmMsgDialog
          open={confirmDialogOpen}
          type={OPTIONS.OKCANCEL}
          title="Please confirm"
          msg="You are about to close the period. Do you wish to continue?"
          closeDialog={doCloseProcessConfirmDialog}
          setDialogSelection={setConfirmDialogSelection} />
      </form>
    </>
  )
}