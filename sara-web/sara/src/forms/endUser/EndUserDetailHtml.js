import React, { useEffect, useState } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

import { Controller, useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import { Box, Button, Grid, MenuItem, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { INIT_STATUS, PAGE_URL } from '../../api/Utils';

const EndUserDetailHtml = props => {
      const { control, register, handleSubmit } = useForm();
      const [status, setStatus] = useState(INIT_STATUS.LOAD);
      const history = useHistory();

      useEffect(() => {
            if (status === INIT_STATUS.LOAD) {
                  props.doRetrieve(props.store.entityId);
                  setStatus(INIT_STATUS.RESET)
            }
      }, [props.store])

      return (
            <>
                  {console.log(`[EndUserDetailHtml.return] props.store==>`, props.store)}
                  <Typography variant="h4">User Detail</Typography>

                  <form onSubmit={handleSubmit(props.onSubmitForm)}>

                        <Grid container spacing={3}>
                              <Grid item xs={12} sm={9}>
                              </Grid>
                              <Grid item xs={12} sm={1}>
                                    <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Save</Button>
                              </Grid>
                              <Grid item xs={12} sm={1}>
                                    <Button variant="contained" href={PAGE_URL.USER_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
                              </Grid>
                              <Grid item xs={12} sm={1}>
                                    <Button variant="contained" onClick={() => history.push(PAGE_URL.USER_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
                              </Grid>
                        </Grid>

                        <TextField type="hidden"
                              name="id"
                              inputRef={register}
                              defaultValue={props.store.id}
                        />
                        <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                    <TextField
                                          required
                                          id="userName"
                                          name="userName"
                                          label="User Name"
                                          fullWidth
                                          autoComplete="user-userName"
                                          variant="filled"
                                          autoFocus
                                          InputLabelProps={{ shrink: true }}
                                          inputRef={register}
                                          defaultValue={props.store.userName}
                                    />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                    <TextField
                                          id="password"
                                          type="password"
                                          name="password"
                                          label="Password"
                                          fullWidth
                                          autoComplete="user-password"
                                          variant="filled"
                                          InputLabelProps={{ shrink: true }}
                                          inputRef={register}
                                          defaultValue={props.store.password}
                                    />
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                    <TextField
                                          required
                                          id="firstName"
                                          name="firstName"
                                          label="First Name"
                                          fullWidth
                                          autoComplete="user-firstName"
                                          variant="filled"
                                          InputLabelProps={{ shrink: true }}
                                          inputRef={register}
                                          defaultValue={props.store.firstName}
                                    />
                              </Grid>
                              <Grid item xs={12} sm={612}>
                                    <TextField
                                          required
                                          id="lastName"
                                          name="lastName"
                                          label="Last Name"
                                          fullWidth
                                          autoComplete="user-lastName"
                                          variant="filled"
                                          InputLabelProps={{ shrink: true }}
                                          inputRef={register}
                                          defaultValue={props.store.lastName}
                                    />
                              </Grid>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                              <Box pt={3}>
                                    {/* <TextField id="school"
                                          select
                                          required
                                          name="school.id"
                                          label="School"
                                          fullWidth
                                          autoComplete="user-school"
                                          variant="filled"
                                          inputRef={register}
                                          defaultValue={props.store.school.id}
                                          error={!!errors.name}
                                    >
                                          {props.store.optionsList.schoolList.map(row => (
                                                <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                                          ))}
                                    </TextField> */}
                                    <Controller
                                          as={
                                                <TextField id="school"
                                                      required
                                                      select
                                                      label="School"
                                                      fullWidth
                                                      autoComplete="student-school"
                                                      variant="filled"
                                                      InputLabelProps={{ shrink: true }}
                                                      inputRef={register}
                                                // error={!!errors.name}
                                                >
                                                      {props.store.optionsList.schoolList.map(row => (
                                                            <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                                                      ))}
                                                </TextField>
                                          }
                                          name="school.id"
                                          control={control}
                                          defaultValue={props.store.school.id}
                                          options={props.store.optionsList.studentLevelList}
                                    />
                              </Box>
                        </Grid>

                        <Grid container spacing={3}>
                              <Grid item xs={12} sm={9}>
                              </Grid>
                              <Grid item xs={12} sm={1}>
                                    <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Save</Button>
                              </Grid>
                              <Grid item xs={12} sm={1}>
                                    <Button variant="contained" href={PAGE_URL.USER_DETAIL_URL + '/-1'} startIcon={<AddIcon />}>New</Button>
                              </Grid>
                              <Grid item xs={12} sm={1}>
                                    <Button variant="contained" onClick={() => history.push(PAGE_URL.USER_LIST)} startIcon={<CancelIcon />}>Cancel</Button>
                              </Grid>
                        </Grid>

                  </form>
            </ >
      );
};

export default EndUserDetailHtml;