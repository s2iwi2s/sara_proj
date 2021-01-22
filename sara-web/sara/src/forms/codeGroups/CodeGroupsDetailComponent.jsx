import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid, TextField, Typography } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils';

import { selectSelectedItem, resetSelectedItem, setPageableEntity } from '../../api/codeGroups/CodeGroupsSlice';
import { save } from '../../api/codeGroups/CodeGroupsService';

export default function CodeGroupsDetailComponent(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
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
  }, [selectedItem]);


  const setError = (error, errorCode, formMethod, serviceName) => setMessage(Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName))

  const doSave = data => save(data)
    .then(response => dispatch(setPageableEntity(response.data.entity)))
    .then(history.push(PAGE_URL.CODE_GROUPS_LIST))
    .catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'CodeGroupsDetailComponent.save', 'CodeGroupsService.save'))

  return (
    <>
      {console.log(`[CodeGroupsDetailComponent.render] selectedItem==>`, selectedItem)}
      <Typography variant="h4">Code Groups Detail</Typography>
      {message && <Alert severity="info">{message}</Alert>}


      <form onSubmit={handleSubmit(doSave)}>

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
          defaultValue={selectedItem.id}
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
              defaultValue={selectedItem.code}
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
              defaultValue={selectedItem.value}
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
              defaultValue={selectedItem.priority}
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
              defaultValue={selectedItem.description}
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
                defaultValue={selectedItem.json}
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


