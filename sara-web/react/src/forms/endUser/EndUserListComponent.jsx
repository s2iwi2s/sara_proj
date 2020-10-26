import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableRow, TableCell, Button, TableBody, TablePagination, FormControl, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import EndUserService from '../../api/endUser/EndUserService';

class EndUserListComponent extends React.Component {
  state = {
    list: [],
    searchValue: '',
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
    EndUserService.getList(this.state.searchValue, this.state.paging.currentPage, this.state.paging.rowsPerPage)
      .then(response => {
        console.log(`[EndUserListComponent.retrieve ] EndUserService.getList response=>`, response)
        this.setState({
          list: response.data.pagingList.content,
          searchValue: response.data.searchValue,
          paging: {
            rowsPerPage: response.data.pagingList.size,
            totalElements: response.data.pagingList.totalElements,
            currentPage: response.data.pagingList.pageable.pageNumber,
            sort: 'title',
            direction: 'ASC'
          }
        })
      })
  }
  edit = (id) => {
    console.log(`[EndUserListComponent.edit] id=${id}`)
    this.props.history.push(`/end-user-detail/${id}`);
  }
  delete = (id) => {
    console.log(`[EndUserListComponent.delete] id=${id}`)
    EndUserService.delete(id)
      .then(response => {
        console.log(`[EndUserListComponent.delete] response==>`, response)
        this.retrieve();
      })
  }
  handleKeyDown = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.key === 'Enter') {
      e.preventDefault();
      this.retrieve();
    }
  }

  changeState = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
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

  render = () => {
    return (
      <div className="container">
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" color="primary" onClick={() => this.edit(-1)}>NEW</Button>
        <div className="text-right">
          <FormControl variant="filled">
            <Input name="searchValue" value={this.state.searchValue} placeholder="Search"
              onChange={(e) => this.changeState(e)} onKeyDown={(e) => this.handleKeyDown(e)}
              endAdornment={<SearchIcon onClick={() => this.retrieve()} />}
            />
          </FormControl>
        </div>
        <TablePagination
          component="div"
          count={this.state.paging.totalElements}
          page={this.state.paging.currentPage}
          onChangePage={this.handleChangePage}
          rowsPerPage={this.state.paging.rowsPerPage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.list.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>

                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => this.edit(row.id)}>Edit</Button>&nbsp;
                  <Button variant="contained" color="primary" onClick={() => this.delete(row.id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={this.state.paging.totalElements}
          page={this.state.paging.currentPage}
          onChangePage={this.handleChangePage}
          rowsPerPage={this.state.paging.rowsPerPage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div >
    );
  }
}

export default EndUserListComponent;


