import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { Button, Grid, MenuItem, TextField } from '@material-ui/core'

import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'
import AddIcon from '@material-ui/icons/Add'
import Alert from '@material-ui/lab/Alert'

import Utils, { ERROR_CODE, INIT_STATUS, PAGE_URL } from '../../api/Utils'
import TitleComponent from '../common/TitleComponent'

import { save, getOptions } from '../../api/school/SchoolService'
import {
  selectSelectedItem,
  setSelectedItem,
  setPageableEntity,
  updateSelectedItem,
  blankSelectedItem,
  setOptionsList,
  resetSelectedItem,
} from '../../api/school/SchoolSlice'
import { useMessageAlert } from "../../api/useMessageAlert"

export default function SchoolDetailComponent(props) {

  const history = useHistory()
  const dispatch = useDispatch()
  const { control, register, handleSubmit } = useForm()

  const [message, setMessage] = useState('Loading. Please wait...')
  const [status, setStatus] = useState(INIT_STATUS.INIT)

  const selectedItem = useSelector(selectSelectedItem)
  const [,
    ,
    showErrorMsgAlert,
    ,
    ,
    ,
  ] = useMessageAlert();

  useEffect(() => {
    console.log(
      `[SchoolDetailComponent.useEffect] status=${status}, selectedItem==>`,
      selectedItem
    )

    if (selectedItem.currentPeriod == null) {
      dispatch(
        updateSelectedItem({
          currentPeriod: { id: '' },
        })
      )
    }
    if (status === INIT_STATUS.INIT) {
      if (props.match.params.id == -1) {
        dispatch(setSelectedItem(blankSelectedItem))
      }
      doRetrieve()
      setStatus(INIT_STATUS.LOAD)
    }
  }, [selectedItem])

  const doRetrieve = () => {
    if (props.match.params.id == -1) {
      dispatch(resetSelectedItem())
    }

    setMessage('Loading. Please wait...')

    getOptions().then((response) => {
      dispatch(setOptionsList(response.data.listService))
      setMessage('')
    })
      .catch((error) =>
        showErrorMsgAlert(
          error,
          ERROR_CODE.RETRIEVE_ERROR,
          'SchoolDetailComponent.doRetrieve',
          'SchoolService.getOptions'
        )
      )
  }

  const onSubmitForm = (data) => {
    console.log(
      `[SchoolDetailComponent.onSubmitForm] data = `, data
    )
    setMessage('Saving...')
    console.log(
      `[SchoolDetailComponent.onSubmitForm] message = `, message
    )
    save(data)
      .then((response) => {
        dispatch(setPageableEntity(response.data.entity))
        setMessage('')
        history.push(PAGE_URL.SCHOOL_LIST)
      })
      .catch((error) =>
        showErrorMsgAlert(
          error,
          ERROR_CODE.SAVE_ERROR,
          'SchoolDetailComponent.save',
          'SchoolService.save'
        )
      )
  }

  return (
    <>
      {console.log(
        `[SchoolDetailComponent.render] selectedItem ==> `,
        selectedItem
      )}
      <TitleComponent>School Detail</TitleComponent>
      {message && <Alert severity='info'>{message}</Alert>}

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}></Grid>
          <Grid item xs={12} sm={1}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button
              variant='contained'
              href={PAGE_URL.SCHOOL_DETAIL_URL + '/-1'}
              startIcon={<AddIcon />}
            >
              New
            </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button
              variant='contained'
              onClick={() => history.push(PAGE_URL.SCHOOL_LIST)}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>

        <TextField
          type='hidden'
          name='id'
          inputRef={register}
          defaultValue={selectedItem.id}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='name'
              name='name'
              label='Name'
              fullWidth
              autoComplete='school-name'
              autoFocus
              variant='filled'
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={selectedItem.name}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              required
              id='schoolYear'
              name='schoolYear'
              label='School Year'
              fullWidth
              autoComplete='school-schoolYear'
              variant='filled'
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={selectedItem.schoolYear}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Controller
              as={
                <TextField id="currentPeriod"
                  required
                  select
                  label="Current Period"
                  fullWidth
                  autoComplete="school-currentPeriod"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                // error={!!errors.name}
                >
                  {selectedItem.optionsList.periodList.map(({ id, description }) => (
                    <MenuItem key={id} value={id}>{description}</MenuItem>
                  ))}
                </TextField>
              }
              name="currentPeriod.id"
              control={control}
              defaultValue={selectedItem.currentPeriod.id}
              options={selectedItem.optionsList.periodList}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id='logo'
              name='logo'
              label='Logo'
              fullWidth
              autoComplete='school-logo'
              variant='filled'
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={selectedItem.logo}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id='address'
              name='address'
              label='Address'
              fullWidth
              autoComplete='school-address'
              variant='filled'
              InputLabelProps={{ shrink: true }}
              inputRef={register}
              defaultValue={selectedItem.address}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}></Grid>
          <Grid item xs={12} sm={1}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button
              variant='contained'
              href={PAGE_URL.SCHOOL_DETAIL_URL + '/-1'}
              startIcon={<AddIcon />}
            >
              New
            </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button
              variant='contained'
              onClick={() => history.push(PAGE_URL.SCHOOL_LIST)}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
