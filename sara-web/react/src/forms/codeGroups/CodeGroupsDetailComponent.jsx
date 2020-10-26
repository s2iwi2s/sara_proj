import React from 'react';
import Typography from '@material-ui/core/Typography';
import { MenuItem, Button } from '@material-ui/core';

import TextFormControl from '../common/TextFormControl';
import CodeGroupsService from '../../api/codeGroups/CodeGroupsService';

export default class CodeGroupsDetailComponent extends React.Component {
  state = {
    "id": '',
    "title": "",
    "status": { "id": '' },
    "caseType1": { "id": '' },
    "caseType2": { "id": '' },
    "caseType3": { "id": '' },
    "statusCode": { "id": '' },
    "comments": "",

    "listService": {
      "statusList": [],
      "caseType1List": [],
      "caseType2List": [],
      "caseType3List": [],
      "statusCodeList": []
    }
  };


  getBlankDetails = () => {
    return {
      "id": '',
      "title": "",
      "status": { "id": '' },
      "caseType1": { "id": '' },
      "caseType2": { "id": '' },
      "caseType3": { "id": '' },
      "statusCode": { "id": '' },
      "comments": "",

      "listService": {
        "statusList": [],
        "caseType1List": [],
        "caseType2List": [],
        "caseType3List": [],
        "statusCodeList": []
      }
    }
  }

  componentDidMount = () => {
    this.retrieve();
  }

  retrieve = () => {
    console.log(`[CodeGroupsDetailComponent.retrieve] id==>${this.props.match.params.id}`)
    CodeGroupsService.get(this.props.match.params.id)
      .then(response => {
        console.log(`[CodeGroupsDetailComponent.retrieve] response==>`, response)
        let thestate = this.getBlankDetails();
        if (this.props.match.params.id != -1) {
          thestate = response.data.entity;
        }
        thestate.listService = response.data.listService
        this.setState(thestate)
      })
  }

  save = () => {
    console.log(`[CodeGroupsDetailComponent.save] id==>${this.props.match.params.id}`)
    CodeGroupsService.save({
      code: this.state.code,
      value: this.state.value,
      description: this.state.description,
      bool: this.state.bool,
      num: this.state.num,

      id: this.state.id
    }).then(response => {
      console.log(`[CodeGroupsDetailComponent.save] response==>`, response)

      this.props.history.push(`/code-groups-list`);
    })
  }

  changeState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changeSelectState = (e) => {
    this.setState({
      [e.target.name]: { "id": e.target.value }
    })
  }

  renderOptions = (optionsList) => {
    return (optionsList.map(row => (
      <MenuItem key={row.id} value={row.id}>{row.description}</MenuItem>
    )))
  }

  render = () => {
    return (
      <div className="container">
        <Typography variant="h4">CodeGroups Detail</Typography>
        <form>
          <TextFormControl label="Code"
            name="code" value={this.state.code}
            changeState={this.changeState} />
          <TextFormControl label="Value"
            name="value" value={this.state.value}
            changeState={this.changeState} />
          <TextFormControl label="Description"
            name="description" value={this.state.description}
            changeState={this.changeState} />
          <TextFormControl label="Bool"
            name="bool" value={this.state.bool}
            changeState={this.changeState} />
          <TextFormControl label="Num"
            name="num" value={this.state.num}
            changeState={this.changeState} />


          <Button variant="contained" color="primary" onClick={() => this.save()}>Save</Button>&nbsp;
          <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/code-groups-list`)}>Cancel</Button>
        </form>

      </div >
    );
  }
}


