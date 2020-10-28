import React, { useState } from 'react';
import moment from 'moment';
import Utils, { INIT_STATUS, ERROR_CODE } from '../../api/Utils'
import StudentDetailHtml from './StudentDetailHtml.js';
import StudentService from '../../api/student/StudentService'
import { useHistory } from 'react-router-dom';

export default function StudentDetailComponent(props) {
  const history = useHistory();

  const [message, setMessage] = useState("");
  // const [entity, setEntity] = useState({
  //   initStatus: ((props.match.params.id == -1) ? INIT_STATUS.INIT : INIT_STATUS.LOAD),
  //   entityId: props.match.params.id,
  //   firstName: '',
  //   lastName: '',
  //   birthDate: moment().format('YYYY-MM-DD'),
  //   birthPlace: '',
  //   gender: '',
  //   level: { 'id': '' },
  //   address: [{
  //     address1: '',
  //     address2: '',
  //     city: '',
  //     zipCode: ''
  //   }]
  // });

  const [entity, setEntity] = useState({
    initStatus: ((props.match.params.id === -1) ? INIT_STATUS.INIT : INIT_STATUS.LOAD),
    entityId: props.match.params.id,
    firstName: 'XXXXXXXXX',
    lastName: 'XXXX',
    birthDate: moment().format('YYYY-MM-DD'),
    birthPlace: 'XXXXXXXX',
    gender: 'Male',
    level: { 'id': '5f98aeec419c2a4777cfa86e' },
    address: [{
      address1: '0000 XXXXXXXX XXXX XXXXXXXX ',
      address2: '00000',
      city: 'XXXXXXXX',
      zipCode: '00000000000'
    }],
    optionsList: {
      studentLevelList: []
    }
  });
  const onInitFormData = (data) => {
    if (data.birthDate) {
      data.birthDate = moment(data.birthDate).format('YYYY-MM-DD');
    }
    if (!data.address || data.address.length === 0) {
      data.address = [{ 'id': '' }];
    }
    if (!data.level) {
      data.level = { 'id': '' };
    }
    if (!data.level) {
      data.level = { 'id': '' };
    }
  }

  const onSubmitForm = (data) => {
    console.log('[StudentDetailComponent.onSubmit] data==>', data)

    setMessage(``);
    StudentService.save(data).then(response => onSubmitFormResponseAction(response))
      .catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'StudentDetailComponent.onSubmitForm', 'StudentService.save'));
  }

  const onSubmitFormResponseAction = response => {
    console.log(`[StudentDetailComponent.onSubmitFormSaveAction] params.id=${props.match.params.id}, response==>`, response)
    let data = response.data;
    history.push("/student-list")
    // onInitFormData(data);

    // data.initStatus = INIT_STATUS.RESET;

    // setEntity(data);
    // console.log(`[StudentDetailComponent.onSubmitForm] entity=>`, entity)

    // setMessage(`Student ${data.id} saved successfully!`);

  }

  const onRetrieve = (id) => {
    console.log(`[StudentDetailComponent.onRetrieve] id=${id}, props.id=${props.match.params.id}`, entity)

    setMessage(`Loading. Please wait...`);
    StudentService.get(id).then(response => onRetrieveResponseAction(response, id))
      .catch(error => setError(error, ERROR_CODE.RETRIEVE_ERROR, 'StudentDetailComponent.onRetrieve', 'StudentService.get'));
  }

  const onRetrieveResponseAction = (response, id) => {
    console.log(`[StudentDetailComponent.onRetrieveGetAction] id=${id}, response==>`, response)
    let data = response.data.entity;
    data.optionsList = response.data.listService
    onInitFormData(data);

    data.initStatus = INIT_STATUS.RESET;
    setEntity(data);
    setMessage(``);
  }

  const setError = (error, errorCode, formMethod, serviceName) => {
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName);
    setMessage(errMsg);
  }
  return (
    <StudentDetailHtml
      entity={entity}
      message={message}
      onSubmitForm={onSubmitForm}
      onRetrieve={onRetrieve}
    />
  );
}
