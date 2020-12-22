import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Button, Grid, TextField, Typography } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';


import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils';
import { useAuth } from '../../providers/AuthenticationProvider';
import SchoolService from '../../api/school/SchoolService';

export default function SchoolDetailComponent(props) {

  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const [userObj] = useAuth();
  const [message, setMessage] = useState('Loading. Please wait...');

  const [store, setStore] = useState({
    INIT_STATUS: ((props.match.params.id === -1) ? INIT_STATUS.INIT : INIT_STATUS.LOAD),
    'message': '',
    'id': props.match.params.id,
    'name': '',
    'schoolYear': '',
    'logo': '',
    'address': '',
    'optionsList': {}
  });


  useEffect(() => {
    console.log(`[SchoolDetailComponent.useEffect] store==>`, store)
    console.log(`[SchoolDetailComponent.useEffect] userObj==>`, userObj)
    //retrieve();
    if (store.INIT_STATUS === INIT_STATUS.LOAD) {
      retrieve();
    } if (store.INIT_STATUS === INIT_STATUS.RESET) {
      reset(store)
    }
  }, [store]);

  const retrieve = () => {
    console.log(`[SchoolDetailComponent.retrieve] id==>${props.match.params.id}`)
    setMessage('Loading. Please wait...');
    SchoolService.get(props.match.params.id)
      .then(response => {
        console.log(`[SchoolDetailComponent.retrieve] response==>`, response)
        let thestate = {
          ...store
        }
        if (props.match.params.id !== -1) {
          thestate = response.data.entity;
        }
        thestate.INIT_STATUS = INIT_STATUS.RESET;

        thestate.optionsList = response.data.optionsList
        setStore(thestate)
        setMessage('');
        console.log(`[SchoolDetailComponent.retrieve] store==>`, store)
      }).catch(error => setError(error, ERROR_CODE.RETRIEVE_ERROR, 'SchoolDetailComponent.retrieve', 'SchoolService.get'));
  }
  const setError = (error, errorCode, formMethod, serviceName) => {
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName);
    setMessage(errMsg);
  }

  function save(data) {
    console.log(`[SchoolDetailComponent.save] data==>`, data)
    SchoolService.save(data).then(response => {
      console.log(`[SchoolDetailComponent.save] response==>`, response)
      history.push(PAGE_URL.SCHOOL_LIST);
    }).catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'SchoolDetailComponent.save', 'SchoolService.save'));
  }

  return (
    <>
      {console.log(`[SchoolDetailComponent.render] store==>`, store)}
      <Typography variant="h4">School Detail</Typography>
      {message && <Alert severity="info">{message}</Alert>}


      <form onSubmit={handleSubmit(save)}>

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
          defaultValue={store.id}
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
              defaultValue={store.name}
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
              defaultValue={store.schoolYear}
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
              defaultValue={store.logo}
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
              defaultValue={store.description}
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


