import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Button, Grid, TextField, Typography } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';


import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils';
import { save } from '../../api/school/SchoolService';


import { selectSelectedItem, setSelectedItem, setPageableEntity } from '../../api/school/SchoolSlice';
import { useGlobalVariable } from '../../providers/GlobalVariableProvider';

export default function SchoolDetailComponent(props) {
  const [globalProps, setGlobalProps, showErrorAlert, showInfoAlert, showWarningAlert, showSuccessAlert] = useGlobalVariable();

  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [message, setMessage] = useState('Loading. Please wait...');
  const [status, setStatus] = useState(INIT_STATUS.INIT);

  const selectedItem = useSelector(selectSelectedItem)

  useEffect(() => {
    console.log(`[SchoolDetailComponent.useEffect] status=${status}, selectedItem==>`, selectedItem)

    if (status === INIT_STATUS.INIT) {
      if (props.match.params.id == -1) {
        dispatch(setSelectedItem({}))
      }
      setMessage('');
      setStatus(INIT_STATUS.LOAD)
    }
  }, [selectedItem]);


  const setError = (error, errorCode, formMethod, serviceName) => {
    console.error(`[SchoolDetailComponent.setError]  error=`, error)
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName)
    showErrorAlert(errMsg)
  }

  const onSubmitForm = (data) => save(data)
    .then(response => dispatch(setPageableEntity(response.data.entity)))
    .then(history.push(PAGE_URL.SCHOOL_LIST))
    .catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'SchoolDetailComponent.save', 'SchoolService.save'))


  return (
    <>
      {console.log(`[SchoolDetailComponent.render] selectedItem==>`, selectedItem)}
      <Typography variant="h4">School Detail</Typography>
      {message && <Alert severity="info">{message}</Alert>}


      <form onSubmit={handleSubmit(onSubmitForm)}>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Save</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" href={PAGE_URL.SCHOOL_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={() => history.push(PAGE_URL.SCHOOL_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
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
              id="name"
              name="name"
              label="Name"
              fullWidth
              autoComplete="school-name"
              autoFocus
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={selectedItem.name}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              required
              id="schoolYear"
              name="schoolYear"
              label="School Year"
              fullWidth
              autoComplete="school-schoolYear"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={selectedItem.schoolYear}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="logo"
              name="logo"
              label="Logo"
              fullWidth
              autoComplete="school-logo"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={selectedItem.logo}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete="school-address"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={selectedItem.address}
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
            <Button variant="contained" href={PAGE_URL.SCHOOL_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={() => history.push(PAGE_URL.SCHOOL_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
          </Grid>
        </Grid>

      </form>

    </ >
  )
}


