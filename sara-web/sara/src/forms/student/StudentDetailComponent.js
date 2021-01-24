import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Utils, { ERROR_CODE, PAGE_URL } from '../../api/Utils'
import StudentDetailHtml from './StudentDetailHtml.js';
import { save, getOptions } from '../../api/student/StudentService'
import { selectSelectedItem, setOptionsList, setPageableEntity, resetSelectedItem } from '../../api/student/StudentSlice';
import { useGlobalVariable } from '../../providers/GlobalVariableProvider';

export default function StudentDetailComponent(props) {
  const [, , showErrorAlert, ,] = useGlobalVariable();
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedItem)

  const [message, setMessage] = useState("");

  const onSubmitForm = (data) => {
    console.log('[StudentDetailComponent.onSubmitForm] data==>', data)

    setMessage(`Saving...`);
    save(data)
      .then(response => {
        dispatch(setPageableEntity(response.data.entity))
        setMessage(``)
        props.history.push(PAGE_URL.STUDENT_LIST)
      })
      .catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'StudentDetailComponent.onSubmitForm', 'StudentService.save'));
  }

  const onRetrieve = () => {
    console.log(`[StudentDetailComponent.onRetrieve]  props.match.params.id==>${props.match.params.id}`)
    setMessage(`Loading. Please wait...`);
    if (props.match.params.id == -1) {
      dispatch(resetSelectedItem())
    }
    getOptions()
      .then(response => {
        dispatch(setOptionsList(response.data.listService))
        setMessage(``)
      })
      .catch(error => setError(error, ERROR_CODE.RETRIEVE_ERROR, 'StudentDetailComponent.onRetrieve', 'StudentService.getOptions'));
  }

  const setError = (error, errorCode, formMethod, serviceName) => {
    console.log(`[StudentDetailComponent.setError]  error=`, error)
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName);
    setMessage(errMsg);
    showErrorAlert(errMsg)
  }

  return (
    <StudentDetailHtml
      store={selectedItem}
      message={message}
      onSubmitForm={onSubmitForm}
      onRetrieve={onRetrieve}
    />
  );
}
