import React, { useState } from 'react';

import EndUserService from '../../api/endUser/EndUserService';
import EndUserDetailHtml from './EndUserDetailHtml';
import { INIT_STATUS, PAGE_URL } from '../../api/Utils'

export default function EndUserDetailComponent(props) {

  const [store, setStore] = useState({
    'INIT_STATUS': ((props.match.params.id === -1) ? INIT_STATUS.INIT : INIT_STATUS.LOAD),
    'school': { 'id': '' },
    'entityId': props.match.params.id,
    'id': '',
    'userName': '',
    'password': '',
    'firstName': '',
    'lastName': '',
    'optionsList': { schoolList: [] }
  });

  const getBlankDetails = () => {
    return {
      INIT_STATUS: '',
      'school': { 'id': '' },
      'id': '',
      'entityId': props.match.params.id,
      'userName': '',
      'password': '',
      'firstName': '',
      'lastName': '',
      'optionsList': { schoolList: [] }
    }
  }

  const doRetrieve = () => {
    console.log(`[EndUserDetailComponent.doRetrieve] id==>${props.match.params.id}`)
    EndUserService.get(props.match.params.id)
      .then(response => {
        console.log(`[EndUserDetailComponent.doRetrieve] response==>`, response)
        let thestate = getBlankDetails();
        if (props.match.params.id !== -1) {
          thestate = response.data.entity;
        }
        thestate.INIT_STATUS = INIT_STATUS.RESET;
        thestate.optionsList = response.data.listService
        setStore(thestate)
      });
  }

  const onSubmitForm = (data) => {
    console.log(`[EndUserDetailComponent.onSubmitForm] data==>`, data)
    EndUserService.save(data).then(response => {
      console.log(`[EndUserDetailComponent.save] response==>`, response)
      props.history.push(PAGE_URL.USER_LIST);
    });
  }

  const doCancel = () => {
    props.history.push(PAGE_URL.USER_LIST);
  }

  return (
    <EndUserDetailHtml store={store}
      doRetrieve={doRetrieve}
      onSubmitForm={onSubmitForm}
      doCancel={doCancel} />

  );
}


