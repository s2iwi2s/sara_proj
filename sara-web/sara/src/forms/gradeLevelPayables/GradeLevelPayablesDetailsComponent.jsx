import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import WarningIcon from '@material-ui/icons/Warning';

import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils';
import GradeLevelAccountPayablesSettingsListComponent from './GradeLevelAccountPayablesSettingsListComponent'
import CustomTableGrid from '../common/CustomTableGrid';
import SelectGrid from '../common/SelectGrid';
import { save, getOptions } from '../../api/gradeLevelPayables/GradeLevelPayablesService';
import { selectSelectedItem, setOptionsList, updateSelectedItem, resetSelectedItem, setPageableEntity } from '../../api/gradeLevelPayables/GradeLevelSlice';
import TitleComponent from '../common/TitleComponent';
import { useMessageAlert } from "../../api/useMessageAlert"

let renderCount = 0;

export default function GradeLevelPayablesDetailsComponent(props) {
  const [,
    ,
    showErrorMsgAlert,
    ,
    ,
    ,
  ] = useMessageAlert();

  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState('Loading. Please wait...');

  const selectedItem = useSelector(selectSelectedItem)
  const [status, setStatus] = useState(INIT_STATUS.INIT);

  useEffect(() => {
    if (status === INIT_STATUS.INIT) {

      if (props.match.params.id === -1) {
        dispatch(resetSelectedItem())
      }
      setStatus(INIT_STATUS.LOAD)
    } else if (status === INIT_STATUS.LOAD) {
      onRetrieve()
      setStatus(INIT_STATUS.RESET)
    }

  }, [selectedItem, status]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target

    console.log(`[GradeLevelPayablesDetailsComponent.handleCheckboxChange] name=${name}, checked=${checked}`)
    dispatch(updateSelectedItem({
      [name]: checked
    }))
  };

  const onRetrieve = () => {
    console.log(`[GradeLevelPayablesDetailsComponent.onRetrieve]  props.match.params.id==>${props.match.params.id}`)

    if (props.match.params.id === -1) {
      dispatch(resetSelectedItem())
    }
    setMessage(`Loading. Please wait...`);
    getOptions().then(response => onRetrieveResponseAction(response))
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.RETRIEVE_ERROR, 'GradeLevelPayablesDetailsComponent.onRetrieve', 'GradeLevelPayablesService.getOptions'));
  }

  const onRetrieveResponseAction = (response) => {
    console.log(`[GradeLevelPayablesDetailsComponent.onRetrieveResponseAction]  response==>`, response)
    dispatch(setOptionsList(response.data.listService))
    setMessage(``);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();

    setMessage(``);
    save({
      id: selectedItem.id,
      level: selectedItem.level,
      period: selectedItem.period,
      active: selectedItem.active,
      accountPayablesSettings: selectedItem.list
    })
      .then(response => {
        dispatch(setPageableEntity(response.data.entity))
        history.push(PAGE_URL.GRADE_LEVEL_PAYABLES_LIST)
      })
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.SAVE_ERROR, 'GradeLevelPayablesDetailsComponent.onSubmitForm', 'GradeLevelPayablesService.save'));
  }

  const setGradeLevelPayables = (data) => {
    console.log(`[GradeLevelPayablesDetailsComponent.setGradeLevelPayables] data==>`, data)

    let list = [...selectedItem.list]
    if (list.filter(row => row.id === data.id).length === 0) {
      let temp = {
        ...data,
        status: 'NEW'
      }
      list.push(temp);
      dispatch(updateSelectedItem({
        list: list
      }))
    }
  }

  const doDeleteItem = (id) => dispatch(updateSelectedItem({
    list: [...selectedItem.list.filter(item => item.id !== id)]
  }))

  const changeSelectState = (e) => {
    const { name, value } = e.target
    console.log(`[GradeLevelPayablesDetailsComponent.changeSelectState] name=${name}, value=${value}`)
    dispatch(updateSelectedItem({
      [name]: { id: value }
    }))
  }

  const GridActionButtons = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
        </Grid>
        <Grid item xs={12} sm={1}>
          <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Save</Button>
        </Grid>
        <Grid item xs={12} sm={1}>
          <Button variant="contained" href={PAGE_URL.GRADE_LEVEL_PAYABLES_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
        </Grid>
        <Grid item xs={12} sm={1}>
          <Button variant="contained" onClick={() => history.push(PAGE_URL.GRADE_LEVEL_PAYABLES_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
        </Grid>
      </Grid>
    );
  }

  const cols = [{
    field: 'description',
    headerName: 'Description',
    render: function (row) {
      return (<>
        {row.status === 'NEW' && <>{row.description} <WarningIcon fontSize="small" /></>}
        {row.status !== 'NEW' && row.description}
      </>);
    }
  },
  {
    headerName: 'Payment Period',
    render: function (row) {
      return row.paymentPeriod.description;
    }
  },
  {
    field: 'amount',
    headerName: 'Amount',
  },
  {
    field: 'priority',
    headerName: 'Priority',
  },
  {
    headerName: 'Action',
    render: function (row) {
      return (<IconButton aria-label="add" onClick={() => doDeleteItem(row.id)}>
        <DeleteIcon fontSize="large" />
      </IconButton>);
    }
  }
  ];
  renderCount++;
  return (
    <>
      {console.log(`[GradeLevelPayablesDetailsComponent.render] renderCount=${renderCount} selectedItem==>`, selectedItem)}
      <TitleComponent>Grade Level Payables</TitleComponent>
      {message && <Alert severity="info">{message}</Alert>}


      <form onSubmit={e => onSubmitForm(e)}>
        <GridActionButtons />

        <Box pb={3}>
          <Grid container spacing={3}>
            <SelectGrid sm={2} required name="level" label="Level" value={selectedItem.level.id} options={selectedItem.optionsList.levelList}
              onChange={e => changeSelectState(e)} />

            <SelectGrid sm={3} required name="period" label="Period" value={selectedItem.period.id} options={selectedItem.optionsList.periodList}
              onChange={e => changeSelectState(e)} />

            <Grid item xs={12} sm={2}>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="true"
                  control={<Checkbox checked={selectedItem.active} onChange={e => handleCheckboxChange(e)} name="active" />}
                  label="Active"
                  labelPlacement="end"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
        <Box py={3}>
          <Box pb={3}>
            <CustomTableGrid
              store={selectedItem}
              cols={cols}
              showAction={false}
              showPaging={false}
              showSearch={false}
            />
          </Box>
          <GridActionButtons />
        </Box>

        <GradeLevelAccountPayablesSettingsListComponent setGradeLevelPayables={setGradeLevelPayables} selectedItem={selectedItem} />

      </form>

    </ >
  )
}


