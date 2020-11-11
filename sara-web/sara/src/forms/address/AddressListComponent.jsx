import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import { INIT_STATUS } from '../../api/Utils'
import AddressService from '../../api/address/AddressService';
import CustomTableGrid from '../common/CustomTableGrid';

export default function AddressListComponent(props) {
  const [store, setStore] = useState({
    INIT_STATUS: INIT_STATUS.INIT,
    list: [],
    searchValue: '',
    paging: {
      rowsPerPage: 25,
      totalElements: 0,
      currentPage: 0
    }
  });

  const doRetrieve = () => {
    //props.userId
    console.log('props.userHistory=' + props.userHistory);
    if (hasUser()) {
      AddressService.getListByUser(props.userId, store.searchValue)
        .then(response => {
          console.log(`[AddressListComponent AddressService.getListByUser] response=>`, response)
          let data = {
            ...store,
            INIT_STATUS: INIT_STATUS.RESET,
            searchValue: response.data.searchValue,
            list: response.data.list
          }
          // setStore(data);
        })
    } else {
      AddressService.getList(store.searchValue, store.paging.currentPage, store.paging.rowsPerPage)
        .then(response => {
          console.log(`[AddressListComponent AddressService.getList] response=>`, response)
          let data = {
            ...store,
            INIT_STATUS: INIT_STATUS.RESET,
            list: response.data.pagingList.content,
            searchValue: response.data.searchValue,
            paging: {
              rowsPerPage: response.data.pagingList.size,
              totalElements: response.data.pagingList.totalElements,
              currentPage: response.data.pagingList.pageable.pageNumber
            }
          }
          // setStore(data);
        })
    }
  }
  const doEdit = (id) => {
    if (this.hasUser()) {
      props.userHistory.push(`/address-detail/${id}/${props.userId}`);
    } else {
      props.history.push(`/address-detail/${id}`);
    }

  }
  const doDelete = (id) => {
    console.log(`[AddressComponent.delete] id=${id}`)
    AddressService.delete(id)
      .then(response => {
        console.log(`[AddressComponent.delete] response==>`, response)
        doRetrieve();
      })
  }

  const doHandleChangePage = (e, newPage) => {
    //store.paging.currentPage = newPage;
    let paging = store.paging;
    paging.currentPage = newPage
    let data = {
      ...store,
    }
    data.paging.currentPage = newPage
    setStore(data);

    doRetrieve();
  }
  const doHandleChangeRowsPerPage = (e) => {
    let paging = {
      ...store.paging
    }
    paging.rowsPerPage = e.target.value
    paging.currentPage = 0;

    let data = {
      ...store,
      paging: paging
    }
    setStore(data);

    doRetrieve();
  }

  const doSearch = (searchValue) => {
    store.searchValue = searchValue
    doRetrieve();
  }

  const hasUser = () => {
    return props.userId;
  }

  const cols = [
    {
      field: 'name',
      headerName: 'Name',
    },
    {
      headerName: 'Address',
      render: function (row) {
        return <>
          <div>{row.address1}</div>
          <div>{row.address2}</div>
          <div>{row.city}, {row.state} {row.country} {row.zipCode}</div>
        </>
      }
    }, {
      field: 'billTo',
      headerName: 'Bill?',
    }, {
      field: 'shipTo',
      headerName: 'Ship?',
    },

  ];
  return (
    <>
      <Box pb={3}><Typography variant={hasUser() ? 'h5' : 'h4'}>Address</Typography></Box>
      <CustomTableGrid
        store={store}
        cols={cols}
        showPaging={!hasUser()}
        // list={store.list}
        // searchValue={store.searchValue}
        // paging={store.paging}
        onChangePage={doHandleChangePage}
        onChangeRowsPerPage={doHandleChangeRowsPerPage}
        doRetrieve={doRetrieve}
        doEdit={doEdit}
        doDelete={doDelete}
        doSearch={doSearch}
      />
      {/* <div className="text-right">
          <FormControl variant="filled">
            <Input name="searchValue" value={store.searchValue} placeholder="Search"
              onChange={(e) => this.changeState(e)} onKeyDown={(e) => this.handleKeyDown(e)}
              endAdornment={<SearchIcon onClick={() => this.retrieve()} />}
            />
          </FormControl>
        </div>
        {this.renderPagination()}
        <TableContainer component={Paper} elevation={3} variant="elevation" >
          <Table>
            <TableHead>
              <StyledTableHeadRow>
                <StyledTableHeadCell>Name</StyledTableHeadCell>
                <StyledTableHeadCell>Address</StyledTableHeadCell>
                <StyledTableHeadCell>Is Billing?</StyledTableHeadCell>
                <StyledTableHeadCell>Is Shipping?</StyledTableHeadCell>
                <StyledTableHeadCell>Action</StyledTableHeadCell>
              </StyledTableHeadRow>
            </TableHead>

            <TableBody>
              {
                store.list.map(row => (
                  <StyledTableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <div>{row.address1}</div>
                      <div>{row.address2}</div>
                      <div>{row.city}, {row.state} {row.country} {row.zipCode}</div>
                    </TableCell>
                    <TableCell>{row.billTo}</TableCell>
                    <TableCell>{row.shipTo}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" color="primary" onClick={() => this.edit(row.id)}>Edit</Button>&nbsp;
                    <Button variant="contained" color="primary" onClick={() => this.delete(row.id)}>Delete</Button>
                    </TableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer> */}
      {/* {this.renderPagination()} */}
    </ >
  );
}


