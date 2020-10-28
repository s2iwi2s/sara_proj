import React from 'react';

import EndUserService from '../../api/endUser/EndUserService';
import EndUserDetailHtml from './EndUserDetailHtml';
import AddressListComponent from '../address/AddressListComponent';

export default class EndUserDetailComponent extends React.Component {
  state = {
    'id': '',
    'userName': '',
    'firstName': '',
    'lastName': ''
  };


  getBlankDetails = () => {
    return {
      'id': '',
      'userName': '',
      'firstName': '',
      'lastName': ''
    }
  }

  componentDidMount = () => {
    this.doRetrieve();
  }

  doRetrieve = () => {
    console.log(`[EndUserDetailComponent.doRetrieve] id==>${this.props.match.params.id}`)
    EndUserService.get(this.props.match.params.id)
      .then(response => {
        console.log(`[EndUserDetailComponent.doRetrieve] response==>`, response)
        let thestate = this.getBlankDetails();
        if (this.props.match.params.id !== -1) {
          thestate = response.data.entity;
        }
        thestate.listService = response.data.listService
        this.setState(thestate)
      });
  }

  doSave = () => {
    console.log(`[EndUserDetailComponent.save] id==>${this.props.match.params.id}`)
    EndUserService.save({
      id: this.state.id,
      userName: this.state.userName,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address
    }).then(response => {
      console.log(`[EndUserDetailComponent.save] response==>`, response)
      this.props.history.push(`/end-user-list`);
    });
  }

  doChangeState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  doCancel = () => {
    this.props.history.push(`/end-user-list`);
  }
  doEditAddress = (addressId, userId) => {
    this.props.history.push(`/address-detail/${addressId}/${userId}`);
  }

  render = () => {
    return (
      <EndUserDetailHtml userName={this.state.userName}
        id={this.state.id}
        password={this.state.password}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        address={this.state.address}
        doChangeState={this.doChangeState}
        doSave={this.doSave}
        doCancel={this.doCancel}
        doEditAddress={this.doEditAddress}
      >
        <AddressListComponent
          userId={this.props.match.params.id}
          doCancelAddress={this.doCancelAddress}
          userHistory={this.props.history}
        />
      </EndUserDetailHtml>

    );
  }
}


