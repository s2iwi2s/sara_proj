import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { Box, Button, Divider, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TextField, Typography, IconButton, Select, TablePagination, TableContainer } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { INIT_STATUS, PAGE_URL, StyledTableHeadRow, StyledTableRow } from '../../api/Utils'
import { useStyles } from '../common/CSS'

export default function BillingSearchHtml(props) {
        const classes = useStyles();
        const history = useHistory();

        const { control, register, handleSubmit, reset } = useForm();
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


        const SearchResultsBody = () => {
                return (
                        <>
                                <Box py={3}><Divider /></Box>
                                <Box pb={3}><Typography variant="h5">Search Results</Typography></Box>
                                <PaginationSection />
                                <TableContainer component={Paper}>
                                        <Table>
                                                <TableHead>
                                                        <StyledTableHeadRow>
                                                                <TableCell>Student ID</TableCell>
                                                                <TableCell>Name</TableCell>
                                                                <TableCell>Grade Level</TableCell>
                                                                <TableCell align="right">
                                                                        <IconButton aria-label="add" onClick={() => props.doEdit(-1)}>
                                                                                <AddIcon fontSize="large" />
                                                                        </IconButton>
                                                                </TableCell>
                                                        </StyledTableHeadRow>
                                                </TableHead>
                                                <TableBody>
                                                        {props.store.list.map(row => (
                                                                <StyledTableRow key={row.id}>
                                                                        <TableCell variant="head">{row.studentId}</TableCell>
                                                                        <TableCell>{row.firstName} {row.lastName}</TableCell>
                                                                        <TableCell>{row.level.description}</TableCell>
                                                                        <TableCell align="right">
                                                                                <IconButton aria-label="payment" href={PAGE_URL.BILLING_PAYABLES_URL + '/' + row.id}>
                                                                                        <AccountBalanceWalletIcon fontSize="large" />
                                                                                </IconButton>
                                                                                <IconButton aria-label="edit" onClick={() => props.doEdit(row.id)}>
                                                                                        <EditIcon fontSize="large" />
                                                                                </IconButton>
                                                                                <IconButton aria-label="delete" onClick={() => props.doDelete(row.id)}>
                                                                                        <DeleteIcon fontSize="large" />
                                                                                </IconButton>
                                                                        </TableCell>
                                                                </StyledTableRow>
                                                        ))}
                                                </TableBody>
                                        </Table>
                                </TableContainer>
                                <PaginationSection />
                        </>
                )
        }

        const PaginationSection = () => {
                return (
                        <TablePagination
                                component="div"
                                page={props.store.paging.currentPage}
                                count={props.store.paging.totalElements}
                                rowsPerPage={props.store.paging.rowsPerPage}
                                onChangePage={props.doHandleChangePage}
                                onChangeRowsPerPage={props.doHandleChangeRowsPerPage}
                        />
                )
        }
        const PayablesSection = () => {
                return (
                        <>
                                <Box py={3}><Divider /></Box>
                                <Box pb={3}><Typography variant="h5">Student Information</Typography></Box>
                                <Paper elevation={3} variant="outlined" >
                                        <Box py={3} px={3}>
                                                <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={2}>Student Id</Grid>
                                                        <Grid item xs={12} sm={10}>{props.store.entity.studentId}</Grid>
                                                        <Grid item xs={12} sm={2}>Student Name</Grid>
                                                        <Grid item xs={12} sm={10}>{props.store.entity.firstName + ' ' + props.store.entity.lastName}</Grid>
                                                        <Grid item xs={12} sm={2}>Level</Grid>
                                                        <Grid item xs={12} sm={10}>{props.store.entity.level.description}</Grid>
                                                </Grid>
                                        </Box>
                                </Paper>
                                <Box py={3}><Divider /></Box>
                                <Box pb={3}><Typography variant="h5">Payables</Typography></Box>
                                <TableContainer component={Paper}>
                                        <Table>
                                                <TableHead>
                                                        <StyledTableHeadRow>
                                                                <TableCell variant="head">Payables</TableCell>
                                                                <TableCell variant="head" align="right">Total</TableCell>
                                                                <TableCell variant="head" align="right">Paid</TableCell>
                                                                <TableCell variant="head" align="right">Balance</TableCell>
                                                                <TableCell variant="head" align="right">Amount to Pay</TableCell>
                                                        </StyledTableHeadRow>
                                                </TableHead>
                                                <TableBody>
                                                        {props.store.payables.map((row, i) => (
                                                                <StyledTableRow>
                                                                        <TableCell>{row.name}</TableCell>
                                                                        <TableCell align="right">{row.regular}</TableCell>
                                                                        <TableCell align="right">0</TableCell>
                                                                        <TableCell align="right">0</TableCell>
                                                                        <TableCell align="right">0</TableCell>
                                                                </StyledTableRow>
                                                        ))}
                                                        <StyledTableRow>
                                                                <TableCell colSpan="4" align="right">Total</TableCell>
                                                                <TableCell align="right">0</TableCell>
                                                        </StyledTableRow>
                                                </TableBody>
                                        </Table>
                                </TableContainer>
                        </>
                )
        }

        return (
                <>
                        <Box pb={3}><Typography variant="h4">Billing</Typography></Box>

                        <form onSubmit={handleSubmit(props.doRetrieve)}>
                                <Paper elevation={3} variant="outlined" >
                                        <Box my={3} mx={3}>
                                                <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={2}><Typography variant="h5">Search By</Typography></Grid>
                                                        <Grid item xs={12} sm={2}>
                                                                <Controller
                                                                        as={<Select>
                                                                                {props.store.optionsList.billingSearchBy.map(m => (
                                                                                        <MenuItem key={m.id} value={m.value}>
                                                                                                {m.label}
                                                                                        </MenuItem>
                                                                                ))}
                                                                        </Select>}
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
                        {props.store.searchFlag && <SearchResultsBody />}
                        {props.store.payablesFlag && <PayablesSection />}
                </>
        )
}