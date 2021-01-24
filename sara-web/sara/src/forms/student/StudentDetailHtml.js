import React, { useEffect, useState } from 'react';
import { Button, Divider, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { INIT_STATUS, PAGE_URL } from '../../api/Utils'
import TitleComponent from '../common/TitleComponent';

const StudentDetailHtml = props => {

  const { control, register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState(INIT_STATUS.LOAD);
  const [counter, setCounter] = useState(0);

  const history = useHistory();

  useEffect(() => {
    setCounter(counter + 1);
    console.log(`[StudentDetailHtml.useEffect] status=>${status}, counter=${counter}`);
    if (status === INIT_STATUS.LOAD) {
      props.onRetrieve();
      setStatus(INIT_STATUS.RESET)
    }
    reset(props.store)
  }, [props.store])

  const BUTTONS = () => {
    return (
      <>
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
      </>
    )
  }
  return (
    <>
      <TitleComponent>Student Detail</TitleComponent>
      {/* {counter > 0 && <Alert severity="error">Counter={counter}, Init Status: {props.store.initStatus}</Alert>} */}
      {props.message && <Alert severity="error">{props.message}</Alert>}


      <form onSubmit={handleSubmit(props.onSubmitForm)}>

        <BUTTONS />

        <TextField type="hidden"
          name="id"
          inputRef={register}
          defaultValue={props.store.id}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="lrn"
              name="lrn"
              label="LRN"
              fullWidth
              autoComplete="lrn"
              autoFocus
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.lrn}
            />
          </Grid><Grid item xs={12} sm={3}>
            <TextField
              id="studentId"
              name="studentId"
              label="Student Id"
              fullWidth
              autoComplete="studentId"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.studentId}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Controller
              as={
                <TextField id="level"
                  required
                  select
                  name="level.id"
                  label="Grade Level"
                  fullWidth
                  autoComplete="student level"
                  variant="filled"
                  inputRef={register}
                >
                  {props.store.optionsList.studentLevelList.map(row => (
                    <MenuItem key={row.id} value={row.id}>{row.description}</MenuItem>
                  ))}
                </TextField>
              }
              name="level.id"
              control={control}
              defaultValue={props.store.level.id}
              options={props.store.optionsList.studentLevelList}
            />
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              variant="filled"
              inputRef={register}
              defaultValue={props.store.birthPlace}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormLabel component="gender"
              variant="filled">Gender</FormLabel>
            <Controller
              as={
                <RadioGroup row
                  label="Gender"
                  aria-label="gender"
                  variant="filled">
                  <FormControlLabel
                    value="Male"
                    control={<Radio
                      variant="filled" />}
                    label="Male"
                    labelPlacement="end"
                    defaultValue={props.store.gender}
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                    labelPlacement="end"
                    variant="filled" defaultValue={props.store.gender}
                  />
                </RadioGroup>
              }
              name="gender"
              fullWidth
              defaultValue={props.store.gender}
              inputRef={register}
              variant="filled"
              control={control}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="contactNo"
              name="contactNo"
              label="Contact No"
              fullWidth
              autoComplete="contactNo"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.contactNo}
            />
          </Grid>
          <Grid item xs={12}><Divider /></Grid>
          <Grid item xs={12}>
            <Typography variant="h6" >Address:</Typography>
          </Grid>

          <Grid item xs={12}>

            <TextField
              id="address.address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address1"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.address1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address.address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address2"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.address2}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="address.city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address city"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="address.zip"
              name="zipCode"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.zipCode}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField editable={false}
              required
              id="address.country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping postal-country"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.country}
            />
          </Grid>
          <Grid item xs={12}><Divider /></Grid>
          <Grid item xs={12}><Typography variant="h6" >Parent/Guardian:</Typography></Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              id="fathersName"
              name="fathersName"
              label="Father's Name"
              fullWidth
              autoComplete="fathersName"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.fathersName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="fathersOccupation"
              name="fathersOccupation"
              label="Occupation"
              fullWidth
              autoComplete="fathersName"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.fathersName}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              id="mothersName"
              name="mothersName"
              label="Mother's Name"
              fullWidth
              autoComplete="mothersName"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.mothersName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="mothersOccupation"
              name="mothersOccupation"
              label="Occupation"
              fullWidth
              autoComplete="mothersOccupation"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.mothersOccupation}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="parentCivilStatus"
              name="parentCivilStatus"
              label="Parent CivilStatus"
              fullWidth
              autoComplete="parentCivilStatus"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.parentCivilStatus}
            />
          </Grid>
          <Grid item xs={12} sm={4} />

          <Grid item xs={12} sm={8}>
            <TextField
              id="guardianName"
              name="guardianName"
              label="Guardian Name"
              fullWidth
              autoComplete="guardianName"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={props.store.guardianName}
            />
          </Grid>
        </Grid>

        <BUTTONS />

      </form>
    </ >
  );

}

export default StudentDetailHtml;