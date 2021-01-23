import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid, MenuItem, TextField, Typography } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils';

import { selectSelectedItem, resetSelectedItem, setPageableEntity, setOptionsList } from '../../api/accountPayablesSettings/AccountPayablesSettingsSlice';
import { save, getOptions } from '../../api/accountPayablesSettings/AccountPayablesSettingsService';

let renderCount = 0;

export default function AccountPayablesSettingsDetailComponent(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const { control, register, handleSubmit } = useForm({
    'id': '',
    'description': 'test',
    'paymentPeriod': { 'id': '' },
    'amount': 0,
    'priority': 1,
    'applyToAll': true,
    'active': false
  });

  const [message, setMessage] = useState('Loading. Please wait...');

  const selectedItem = useSelector(selectSelectedItem)
  const [status, setStatus] = useState(INIT_STATUS.INIT);

  useEffect(() => {
    if (status === INIT_STATUS.INIT) {
      if (props.match.params.id == -1) {
        dispatch(resetSelectedItem())
      }
      setMessage('');
      setStatus(INIT_STATUS.LOAD)
    }
    if (status === INIT_STATUS.LOAD) {
      onRetrieve()
      setStatus(INIT_STATUS.DONE)
    }
  }, [selectedItem, status]);

  const onRetrieve = () => {
    console.log(`[AccountPayablesSettingsDetailComponent.onRetrieve]  props.match.params.id==>${props.match.params.id}`)
    setMessage(`Loading. Please wait...`);
    if (props.match.params.id == -1) {
      dispatch(resetSelectedItem())
    }
    getOptions()
      .then(response => dispatch(setOptionsList(response.data.listService)))
      .then(setMessage(``))
      .catch(error => setError(error, ERROR_CODE.RETRIEVE_ERROR, 'AccountPayablesSettingsDetailComponent.onRetrieve', 'AccountPayablesSettingsService.getOptions'));
  }

  const setError = (error, errorCode, formMethod, serviceName) => setMessage(Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName))

  const doSave = data => save(data)
    .then(response => dispatch(setPageableEntity(response.data.entity)))
    .then(history.push(PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_LIST))
    .catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'CodeGroupsDetailComponent.save', 'CodeGroupsService.save'))

  renderCount++;
  return (
    <>
      {console.log(`[AccountPayablesSettingsDetailComponent.render] renderCount=${renderCount} selectedItem==>`, selectedItem)}
      <Typography variant="h4">Account Payables Settings Details</Typography>
      {message && <Alert severity="info">{message}</Alert>}

      <form onSubmit={handleSubmit(doSave)}>
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
          defaultValue={selectedItem.id}
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
              defaultValue={selectedItem.description}
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
                  {selectedItem.optionsList.paymentPeriodList.map(row => (
                    <MenuItem key={row.id} value={row.id}>{row.description}</MenuItem>
                  ))}
                </TextField>
              }
              name="paymentPeriod.id"
              control={control}
              defaultValue={selectedItem.paymentPeriod.id}
              options={selectedItem.optionsList.paymentPeriodList}
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
              defaultValue={selectedItem.priority}
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
              defaultValue={selectedItem.amount}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
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
              defaultValue={selectedItem.applyToAll}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
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
              defaultValue={selectedItem.active}
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


