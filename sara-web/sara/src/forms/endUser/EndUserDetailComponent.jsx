import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOptions, save } from '../../api/endUser/EndUserService';
import EndUserDetailHtml from './EndUserDetailHtml';
import { PAGE_URL } from '../../api/Utils'
import { resetSelectedItem, selectSelectedItem, setOptionsList, setPageableEntity } from '../../api/endUser/UsersSlice';
export default function EndUserDetailComponent(props) {

  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedItem)

  const doRetrieve = () => {
    if (props.match.params.id == -1) {
      dispatch(resetSelectedItem())
    }
    getOptions()
      .then(response => dispatch(setOptionsList(response.data.listService)));
  }

  const onSubmitForm = (data) => save(data)
    .then(response => dispatch(setPageableEntity(response.data.entity)))
    .then(props.history.push(PAGE_URL.USER_LIST))

  return (
    <EndUserDetailHtml store={selectedItem}
      doRetrieve={doRetrieve}
      onSubmitForm={onSubmitForm} />

  );
}


