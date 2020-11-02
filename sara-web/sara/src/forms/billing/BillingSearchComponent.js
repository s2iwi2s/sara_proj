import React, { useState } from 'react';
import { INIT_STATUS } from '../../api/Utils'

import BillingSearchHtml from './BillingSearchHtml';

export default function BillingSearchComponent(props) {

 const [formData, setFormData] = useState({
  initStatus: ((props.match.params.id === -1) ? INIT_STATUS.INIT : INIT_STATUS.LOAD),
  list: [],
  searchValue: '',
  billingSearchBy: '',
  optionsList: {
   billingSearchBy: [{
    value: 'STUDENT_ID',
    description: 'Student ID'
   }, {
    value: 'STUDENT_NAME',
    description: 'Student Name'
   }]
  },
  paging: {
   rowsPerPage: 25,
   totalElements: 0,
   currentPage: 0
  }
 });
 const doSearch = (searchValue) => {
  setFormData({
   initStatus: INIT_STATUS.LOAD,
   searchValue: searchValue
  })
 }

 return (
  <BillingSearchHtml formData={formData} doRetrieve="doRetrieve" />
 )
}