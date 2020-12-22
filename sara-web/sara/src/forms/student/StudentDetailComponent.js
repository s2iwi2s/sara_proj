import React, { useState } from 'react';
import moment from 'moment';
import Utils, { INIT_STATUS, ERROR_CODE, PAGE_URL } from '../../api/Utils'
import StudentDetailHtml from './StudentDetailHtml.js';
import StudentService from '../../api/student/StudentService'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/AuthenticationProvider';

export default function StudentDetailComponent(props) {
  const history = useHistory();

  const [message, setMessage] = useState("");
  const [userObj] = useAuth();

  const [store, setStore] = useState({
    initStatus: ((props.match.params.id === -1) ? INIT_STATUS.INIT : INIT_STATUS.LOAD),
    school: { 'id': userObj.schoolId },
    id: '',
    entityId: props.match.params.id,
    firstName: '',
    lastName: '',
    birthDate: moment().format('YYYY-MM-DD'),
    birthPlace: '',
    gender: '',
    contactNo: '',
    level: { 'id': '' },
    address1: '',
    address2: '',
    city: '',
    zipCode: '',
    country: 'Philippines',
    fathersName: '',
    fathersOccupation: '',
    mothersName: '',
    mothersOccupation: '',
    parentCivilStatus: '',
    guardianName: '',
    optionsList: {
      studentLevelList: []
    }
  });

  const onInitFormData = (data) => {
    if (data.birthDate) {
      data.birthDate = moment(data.birthDate).format('YYYY-MM-DD');
    }
    if (!data.level) {
      data.level = { 'id': '' };
    }
    if (!data.optionsList) {
      data.optionsList = {
        studentLevelList: []
      }
    }
  }

  const onSubmitForm = (data) => {
    console.log('[StudentDetailComponent.onSubmitForm] data==>', data)

    setMessage(``);
    StudentService.save(data).then(response => onSubmitFormResponseAction(response))
      .catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'StudentDetailComponent.onSubmitForm', 'StudentService.save'));
  }

  const onSubmitFormResponseAction = response => {
    console.log(`[StudentDetailComponent.onSubmitFormSaveAction] params.id=${props.match.params.id}, response==>`, response)
    //let data = response.data;
    history.push(PAGE_URL.STUDENT_LIST)
    // onInitFormData(data);

    // data.initStatus = INIT_STATUS.RESET;

    // setEntity(data);
    // console.log(`[StudentDetailComponent.onSubmitForm] entity=>`, entity)

    // setMessage(`Student ${data.id} saved successfully!`);

  }

  const onRetrieve = (id) => {
    console.log(`[StudentDetailComponent.onRetrieve] id=${id}, props.id=${props.match.params.id}`, store)

    setMessage(`Loading. Please wait...`);
    StudentService.get(id ? id : props.match.params.id).then(response => onRetrieveResponseAction(response, id))
      .catch(error => setError(error, ERROR_CODE.RETRIEVE_ERROR, 'StudentDetailComponent.onRetrieve', 'StudentService.get'));
  }

  const onRetrieveResponseAction = (response, id) => {
    console.log(`[StudentDetailComponent.onRetrieveResponseAction] id=${id}, response==>`, response)
    let data = response.data.entity;
    if (!data) {
      data = {};
    }

    console.log(`[StudentDetailComponent.onRetrieveResponseAction] data==>`, data)
    data.optionsList = response.data.listService
    data.school = { 'id': userObj.schoolId };
    onInitFormData(data);

    data.initStatus = INIT_STATUS.RESET;
    setStore(data);
    setMessage(``);
  }

  const setError = (error, errorCode, formMethod, serviceName) => {
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName);
    setMessage(errMsg);
  }
  return (
    <StudentDetailHtml
      store={store}
      message={message}
      onSubmitForm={onSubmitForm}
      onRetrieve={onRetrieve}
    />
  );
}
