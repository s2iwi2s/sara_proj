import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableCell, TableBody, TablePagination, FormControl, Input, Grid, IconButton, Box, TableContainer, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import SearchIcon from '@material-ui/icons/Search';
import StudentService from '../../api/student/StudentService'
import { PAGE_URL, StyledTableHeadCell, StyledTableHeadRow, StyledTableRow } from '../../api/Utils';

export default class StudentListComponent extends React.Component {
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
    this.doRetrieve();
  }
  doRetrieve = () => {
    StudentService.getList(this.state.searchValue, this.state.paging.currentPage, this.state.paging.rowsPerPage)
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
    console.log(`[StudentComponent.edit] id=${id}`)
    this.props.history.push(`${PAGE_URL.STUDENT_DETAIL_URL}/${id}`);
  }
  delete = (id) => {
    console.log(`[StudentComponent.delete] id=${id}`)
    StudentService.delete(id)
      .then(response => {
        console.log(`[StudentComponent.delete] response==>`, response)
        this.doRetrieve();
      })
  }

  handleChangePage = (e, newPage) => {
    //this.state.paging.currentPage = newPage;
    let paging = this.state.paging;
    paging.currentPage = newPage
    this.setState({
      paging: paging
    });
    this.doRetrieve();
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
    this.doRetrieve();
  }

  handleKeyDown = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(`[StudentListComponent.handleKeyDown] searchValue=${this.state.searchValue}`)
      console.log(`2 [StudentListComponent.handleKeyDown] ${e.target.value}, state=>`, this.state)
      this.doRetrieve();
    }
  }

  render = () => {
    return (
      <>
        <Box pb={3}><Typography variant="h4">Student List</Typography></Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <FormControl variant="filled">
              <Input name="searchValue" value={this.state.searchValue} placeholder="Search"
                onChange={(e) => this.changeState(e)} onKeyDown={(e) => this.handleKeyDown(e)}
                endAdornment={<SearchIcon onClick={() => this.doRetrieve()} />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TablePagination
              component="div"
              count={this.state.paging.totalElements}
              page={this.state.paging.currentPage}
              rowsPerPage={this.state.paging.rowsPerPage}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper} elevation={3} variant="elevation" >
          <Table>
            <TableHead>
              <StyledTableHeadRow>
                <StyledTableHeadCell>Student ID</StyledTableHeadCell>
                <StyledTableHeadCell>LRN</StyledTableHeadCell>
                <StyledTableHeadCell>Name</StyledTableHeadCell>
                <StyledTableHeadCell>Gender</StyledTableHeadCell>
                <StyledTableHeadCell>Grade Level</StyledTableHeadCell>
                <StyledTableHeadCell align="right">
                  Action
                <IconButton aria-label="add" onClick={() => this.edit(-1)}>
                    <AddIcon fontSize="large" />
                  </IconButton>
                </StyledTableHeadCell>
              </StyledTableHeadRow>
            </TableHead>
            <TableBody>
              {this.state.list.map(row => (
                <StyledTableRow key={row.id}>
                  <TableCell>{row.studentId}</TableCell>
                  <TableCell>{row.lrn}</TableCell>
                  <TableCell>{row.firstName} {row.lastName}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.level && row.level.description}</TableCell>

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
        </TableContainer>
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




