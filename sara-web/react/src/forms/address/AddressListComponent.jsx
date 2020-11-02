import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableRow, TableCell, Button, TableBody, TablePagination, FormControl, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { StyledTableRow } from '../../api/Utils'
import AddressService from '../../api/address/AddressService';

class AddressListComponent extends React.Component {
  state = {
    searchValue: '',
    list: [],
    paging: {
      rowsPerPage: 25,
      totalElements: 0,
      currentPage: 0
    }
  };

  componentDidMount = () => {
    this.retrieve();
  }

  retrieve = () => {
    //this.props.userId
    console.log('this.props.userHistory=' + this.props.userHistory);
    if (this.hasUser()) {
      AddressService.getListByUser(this.props.userId, this.state.searchValue)
        .then(response => {
          console.log(`[AddressListComponent AddressService.getListByUser] response=>`, response)
          this.setState({
            searchValue: response.data.searchValue,
            list: response.data.list
          })
        })
    } else {
      AddressService.getList(this.state.searchValue, this.state.paging.currentPage, this.state.paging.rowsPerPage)
        .then(response => {
          console.log(`[AddressListComponent AddressService.getList] response=>`, response)
          this.setState({
            list: response.data.pagingList.content,
            searchValue: response.data.searchValue,
            paging: {
              rowsPerPage: response.data.pagingList.size,
              totalElements: response.data.pagingList.totalElements,
              currentPage: response.data.pagingList.pageable.pageNumber,
              sort: 'address1',
              direction: 'ASC'
            }
          })
        })
    }
  }
  edit = (id) => {
    if (this.hasUser()) {
      this.props.userHistory.push(`/address-detail/${id}/${this.props.userId}`);
    } else {
      this.props.history.push(`/address-detail/${id}`);
    }

  }
  delete = (id) => {
    console.log(`[AddressComponent.delete] id=${id}`)
    AddressService.delete(id)
      .then(response => {
        console.log(`[AddressComponent.delete] response==>`, response)
        this.retrieve();
      })
  }

  handleChangePage = (e, newPage) => {
    //this.state.paging.currentPage = newPage;
    let paging = this.state.paging;
    paging.currentPage = newPage
    this.setState({
      paging: paging
    });
    this.retrieve();
  }
  handleChangeRowsPerPage = (e) => {
    let paging = this.state.paging;
    paging.rowsPerPage = e.target.value
    paging.currentPage = 0;
    this.setState({
      paging: paging
    });
    this.retrieve();
  }

  hasUser = () => {
    return this.props.userId;
  }

  changeState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleKeyDown = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(`[MyCaseListComponent.handleKeyDown] searchValue=${this.state.searchValue}`)
      console.log(`2 [MyCaseListComponent.handleKeyDown] ${e.target.value}, state=>`, this.state)
      this.retrieve();
    }
  }

  renderPagination = () => {
    if (this.hasUser()) {
      return (<></>);
    }
    return (
      <TablePagination
        component="div"
        count={this.state.paging.totalElements}
        page={this.state.paging.currentPage}
        onChangePage={this.handleChangePage}
        rowsPerPage={this.state.paging.rowsPerPage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    )
  }

  render = () => {
    let hsize = 'h4';
    if (this.hasUser()) {
      hsize = 'h5';
    }
    return (
      <div className="container">

        <Typography variant={hsize}>Address</Typography>
        <div className="text-right">
          <FormControl variant="filled">
            <Input name="searchValue" value={this.state.searchValue} placeholder="Search"
              onChange={(e) => this.changeState(e)} onKeyDown={(e) => this.handleKeyDown(e)}
              endAdornment={<SearchIcon onClick={() => this.retrieve()} />}
            />
          </FormControl>
        </div>
        {this.renderPagination()}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Is Billing?</TableCell>
              <TableCell>Is Shipping?</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              this.state.list.map(row => (
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
        {this.renderPagination()}
      </div >
    );
  }
}

export default AddressListComponent;


