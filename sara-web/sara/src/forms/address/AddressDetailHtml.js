import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const StudentDetailHtml = props => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  return (
    <>
      <Typography variant="h4" gutterBottom>Student Detail</Typography>
      <form onSubmit={handleSubmit(props.onSubmitForm)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              autoFocus
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField editable={false}
              value="Philippines"
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping postal-code"
              inputRef={register}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" onClick={() => props.doSave()}>Save</Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="contained" color="primary" onClick={() => history.push("/student-detail/-1")}>Add Student</Button>
          </Grid>

        </Grid>
      </form>
    </ >
  );

}

export default StudentDetailHtml;