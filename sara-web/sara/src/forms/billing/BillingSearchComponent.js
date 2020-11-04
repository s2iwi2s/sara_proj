import React, { useState } from 'react';
import { INIT_STATUS, PAGE_URL } from '../../api/Utils'

import BillingSearchHtml from './BillingSearchHtml';
import BillingService from '../../api/billing/BillingService'
import StudentService from '../../api/student/StudentService'
import { useHistory } from 'react-router-dom';

export default function BillingSearchComponent(props) {
  const history = useHistory();

  const optionsList = {
    billingSearchBy: [{
      id: '1',
      value: 'STUDENT_ID',
      label: 'Student ID'
    }, {
      id: '2',
      value: 'STUDENT_NAME',
      label: 'Student Name'
    }]
  }

  const [store, setStore] = useState({
    INIT_STATUS: (props.match.params.id ? INIT_STATUS.PAYABLES : INIT_STATUS.INIT),
    searchFlag: (props.match.params.id ? false : true),
    payablesFlag: (props.match.params.id ? true : false),
    list: [],
    searchValue: '',
    searchBy: 'STUDENT_ID',
    entity: {
      studentId: '',
      firstName: '',
      lastName: '',
      level: {
        id: '',
        value: '',
        description: ''
      }
    },
    payables: [],
    optionsList: optionsList,
    paging: {
      rowsPerPage: 25,
      totalElements: 0,
      currentPage: 0
    }
  });

  const doInitFormData = data => {
    data.optionsList = optionsList;

    if (!data.currentPage) {
      data.paging = {
        rowsPerPage: 25,
        totalElements: 0,
        currentPage: 0
      };
    }

    if (!data.entity) {
      data.entity = {
        studentId: '',
        firstName: '',
        lastName: '',
        level: {
          id: '',
          value: '',
          description: ''
        }
      };
    }
    if (!data.payables) {
      data.payables = [];
    }
  }

  const doRetrieve = (data) => {
    console.log(`[BillingSearchComponent.doRetrieve] data==>`, data)
    BillingService.getListBy(data.searchBy, data.searchValue, store.paging.currentPage, store.paging.rowsPerPage)
      .then(response => {
        console.log(`[BillingSearchComponent.doRetrieve BillingService.getListBy] response==>`, response)
        let formData = {
          INIT_STATUS: INIT_STATUS.RESET,
          searchValue: data.searchValue,
          searchBy: data.searchBy,
          searchFlag: true,
          payablesFlag: false,
          list: response.data.content,
          optionsList: optionsList,
          paging: {
            rowsPerPage: response.data.size,
            totalElements: response.data.totalElements,
            currentPage: response.data.pageable.pageNumber,
          }
        }
        doInitFormData(formData);
        setStore(formData)
      });
  }

  const doHandleChangeRowsPerPage = (e) => {
    let paging = store.paging;
    paging.rowsPerPage = e.target.value
    paging.currentPage = 0;
    setStore(store)
    doRetrieve();
  }
  const doHandleChangePage = (e, newPage) => {
    store.paging.currentPage = newPage
    setStore(store);

    doRetrieve({
      searchBy: store.searchBy,
      searchValue: store.searchValue,
      currentPage: store.paging.currentPage,
      rowsPerPage: store.paging.rowsPerPage
    });
  }

  const doEdit = (id) => {
    history.push(PAGE_URL.STUDENT_DETAIL_URL + '/' + id)
  }

  const doPayables = () => {
    BillingService.getStudentPayables(props.match.params.id).then(response => {
      console.log(`[BillingSearchComponent.doPayables BillingService.getStudentPayables] response==>`, response)
      let formData = {
        entity: response.data.student,
        payables: response.data.payables,
        searchFlag: false,
        payablesFlag: true
      }
      doInitFormData(formData);
      setStore(formData);
    })
  }
  return (
    <BillingSearchHtml
      store={store}
      doEdit={doEdit}
      doRetrieve={doRetrieve}
      doPayables={doPayables}
      doHandleChangePage={doHandleChangePage}
      doHandleChangeRowsPerPage={doHandleChangeRowsPerPage} />
  )
}