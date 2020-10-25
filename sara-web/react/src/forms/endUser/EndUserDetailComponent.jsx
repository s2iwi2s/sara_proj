import React from 'react';

import EndUserService from '../../api/endUser/EndUserService';
import EndUserDetailHtml from './EndUserDetailHtml';
import AddressListComponent from '../address/AddressListComponent';

export default class EndUserDetailComponent extends React.Component {
  state = this.getBlankDetails();


  getBlankDetails = () => {
    return {
      "id": "",
      "userName": '',
      "firstName": '',
      "lastName": "",
      "address": []
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
        if (this.props.match.params.id != -1) {
          thestate = response.data.entity;
        }
        thestate.listService = response.data.listService
        this.setState(thestate)
      })
  }

  doSave = () => {
    console.log(`[EndUserDetailComponent.save] id==>${this.props.match.params.id}`)
    EndUserService.save({
      userName: this.state.userName,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,

      id: this.state.id
    }).then(response => {
      console.log(`[EndUserDetailComponent.save] response==>`, response)

      this.props.history.push(`/end-user-list`);
    })
  }

  doChangeState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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
      >
        <AddressListComponent
          endUserId={this.props.match.params.id}
          doCancelAddress={this.doCancelAddress}
          endUserHistory={this.props.history}
        />
      </EndUserDetailHtml>

    );
  }
}


