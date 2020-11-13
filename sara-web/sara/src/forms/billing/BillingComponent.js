import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { formatter, INIT_STATUS, PAGE_URL } from '../../api/Utils'

import BillingService from '../../api/billing/BillingService'
import BillingHtmlComponent from './BillingHtmlComponent';
import SaveBillingDialog from './SaveBillingDialog';
import SavePayablesConfimationHtml from './SavePayablesConfimationHtml';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function BillingComponent(props) {
  const history = useHistory();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  })
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
    "payables": [
      {
        "id": null,
        "invoiceNo": null,
        "code": "no_data",
        "name": "NO DATA",
        "amount": 0,
        "payment": 0.0,
        "order": 0,
        "student": null,
        "createdDate": null,
        "lastModifiedDate": null,
        "user": null,
        "balance": 0.0,
        "paid": 0
      }],
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
    console.log(`[BillingComponent.doRetrieve] data==>`, data)
    BillingService.getListBy(data.searchBy, data.searchValue, store.paging.currentPage, store.paging.rowsPerPage)
      .then(response => {
        console.log(`[BillingComponent.doRetrieve BillingService.getListBy] response==>`, response)
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
      console.log(`[BillingComponent.doPayables BillingService.getStudentPayables] response==>`, response)
      let payables = response.data.payables;
      payables.map((row, i) => {
        // let value = row.payment ? row.payment.replaceAll(',', '') : 0;
        row.payment = formatter.format(row.payment);
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
    console.log(`[BillingComponent.doShowSaveConfirmDialog] data==>`, data);
    let paymentTotal = 0;
    let totalBalance = 0;
    data.payables.map((row, i) => {
      let balance = row.balance ? row.balance.replaceAll(',', '') : 0;
      let payment = row.payment ? row.payment.replaceAll(',', '') : 0;

      row.balance = Number(balance);
      row.payment = Number(payment);

      totalBalance += row.balance;
      paymentTotal += row.payment;
    });

    let confirmStoreTemp = {
      ...confirmStore,
      open: true,
      entity: store.entity,
      payables: data.payables,
      total: paymentTotal,
      totalBalance: totalBalance - paymentTotal
    }
    doInitConfirmStore(confirmStoreTemp);

    console.log(`[BillingComponent.doSavePayables] confirmStoreTemp==>`, confirmStoreTemp);
    setConfirmStore(confirmStoreTemp);
  }
  const doConfirmSavePayables = () => {
    console.log(`[BillingComponent.doConfirmSavePayables] confirmStore==>`, confirmStore);
    doSavePayables(confirmStore);
  }

  const doSavePayables = (data) => {
    console.log(`[BillingComponent.doSavePayables] data==>`, data);

    BillingService.save(data.payables, props.match.params.id).then(response => {
      console.log(`[BillingComponent.doSavePayables BillingService.save] response==>`, response)
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

      setSnackbar({
        open: true,
        message: 'Payables saved successfully!'
      })
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

  const doCloseSnackbar = () => {
    setSnackbar({
      open: false,
      message: ''
    })
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

      <SaveBillingDialog title="Please click save button to confirm."
        open={confirmStore.open}
        closeDialog={doCloseSaveBillingDialog}
        saveDialog={doConfirmSavePayables}>
        <SavePayablesConfimationHtml confirmStore={confirmStore} />
      </SaveBillingDialog>


      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={doCloseSnackbar}>
        <Alert onClose={doCloseSnackbar} severity="success">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}