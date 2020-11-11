import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { formatter, INIT_STATUS, PAGE_URL } from '../../api/Utils'

import BillingService from '../../api/billing/BillingService'
import BillingHtmlComponent from './BillingHtmlComponent';
import SaveBillingDialog from './SaveBillingDialog';
import SavePayablesConfimationHtml from './SavePayablesConfimationHtml';

export default function BillingComponent(props) {
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
  const [confirmStore, setConfirmStore] = useState({
    open: false
  })
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
          ...store,
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

  const onChangeRowsPerPage = (e) => {
    let paging = {
      ...store.paging
    }
    paging.rowsPerPage = e.target.value
    paging.currentPage = 0;

    let data = {
      ...store,
      paging: paging
    }
    setStore(data)
    doRetrieve();
  }
  const onChangePage = (e, newPage) => {
    let paging = {
      ...store.paging
    }
    paging.currentPage = newPage

    let data = {
      ...store,
      paging: paging
    }
    setStore(data);

    doRetrieve({
      searchBy: data.searchBy,
      searchValue: data.searchValue,
      currentPage: data.paging.currentPage,
      rowsPerPage: data.paging.rowsPerPage
    });
  }

  const doEdit = (id) => {
    history.push(PAGE_URL.STUDENT_DETAIL_URL + '/' + id)
  }

  const doPayables = () => {
    BillingService.getStudentPayables(props.match.params.id).then(response => {
      console.log(`[BillingSearchComponent.doPayables BillingService.getStudentPayables] response==>`, response)
      let payables = response.data.payables;
      payables.map((row, i) => {
        let value = row.payment ? row.payment.replaceAll(',', '') : 0;
        row.payment = formatter.format(value);
      });
      let formData = {
        ...store,
        INIT_STATUS: INIT_STATUS.RESET,
        entity: response.data.student,
        payables: payables,
        searchFlag: false,
        payablesFlag: true
      }
      doInitFormData(formData);
      setStore(formData);
    })
  }
  const doShowSaveConfirmDialog = (data) => {
    console.log(`[BillingSearchComponent.doShowSaveConfirmDialog] data==>`, data);
    let total = 0;
    data.payables.map((row, i) => {
      let value = row.payment ? row.payment.replaceAll(',', '') : 0;
      row.payment = formatter.format(value);
      let numValue = Number(value);
      total += numValue;
    });
    let confirmStoreTemp = {
      ...confirmStore,
      open: true,
      entity: store.entity,
      payables: data.payables,
      total: formatter.format(total)
    }
    doInitConfirmStore(confirmStoreTemp);

    console.log(`[BillingSearchComponent.doSavePayables] confirmStoreTemp==>`, confirmStoreTemp);
    setConfirmStore(confirmStoreTemp);
  }
  const doConfirmSavePayables = () => {
    console.log(`[BillingSearchComponent.doConfirmSavePayables] confirmStore==>`, confirmStore);
    doSavePayables(confirmStore);
  }

  const doSavePayables = (data) => {
    console.log(`[BillingSearchComponent.doSavePayables] data==>`, data);
    data.payables.map((row, i) => {
      let value = row.payment ? row.payment.replaceAll(',', '') : 0;
      row.payment = value;
    });

    // let confirmStoreTemp = {
    //   ...confirmStore,
    //   open: true,
    //   entity: store.entity,
    //   payables: data.payables,
    //   total: formatter.format(total)
    // }
    //doInitConfirmStore(confirmStoreTemp);
    // setConfirmStore(confirmStoreTemp);

    BillingService.save(data.payables, props.match.params.id).then(response => {
      console.log(`[BillingSearchComponent.doSavePayables BillingService.save] response==>`, response)
      let formData = {
        ...store,
        INIT_STATUS: INIT_STATUS.PAYABLES_RESET,
        entity: response.data.student,
        payables: response.data.payables,
        searchFlag: false,
        payablesFlag: true,
      }

      doInitFormData(formData);
      setStore(formData);

      // close dialog
      setConfirmStore({
        ...confirmStore,
        payables: [],
        open: false,
        total: formatter.format(0)
      });
    })
  }
  const doCloseSaveBillingDialog = () => {
    let confirmStoreTemp = {
      ...confirmStore,
      open: false
    }
    setConfirmStore(confirmStoreTemp);
  }

  const doInitConfirmStore = data => {
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

  return (
    <>
      <BillingHtmlComponent
        store={store}
        doEdit={doEdit}
        doRetrieve={doRetrieve}
        doPayables={doPayables}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        doShowSaveConfirmDialog={doShowSaveConfirmDialog}
        doSavePayables={doSavePayables}
      />

      <SaveBillingDialog open={confirmStore.open}
        closeDialog={doCloseSaveBillingDialog}
        saveDialog={doConfirmSavePayables}>
        <SavePayablesConfimationHtml confirmStore={confirmStore} />
      </SaveBillingDialog>
    </>
  )
}