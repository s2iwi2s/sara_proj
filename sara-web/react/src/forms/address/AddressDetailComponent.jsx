import React from 'react';
import Typography from '@material-ui/core/Typography';
import { MenuItem, Button, FormControl } from '@material-ui/core';

import AddressService from '../../api/address/AddressService';
import TextFormControl from '../common/TextFormControl';

export default class AddressDetailComponent extends React.Component {
  state = {
    "id": '',
    "userId": '',
    "user": { id: "", firstName: "", lastName: "" },
    "name": "",
    "address1": "",
    "address2": "",
    "city": "",
    "state": "",
    "country": "",
    "zipCode": "",
    "billTo": "",
    "shipTo": ""
  };

  getBlankDetails = () => {
    return {
      "id": '',
      "userId": '',
      "user": { id: "", firstName: "", lastName: "" },
      "name": "",
      "address1": "",
      "address2": "",
      "city": "",
      "state": "",
      "country": "",
      "zipCode": "",
      "billTo": "",
      "shipTo": ""
    }
  }

  componentDidMount = () => {
    this.retrieve();
  }

  retrieve = () => {
    console.log(`[AddressDetailComponent.retrieve] id=${this.props.match.params.id}, userId=${this.props.match.params.userId}`);
    let thestate = this.getBlankDetails();
    if (this.props.match.params.id === -1 && this.props.match.params.userId) {
      AddressService.getByUser(this.props.match.params.userId)
        .then(response => {
          console.log(`[AddressDetailComponent.retrieve] response=>`, response);
          thestate = response.data.entity;
          console.log(`[AddressDetailComponent.retrieve] thestate.user=>`, thestate.user);
          thestate.userId = thestate.user.id
          thestate.listService = response.data.listService
          this.setState(thestate)
        })
    } else {
      AddressService.get(this.props.match.params.id)
        .then(response => {
          thestate = response.data.entity;
          thestate.userId = thestate.user.id
          thestate.listService = response.data.listService
          this.setState(thestate)
        })
    }
  }

  save = () => {
    AddressService.save({
      user: {
        id: this.state.userId
      },
      name: this.state.name,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipCode: this.state.zipCode,
      billTo: this.state.billTo,
      shipTo: this.state.shipTo,
      id: this.state.id
    }).then(response => {
      let routeUrl = `/address-list`;
      let userId = this.props.match.params.userId
      if (userId) {
        routeUrl = `/end-user-detail/${userId}`
      }
      this.props.history.push(routeUrl);
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

  cancel = () => {
    console.log(`[AddressDetailComponent.cancel] userId=${this.props.match.params.userId}`);
    if (this.props.match.params.userId) {
      this.props.history.push(`/end-user-detail/${this.props.match.params.userId}`)
    } else {
      this.props.history.push(`/address-list`)
    }
  }


  render = () => {
    return (
      <>
        <Typography variant="h4">Address Detail</Typography>
        <form>
          <FormControl fullWidth margin="normal">
            <span>End User: {this.state.user.lastName}, {this.state.user.firstName}</span>
            <input name="userId" type="hidden" value={this.state.userId} />
          </FormControl>

          <TextFormControl label="Name"
            name="name" value={this.state.name}
            changeState={this.changeState} />

          <TextFormControl label="Address 1"
            name="address1" value={this.state.address1}
            changeState={this.changeState} />

          <TextFormControl label="Address 2"
            name="address2" value={this.state.address2}
            changeState={this.changeState} />

          <TextFormControl label="City"
            name="city" value={this.state.city}
            changeState={this.changeState} />

          <TextFormControl label="State"
            name="state" value={this.state.state}
            changeState={this.changeState} />

          <TextFormControl label="Country"
            name="country" value={this.state.country}
            changeState={this.changeState} />

          <TextFormControl label="Zip Code"
            name="zipCode" value={this.state.zipCode}
            changeState={this.changeState} />

          <TextFormControl label="Is Billing?"
            name="billTo" value={this.state.billTo}
            changeState={this.changeState} />

          <TextFormControl label="Is Shipping?"
            name="shipTo" value={this.state.shipTo}
            changeState={this.changeState} />

          <Button variant="contained" color="primary" onClick={() => this.save()}>Save</Button>&nbsp;
          <Button variant="contained" color="primary" onClick={() => this.cancel()}>Cancel</Button>
        </form>

      </ >
    );
  }
}


