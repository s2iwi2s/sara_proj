import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Button, Checkbox, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils';
import { useAuth } from '../../providers/AuthenticationProvider';
import AccountPayablesSettingsService from '../../api/AccountPayablesSettingsService';

let renderCount = 0;

export default function AccountPayablesSettingsDetailComponent(props) {

  const history = useHistory();
  const { control, register, handleSubmit, reset } = useForm({
    'id': '',
    'description': 'test',
    'paymentPeriod': { 'id': '' },
    'amount': 0,
    'priority': 1,
    'applyToAll': true,
    'active': false
  });
  const [userObj] = useAuth();
  const [message, setMessage] = useState('Loading. Please wait...');

  const [store, setStore] = useState({
    INIT_STATUS: ((props.match.params.id === -1) ? INIT_STATUS.INIT : INIT_STATUS.LOAD),
    'id': props.match.params.id,
    'description': '',
    'paymentPeriod': { 'id': '' },
    'amount': 0,
    'priority': 1,
    'applyToAll': false,
    'active': true,
    'listService': {
      'paymentPeriodList': []
    }
  });


  useEffect(() => {
    console.log(`[AccountPayablesSettingsDetailComponent.useEffect] store==>`, store)
    // console.log(`[AccountPayablesSettingsDetailComponent.useEffect] userObj==>`, userObj)
    if (store.INIT_STATUS === INIT_STATUS.LOAD) {
      retrieve();
    }
    if (store.INIT_STATUS === INIT_STATUS.RESET) {
      console.log(`[AccountPayablesSettingsDetailComponent.useEffect] from status = RESET store==>`, store)
      reset(store)
    }
    store.INIT_STATUS = INIT_STATUS.DONE;
  }, [store]);


  const getBlankDetails = () => {
    return {
      'message': '',
      'id': '',
      'description': '',
      'paymentPeriod': { 'id': '' },
      'amount': 0,
      'priority': 1,
      'applyToAll': false,
      'active': true,
      'listService': {
        'paymentPeriodList': []
      }
    }
  }
  const retrieve = () => {
    console.log(`[AccountPayablesSettingsDetailComponent.retrieve] 1 id==>${props.match.params.id}`)
    setMessage('Loading. Please wait...');
    AccountPayablesSettingsService.get(props.match.params.id)
      .then(response => {
        console.log(`[AccountPayablesSettingsDetailComponent.retrieve] 2 response==>`, response)
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
        console.log(`[AccountPayablesSettingsDetailComponent.retrieve] 3 initFormData thestate==>`, thestate)
        setMessage('');
        setStore(thestate)
        console.log(`[AccountPayablesSettingsDetailComponent.retrieve] 4 store==>`, store)
      }).catch(error => setError(error, ERROR_CODE.RETRIEVE_ERROR, 'AccountPayablesSettingsDetailComponent.retrieve', 'AccountPayablesSettingsService.get'));
  }
  const setError = (error, errorCode, formMethod, serviceName) => {
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName);
    setMessage(errMsg);
  }

  const save = (data) => {
    console.log(`[AccountPayablesSettingsDetailComponent.save] data==>`, data)
    AccountPayablesSettingsService.save(data).then(response => {
      console.log(`[AccountPayablesSettingsDetailComponent.save] response==>`, response)
      history.push(PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_LIST);
    }).catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'AccountPayablesSettingsDetailComponent.save', 'AccountPayablesSettingsService.save'));
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
      {console.log(`[AccountPayablesSettingsDetailComponent.render] renderCount=${renderCount} store==>`, store)}
      <Typography variant="h4">Account Payables Settings Details</Typography>
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
            <Button variant="contained" href={PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={() => history.push(PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
          </Grid>
        </Grid>

        <TextField type="hidden"
          name="id"
          inputRef={register}
          defaultValue={store.id}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              fullWidth
              autoComplete="account-payables-settings-description"
              autoFocus
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={store.description}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              as={
                <TextField id="paymentPeriod"
                  required
                  select
                  label="Payment Period"
                  fullWidth
                  autoComplete="paymentPeriod"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  inputRef={register}
                // error={!!errors.name}
                >
                  {store.listService.paymentPeriodList.map(row => (
                    <MenuItem key={row.id} value={row.id}>{row.description}</MenuItem>
                  ))}
                </TextField>
              }
              name="paymentPeriod.id"
              control={control}
              defaultValue={store.paymentPeriod.id}
              options={store.listService.paymentPeriodList}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              type="number"
              id="priority"
              name="priority"
              label="Priority"
              fullWidth
              autoComplete="account-payables-settings-priority"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={store.priority}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              type="number"
              id="amount"
              name="amount"
              label="Amount"
              fullWidth
              autoComplete="account-payables-settings-amount"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={store.amount}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Controller
              as={
                <TextField id="applyToAll"
                  required
                  select
                  label="Applicable to All"
                  fullWidth
                  autoComplete="applyToAll"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  inputRef={register}
                // error={!!errors.name}
                >
                  <MenuItem key={1} value={true}>Yes</MenuItem>
                  <MenuItem key={2} value={false}>No</MenuItem>
                </TextField>
              }
              name="applyToAll"
              control={control}
              defaultValue={store.applyToAll}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Controller
              as={
                <TextField id="active"
                  required
                  select
                  label="Active"
                  fullWidth
                  autoComplete="active"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  inputRef={register}
                // error={!!errors.name}
                >
                  <MenuItem key={1} value={true}>Yes</MenuItem>
                  <MenuItem key={2} value={false}>No</MenuItem>
                </TextField>
              }
              name="active"
              control={control}
              defaultValue={store.active}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Save</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" href={PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={() => history.push(PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
          </Grid>
        </Grid>

      </form>

    </ >
  )
}


