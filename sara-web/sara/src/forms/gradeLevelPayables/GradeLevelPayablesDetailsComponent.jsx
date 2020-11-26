import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Button, Checkbox, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils';
import { useAuth } from '../../security/AuthenticationProvider';
import GradeLevelPayablesService from '../../api/GradeLevelPayablesService';

let renderCount = 0;

export default function GradeLevelPayablesDetailsComponent(props) {

  const history = useHistory();
  const { control, register, handleSubmit, reset } = useForm({

  });
  const [userObj] = useAuth();
  const [message, setMessage] = useState('Loading. Please wait...');

  const [store, setStore] = useState({
    INIT_STATUS: ((props.match.params.id === -1) ? INIT_STATUS.INIT : INIT_STATUS.LOAD),
    'id': props.match.params.id,
    'listService': {
      'paymentPeriodList': []
    }
  });


  useEffect(() => {
    console.log(`[GradeLevelPayablesDetailsComponent.useEffect] store==>`, store)
    // console.log(`[GradeLevelPayablesDetailsComponent.useEffect] userObj==>`, userObj)
    if (store.INIT_STATUS === INIT_STATUS.LOAD) {
      retrieve();
    }
    if (store.INIT_STATUS === INIT_STATUS.RESET) {
      console.log(`[GradeLevelPayablesDetailsComponent.useEffect] from status = RESET store==>`, store)
      reset(store)
    }
    store.INIT_STATUS = INIT_STATUS.DONE;
  }, [store]);


  const getBlankDetails = () => {
    return {
      'message': '',
      'id': '',
      'listService': {
        'levelList': []
      }
    }
  }
  const retrieve = () => {
    console.log(`[GradeLevelPayablesDetailsComponent.retrieve] id==>${props.match.params.id}`)
    setMessage('Loading. Please wait...');
    GradeLevelPayablesService.get(props.match.params.id)
      .then(response => {
        console.log(`[GradeLevelPayablesDetailsComponent.retrieve] response==>`, response)
        let thestate = getBlankDetails();
        if (props.match.params.id !== -1) {
          thestate = {
            ...store,
            ...response.data.entity,
            listService: response.data.listService
          }
        }
        thestate.INIT_STATUS = INIT_STATUS.RESET;
        initFormData(thestate);
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

  const save = (data) => {
    console.log(`[GradeLevelPayablesDetailsComponent.save] data==>`, data)
    GradeLevelPayablesService.save(data).then(response => {
      console.log(`[GradeLevelPayablesDetailsComponent.save] response==>`, response)
      history.push(PAGE_URL.GRADE_LEVEL_PAYABLES_LIST);
    }).catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'GradeLevelPayablesDetailsComponent.save', 'GradeLevelPayablesService.save'));
  }

  const initFormData = (data) => {
    if (!data.listService.paymentPeriodList) {
      data.listService.paymentPeriodList = [];
    }
    if (!data.paymentPeriod) {
      data.paymentPeriod = {
        id: ''
      }
    }
  }

  renderCount++;
  return (
    <>
      {console.log(`[GradeLevelPayablesDetailsComponent.render] renderCount=${renderCount} store==>`, store)}
      <Typography variant="h4">Grade Level Payables</Typography>
      {message && <Alert severity="info">{message}</Alert>}


      <form onSubmit={handleSubmit(save)}>
        <div>{renderCount}</div>

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

        <TextField type="hidden"
          name="id"
          inputRef={register}
          defaultValue={store.id}
        />


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

      </form>

    </ >
  )
}


