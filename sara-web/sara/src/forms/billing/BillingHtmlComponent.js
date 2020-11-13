import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Box, Button, Grid, MenuItem, Paper, TextField, Typography, Select } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import { INIT_STATUS } from '../../api/Utils'
import SearchResultsHtmlComponent from './SearchResultsHtmlComponent';
import PayablesHtmlComponent from './PayablesHtmlComponent';

export default function BillingHtmlComponent(props) {
        const { control, register, handleSubmit, error, reset } = useForm();
        const [counter, setCounter] = useState(0);

        useEffect(() => {
                setCounter(counter + 1);
                console.log(`[BillingSearchHtml.useEffect] counter=${counter}, INIT_STATUS=${props.store.INIT_STATUS}, props.store=>`, props.store)
                if (props.store.INIT_STATUS === INIT_STATUS.PAYABLES) {
                        props.doPayables();
                } else if (props.store.INIT_STATUS === INIT_STATUS.RESET) {
                        reset(props.store)
                }
        }, [props.store])

        return (
                <>
                        <Box ><Typography variant="h4">Payables</Typography></Box>

                        <form onSubmit={handleSubmit(props.doRetrieve)}>
                                <Paper elevation={3} variant="elevation" >
                                        <Box my={3} mx={3}>
                                                <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={2}><Typography variant="h6">Search By</Typography></Grid>
                                                        <Grid item xs={12} sm={2}>
                                                                <Controller
                                                                        as={<Select fullWidth >
                                                                                {props.store.optionsList.billingSearchBy.map(m => (
                                                                                        <MenuItem key={m.id} value={m.value}>
                                                                                                {m.label}
                                                                                        </MenuItem>
                                                                                ))}
                                                                        </Select>}
                                                                        required
                                                                        name="searchBy"
                                                                        control={control}
                                                                        defaultValue={props.store.searchBy}
                                                                        options={props.store.optionsList.billingSearchBy}
                                                                />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                                <TextField id="searchValue"
                                                                        required
                                                                        name="searchValue"
                                                                        // label="Search Value"
                                                                        fullWidth
                                                                        autoComplete="billing-search-value"
                                                                        inputRef={register}
                                                                        defaultValue={props.store.searchValue}
                                                                />
                                                        </Grid>

                                                        <Grid item xs={12} sm={1}>
                                                                <Button variant="contained" color="primary" type="submit" startIcon={<SearchIcon />}>Search</Button>
                                                        </Grid>
                                                </Grid>
                                        </Box>
                                </Paper>
                        </form>
                        {props.store.searchFlag &&
                                <SearchResultsHtmlComponent
                                        store={props.store}
                                        doEdit={props.doEdit}
                                        onChangePage={props.onChangePage}
                                        onChangeRowsPerPage={props.onChangeRowsPerPage}
                                />}
                        {props.store.payablesFlag &&
                                <PayablesHtmlComponent
                                        register={register}
                                        handleSubmit={handleSubmit}
                                        doShowSaveBillingDialog={props.doShowSaveConfirmDialog}
                                        // doSavePayables={props.doSavePayables}
                                        store={props.store} />}
                </>
        )
}