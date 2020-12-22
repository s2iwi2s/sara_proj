import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Button, Grid, TextField, Typography } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';


import CodeGroupsService from '../../api/codeGroups/CodeGroupsService';
import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils';
import { useAuth } from '../../providers/AuthenticationProvider';
import Alert from '@material-ui/lab/Alert';

export default function CodeGroupsDetailComponent(props) {

  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const [userObj] = useAuth();
  const [message, setMessage] = useState('Loading. Please wait...');

  const [store, setStore] = useState({
    INIT_STATUS: ((props.match.params.id === -1) ? INIT_STATUS.INIT : INIT_STATUS.LOAD),
    'school': { 'id': userObj.schoolId },
    'id': props.match.params.id,
    'priority': 1,
    'code': '',
    'value': '',
    'description': '',
    'json': '',
    'listService': {}
  });


  useEffect(() => {
    console.log(`[CodeGroupsDetailComponent.useEffect] store==>`, store)
    console.log(`[CodeGroupsDetailComponent.useEffect] userObj==>`, userObj)
    //retrieve();
    if (store.INIT_STATUS === INIT_STATUS.LOAD) {
      retrieve();
    } if (store.INIT_STATUS === INIT_STATUS.RESET) {
      reset(store)
    }
  }, [store]);


  const getBlankDetails = () => {
    return {
      'message': '',
      'school': { 'id': userObj.schoolId },
      'id': '',
      'priority': 1,
      'code': '',
      'value': '',
      'description': '',
      'json': '',
      'optionsList': {}
    }
  }
  const retrieve = () => {
    console.log(`[CodeGroupsDetailComponent.retrieve] id==>${props.match.params.id}`)
    setMessage('Loading. Please wait...');
    CodeGroupsService.get(props.match.params.id)
      .then(response => {
        console.log(`[CodeGroupsDetailComponent.retrieve] response==>`, response)
        let thestate = getBlankDetails();
        if (props.match.params.id !== -1) {
          thestate = response.data.entity;
        }
        thestate.school = { 'id': userObj.schoolId };
        thestate.INIT_STATUS = INIT_STATUS.RESET;

        //thestate.optionsList = response.data.optionsList
        setStore(thestate)
        setMessage('');
        console.log(`[CodeGroupsDetailComponent.retrieve] store==>`, store)
      }).catch(error => setError(error, ERROR_CODE.RETRIEVE_ERROR, 'CodeGroupsDetailComponent.retrieve', 'CodeGroupsService.get'));
  }
  const setError = (error, errorCode, formMethod, serviceName) => {
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName);
    setMessage(errMsg);
  }

  function save(data) {
    console.log(`[CodeGroupsDetailComponent.save] data==>`, data)
    CodeGroupsService.save(data).then(response => {
      console.log(`[CodeGroupsDetailComponent.save] response==>`, response)
      history.push(PAGE_URL.CODE_GROUPS_LIST);
    }).catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'CodeGroupsDetailComponent.save', 'CodeGroupsService.save'));
  }

  return (
    <>
      {console.log(`[CodeGroupsDetailComponent.render] store==>`, store)}
      <Typography variant="h4">Code Groups Detail</Typography>
      {message && <Alert severity="info">{message}</Alert>}


      <form onSubmit={handleSubmit(save)}>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Save</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" href={PAGE_URL.CODE_GROUPS_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={() => history.push(PAGE_URL.CODE_GROUPS_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
          </Grid>
        </Grid>

        <TextField type="hidden"
          name="id"
          inputRef={register}
          defaultValue={store.id}
        />
        <TextField type="hidden"
          name="school.id"
          inputRef={register}
          defaultValue={store.school.id}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="code"
              name="code"
              label="Code"
              fullWidth
              autoComplete="code-groups-code"
              autoFocus
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={store.code}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="value"
              name="value"
              label="Value"
              fullWidth
              autoComplete="code-groups-value"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={store.code}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              required
              type="number"
              id="priority"
              name="priority"
              label="priority"
              fullWidth
              autoComplete="code-groups-priority"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={store.priority}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              fullWidth
              autoComplete="code-groups-description"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={store.description}
            />
            <Grid item xs={12} sm={12}>&nbsp;</Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                multiline
                rows={4}
                id="json"
                name="json"
                label="JSON"
                fullWidth
                autoComplete="code-groups-json"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                inputRef={register}
                defaultValue={store.json}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Save</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" href={PAGE_URL.CODE_GROUPS_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={() => history.push(PAGE_URL.CODE_GROUPS_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
          </Grid>
        </Grid>

      </form>

    </ >
  )
}


