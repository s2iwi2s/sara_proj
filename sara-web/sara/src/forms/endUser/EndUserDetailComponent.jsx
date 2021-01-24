import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOptions, save } from '../../api/endUser/EndUserService';
import EndUserDetailHtml from './EndUserDetailHtml';
import Utils, { ERROR_CODE, PAGE_URL } from '../../api/Utils'
import { resetSelectedItem, selectSelectedItem, setOptionsList, setPageableEntity } from '../../api/endUser/UsersSlice';
import { useGlobalVariable } from '../../providers/GlobalVariableProvider';

export default function EndUserDetailComponent(props) {
  const [, , showErrorAlert, ,] = useGlobalVariable();

  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedItem)

  const doRetrieve = () => {
    if (props.match.params.id == -1) {
      dispatch(resetSelectedItem())
    }
    getOptions()
      .then(response => dispatch(setOptionsList(response.data.listService)))
      .catch(error => setError(error, ERROR_CODE.RETRIEVE_ERROR, 'EndUserDetailComponent.doRetrieve', 'EndUserService.getOptions'))
  }

  const onSubmitForm = (data) => save(data)
    .then(response => {
      dispatch(setPageableEntity(response.data.entity))
      props.history.push(PAGE_URL.USER_LIST)
    })
    .catch(error => setError(error, ERROR_CODE.SAVE_ERROR, 'EndUserDetailComponent.onSubmitForm', 'EndUserService.save'))


  const setError = (error, errorCode, formMethod, serviceName) => {
    console.error(`[EndUserDetailComponent.setError]  error=`, error)
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName)

    showErrorAlert(errMsg)
  }
  return (
    <EndUserDetailHtml store={selectedItem}
      doRetrieve={doRetrieve}
      onSubmitForm={onSubmitForm} />

  );
}


