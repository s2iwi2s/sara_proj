import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableRow, TableCell, Button, TableBody, TablePagination, FormControl, Input, Grid, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

import { StyledTableRow } from '../../api/Utils'
import CodeGroupsService from '../../api/codeGroups/CodeGroupsService';
import CustomDataGrid from '../common/CustomDataGrid'




class CodeGroupsListComponent extends React.Component {
  state = {
    list: [],
    searchValue: '',
    paging: {
      rowsPerPage: 25,
      totalElements: 0,
      currentPage: 0
    }
  }
  componentDidMount = () => {
    this.retrieve();
  }
  retrieve = () => {
    CodeGroupsService.getList(this.state.searchValue, this.state.paging.currentPage, this.state.paging.rowsPerPage)
      .then(response => {
        console.log(response)
        this.setState({
          list: response.data.pagingList.content,
          paging: {
            rowsPerPage: response.data.pagingList.size,
            totalElements: response.data.pagingList.totalElements,
            currentPage: response.data.pagingList.pageable.pageNumber
          }
        })
      })
  }
  edit = (id) => {
    console.log(`[CodeGroupsComponent.edit] id=${id}`)
    this.props.history.push(`/code-groups-detail/${id}`);
  }
  delete = (id) => {
    console.log(`[CodeGroupsComponent.delete] id=${id}`)
    CodeGroupsService.delete(id)
      .then(response => {
        console.log(`[CodeGroupsComponent.delete] response==>`, response)
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

  changeState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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

  handleKeyDown = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(`[CodeGroupsListComponent.handleKeyDown] searchValue=${this.state.searchValue}`)
      console.log(`2 [CodeGroupsListComponent.handleKeyDown] ${e.target.value}, state=>`, this.state)
      this.retrieve();
    }
  }




  render = () => {
    return (
      <>
        <Typography variant="h4">Code Groups List</Typography>
        <CustomDataGrid />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={2}>
            <FormControl variant="filled">
              <Input name="searchValue" value={this.state.searchValue} placeholder="Search"
                onChange={(e) => this.changeState(e)} onKeyDown={(e) => this.handleKeyDown(e)}
                endAdornment={<SearchIcon onClick={() => this.retrieve()} />}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Bool</TableCell>
              <TableCell>Num</TableCell>
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
              <StyledTableRow key={row.id}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.bool}</TableCell>
                <TableCell>{row.num}</TableCell>

                <TableCell align="right">
                  <IconButton aria-label="edit" onClick={() => this.edit(row.id)}>
                    <EditIcon fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => this.delete(row.id)}>
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
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

export default CodeGroupsListComponent;


