import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOptions, save } from '../../api/endUser/EndUserService';
import EndUserDetailHtml from './EndUserDetailHtml';
import { ERROR_CODE, PAGE_URL } from '../../api/Utils'
import { resetSelectedItem, selectSelectedItem, setOptionsList, setPageableEntity } from '../../api/endUser/UsersSlice';
import { useMessageAlert } from "../../api/useMessageAlert"

export default function EndUserDetailComponent(props) {
  const useAlert = useMessageAlert();
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedItem)

  const doRetrieve = () => {
    if (props.match.params.id == -1) {
      dispatch(resetSelectedItem())
    }

    setMessage(`Loading. Please wait...`);
    getOptions()
      .then(response => {
        dispatch(setOptionsList(response.data.listService))
        setMessage(``);
      })
      .catch(error => useAlert.showErrorMsgAlert(error, ERROR_CODE.RETRIEVE_ERROR, 'EndUserDetailComponent.doRetrieve', 'EndUserService.getOptions'))
  }

  const onSubmitForm = (data) => {
    setMessage(`Saving...`);
    save(data)
      .then(response => {
        dispatch(setPageableEntity(response.data.entity))
        setMessage(``);
        props.history.push(PAGE_URL.USER_LIST)
      })
      .catch(error => useAlert.showErrorMsgAlert(error, ERROR_CODE.SAVE_ERROR, 'EndUserDetailComponent.onSubmitForm', 'EndUserService.save'))
  }


  return (
    <EndUserDetailHtml store={selectedItem}
      doRetrieve={doRetrieve}
      onSubmitForm={onSubmitForm}
      message={message} />

  );
}


