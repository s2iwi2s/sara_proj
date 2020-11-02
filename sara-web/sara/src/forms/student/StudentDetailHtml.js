import React, { useEffect, useState } from 'react';
import { Button, Divider, FormControlLabel, FormLabel, Grid, IconButton, MenuItem, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { INIT_STATUS, PAGE_URL } from '../../api/Utils'

const StudentDetailHtml = props => {
  // const { register, handleSubmit, errors, reset, setValue } = useForm();
  const { register, handleSubmit, errors, reset } = useForm();
  // const [counter, setCounter] = useState(0);

  const history = useHistory();

  useEffect(() => {
    // setCounter(counter + 1);
    // console.log(`[StudentDetailHtml.useEffect] props.store.initStatus=>${props.store.initStatus}, counter=${counter}`);
    if (props.store.initStatus === INIT_STATUS.LOAD) {
      props.onRetrieve(props.store.storeId);
    } if (props.store.initStatus === INIT_STATUS.RESET) {
      reset(props.store)
    }
  }, [props.store])
  return (
    <>
      <Typography variant="h4" gutterBottom>Student Detail</Typography>
      {/* {counter > 0 && <Alert severity="error">Counter={counter}, Init Status: {props.store.initStatus}</Alert>} */}
      {props.message && <Alert severity="error">{props.message}</Alert>}
      <form onSubmit={handleSubmit(props.onSubmitForm)}>
        <TextField type="hidden"
          name="id"
          inputRef={register}
          defaultValue={props.store.id}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Save</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" href={PAGE_URL.STUDENT_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={() => history.push(PAGE_URL.STUDENT_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="lrn"
              name="lrn"
              label="LRN"
              fullWidth
              autoComplete="lrn"
              autoFocus
              variant="filled"
              inputRef={register}
              defaultValue={props.store.lrn}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              autoFocus
              variant="filled"
              inputRef={register}
              defaultValue={props.store.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="filled"
              inputRef={register}
              defaultValue={props.store.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField id="level"
              required
              select
              name="level.id"
              label="Grade Level"
              fullWidth
              autoComplete="student level"
              variant="filled"
              inputRef={register}
              defaultValue={props.store.level.id}
            // error={!!errors.name}
            >
              {props.store.optionsList.studentLevelList.map(row => (
                <MenuItem key={row.id} value={row.id}>{row.description}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              required
              id="birthDate"
              name="birthDate"
              label="Date of Birth"
              type="date"
              fullWidth
              autoComplete="birth-date"
              variant="filled"
              inputRef={register}
              defaultValue={props.store.birthDate}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              required
              id="birthPlace"
              name="birthPlace"
              label="Birth Place"
              fullWidth
              autoComplete="birth-place"
              variant="filled"
              inputRef={register}
              defaultValue={props.store.birthPlace}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="gender"
              defaultValue={props.store.gender} >
              <FormControlLabel
                value="Male"
                control={<Radio color="primary" />}
                label="Male"
                labelPlacement="end"
                inputRef={register}
              />

              <FormControlLabel
                value="Female"
                control={<Radio color="primary" />}
                label="Female"
                labelPlacement="end"
                inputRef={register}
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}><Divider /></Grid>
          <Grid item xs={12}>
            <Typography variant="h6" >Address:</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField type="hidden"
              id="address.id"
              name="address[0].id"
              inputRef={register}
              defaultValue={props.store.address[0].id}
            />
            <TextField type="hidden"
              id="address.billTo"
              name="address[0].billTo"
              value="Y"
              inputRef={register}
              defaultValue={props.store.address[0].billTo}
            />
            <TextField
              id="address.address1"
              name="address[0].address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address1"
              variant="filled"
              inputRef={register}
              defaultValue={props.store.address[0].address1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address.address2"
              name="address[0].address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address2"
              variant="filled"
              inputRef={register}
              defaultValue={props.store.address[0].address2}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="address.city"
              name="address[0].city"
              label="City"
              fullWidth
              autoComplete="shipping address city"
              variant="filled"
              inputRef={register}
              defaultValue={props.store.address[0].city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="address.zip"
              name="address[0].zipCode"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="filled"
              inputRef={register}
              defaultValue={props.store.address[0].zipCode}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField editable={false}
              value="Philippines"
              required
              id="address.country"
              name="address[0].country"
              label="Country"
              fullWidth
              autoComplete="shipping postal-country"
              variant="filled"
              inputRef={register}
              defaultValue={props.store.address[0].country}
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
            <Button variant="contained" href={PAGE_URL.STUDENT_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={() => history.push(PAGE_URL.STUDENT_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
          </Grid>
        </Grid>
      </form>
    </ >
  );

}

export default StudentDetailHtml;