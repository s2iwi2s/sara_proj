import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Typography } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import WarningIcon from '@material-ui/icons/Warning';

import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils';
import GradeLevelPayablesService from '../../api/GradeLevelPayablesService';
import AccountPayablesSettingsList from './AccountPayablesSettingsList'
import CustomTableGrid from '../common/CustomTableGrid';
import SelectGrid from '../common/SelectGrid';

let renderCount = 0;

export default function GradeLevelPayablesDetailsComponent(props) {

  const history = useHistory();
  const [message, setMessage] = useState('Loading. Please wait...');

  const [store, setStore] = useState({
    INIT_STATUS: ((props.match.params.id === -1) ? INIT_STATUS.INIT : INIT_STATUS.LOAD),
    'id': props.match.params.id,
    level: { id: '' },
    active: true,
    list: [],
    listService: {
      levelList: []
    }
  });

  useEffect(() => {
    console.log(`[GradeLevelPayablesDetailsComponent.useEffect] store==>`, store)
    // console.log(`[GradeLevelPayablesDetailsComponent.useEffect] userObj==>`, userObj)
    if (store.INIT_STATUS === INIT_STATUS.LOAD) {
      retrieve();
    }
    store.INIT_STATUS = INIT_STATUS.DONE;
  }, [store]);


  const getBlankDetails = () => {
    return {
      'message': '',
      'id': '',
      list: []
    }
  }

  const changeSelectState = (e) => {
    const { name, value } = e.target
    console.log(`[GradeLevelPayablesDetailsComponent.changeSelectState] name=${name}, value=${value}`)

    setStore({
      ...store,
      [name]: { id: value }
    });
    console.log(`[GradeLevelPayablesDetailsComponent.changeSelectState] store=>`, store)
  }
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setStore({ 
      ...store, 
      [name]: checked });
  };


  const retrieve = () => {
    console.log(`[GradeLevelPayablesDetailsComponent.retrieve] id==>${props.match.params.id}`)
    setMessage('Loading. Please wait...');
    GradeLevelPayablesService.get(props.match.params.id)
      .then(response => {
        console.log(`[GradeLevelPayablesDetailsComponent.retrieve] response==>`, response)
        let thestate = getBlankDetails();
        if (props.match.params.id !== -1) {
          let list = response.data.entity.accountPayablesSettings ? response.data.entity.accountPayablesSettings : []
          let applyToAllList = response.data.listService.applyToAllList;
          if (list.length === 0) {
            list = [...applyToAllList]
          } else {
            let temp = [];
            let tempList = [];
            list.map(({ id }) => {
              temp.push(id);
            });
            applyToAllList.map((row) => {
              if (temp.indexOf(row.id) === -1) {
                let rowTemp = {
                  ...row,
                  status: 'NEW'
                }
                tempList.push(rowTemp)
              }
            });

            let tempList2 = [
              ...tempList,
              ...list
            ];
            list = tempList2;
          }
          let level = response.data.entity.level
          if (!level) {
            level = { id: '' }
          }
          thestate = {
            ...store,
            ...response.data.entity,
            level: level,
            list: list,
            listService: response.data.listService
          }
        }
        thestate.INIT_STATUS = INIT_STATUS.RESET;

        console.log(`[GradeLevelPayablesDetailsComponent.retrieve] initFormData thestate==>`, thestate)
        setMessage('');
        setStore(thestate)
        console.log(`[GradeLevelPayablesDetailsComponent.retrieve] store==>`, store)
      }).catch(error => setError(error, ERROR_CODE.RETRIEVE_ERROR, 'GradeLevelPayablesDetailsComponent.retrieve', 'GradeLevelPayablesService.get'));
  }
  const setError = (error, errorCode, formMethod, serviceName) => {
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName);
    setMessage(errMsg);
  }

  const save = (e) => {
    e.preventDefault();

    let data = {
      id: store.id,
      level: store.level,
      active: store.active,
      accountPayablesSettings: store.list
    }
    console.log(`[GradeLevelPayablesDetailsComponent.save] data==>`, data)
    GradeLevelPayablesService.save(data).then(response => {
      console.log(`[GradeLevelPayablesDetailsComponent.save] response==>`, response)
      history.push(PAGE_URL.GRADE_LEVEL_PAYABLES_LIST);
    }).catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'GradeLevelPayablesDetailsComponent.save', 'GradeLevelPayablesService.save'));
  }

  const setGradeLevelPayables = (data) => {
    console.log(`[GradeLevelPayablesDetailsComponent.setGradeLevelPayables] row==>`, data)

    let list = [...store.list]
    let exist = false;
    list.map(row => {
      if (row.id === data.id) {
        exist = true
      }
    });
    if (!exist) {
      let temp = {
        ...data,
        status: 'NEW'
      }
      list.push(temp);
      setStore({
        ...store,
        list: list
      });
    }
  }

  const doDeleteItem = (id) => {
    let list = [...store.list];
    let i = -1;
    list.map((row, index) => {
      if (row.id === id) {
        i = index;
      }
    });
    if (i !== -1) {
      list.splice(i, 1);
    }
    setStore({
      ...store,
      list: list
    });
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
      {console.log(`[GradeLevelPayablesDetailsComponent.render] renderCount=${renderCount} store==>`, store)}
      <Typography variant="h4">Grade Level Payables</Typography>
      {message && <Alert severity="info">{message}</Alert>}


      <form onSubmit={e => save(e)}>
        <GridActionButtons />

        <Box pb={3}>
          <Grid container spacing={3}>
            <SelectGrid sm={3} name="level" label="Level" value={store.level.id} options={store.listService.levelList}
              onChange={e => changeSelectState(e)} />
            <Grid item xs={12} sm={12}>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="true"
                  control={<Checkbox checked={store.active} onChange={e => handleCheckboxChange(e)} name="active" />}
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
              store={store}
              cols={cols}
              showAction={false}
              showPaging={false}
              showSearch={false}
              // list={this.state.list}
              // searchValue={this.state.searchValue}
              // paging={this.state.paging}
              // onChangePage={doHandleChangePage}
              // onChangeRowsPerPage={doHandleChangeRowsPerPage}
              // doRetrieve={() => { }}
              // doEdit={() => { }}
              // doDelete={() => { }}
              // doSearch={() => { }}
            />
          </Box>
          <GridActionButtons />
        </Box>

        <AccountPayablesSettingsList setGradeLevelPayables={setGradeLevelPayables} />

      </form>

    </ >
  )
}


