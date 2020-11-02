import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableRow, TableCell, Button, TableBody, TablePagination, FormControl, Input, Grid, IconButton, Box } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
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
      <>
        <Box pb={3}><Typography variant="h4">Users</Typography></Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <FormControl variant="filled">
              <Input name="searchValue" value={this.state.searchValue} placeholder="Search"
                onChange={(e) => this.changeState(e)} onKeyDown={(e) => this.handleKeyDown(e)}
                endAdornment={<SearchIcon onClick={() => this.retrieve()} />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TablePagination
              component="div"
              count={this.state.paging.totalElements}
              page={this.state.paging.currentPage}
              onChangePage={this.handleChangePage}
              rowsPerPage={this.state.paging.rowsPerPage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell align="right">
                Action
                <IconButton aria-label="add" onClick={() => this.edit(-1)}>
                  <AddIcon fontSize="large" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.list.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>

                <TableCell align="right">
                  <IconButton aria-label="edit" onClick={() => this.edit(row.id)}>
                    <EditIcon fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => this.delete(row.id)}>
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </TableCell>
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
      </ >
    );
  }
}

export default EndUserListComponent;


