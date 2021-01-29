import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ERROR_CODE, PAGE_URL } from '../../api/Utils'
import StudentDetailHtml from './StudentDetailHtml.js';
import { save, getOptions } from '../../api/student/StudentService'
import { selectSelectedItem, setOptionsList, setPageableEntity, resetSelectedItem } from '../../api/student/StudentSlice';
import { useMessageAlert } from "../../api/useMessageAlert"

export default function StudentDetailComponent(props) {
  const alert = useMessageAlert();
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedItem)

  const [message, setMessage] = useState("");

  const showErrorMsgAlert = (error, errorCode, formMethod, serviceName) => {
    alert({
      type: 'form-error',
      payload: {
        error: error,
        errorCode: errorCode,
        formMethod: formMethod,
        serviceName: serviceName
      }
    })
  }

  const onSubmitForm = (data) => {
    console.log('[StudentDetailComponent.onSubmitForm] data==>', data)

    setMessage(`Saving...`);
    save(data)
      .then(response => {
        dispatch(setPageableEntity(response.data.entity))
        setMessage('')
        props.history.push(PAGE_URL.STUDENT_LIST)
      })
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.SAVE_ERROR, 'StudentDetailComponent.onSubmitForm', 'StudentService.save'));
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
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.RETRIEVE_ERROR, 'StudentDetailComponent.onRetrieve', 'StudentService.getOptions'));
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
