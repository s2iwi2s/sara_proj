import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Utils, { ERROR_CODE, formatter, INIT_STATUS } from '../../api/Utils'

import { getListBy, getStudentPayables, save } from '../../api/billing/BillingService'
import BillingHtmlComponent from './BillingHtmlComponent';
import SavePayablesConfimationHtml from './SavePayablesConfimationHtml';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useGlobalVariable } from '../../providers/GlobalVariableProvider';
import { selectPageable, setPageable, optionsList, selectConfirmPayables, setConfirmPayables } from '../../api/billing/BillingSlice';

export default function BillingComponent() {

  const [, , showErrorAlert, ,] = useGlobalVariable();

  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)
  const currConfirmPayables = useSelector(selectConfirmPayables)


  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'center'
  })
  const { message, open, vertical, horizontal } = snackbar

  // const optionsList = {
  //   billingSearchBy: [{
  //     id: '1',
  //     value: 'STUDENT_ID',
  //     label: 'Student ID'
  //   }, {
  //     id: '2',
  //     value: 'STUDENT_NAME',
  //     label: 'Student Name'
  //   }]
  // }
  // const [confirmStore, setConfirmStore] = useState({
  //   INIT_STATUS: INIT_STATUS.INIT,
  //   entity: {
  //     studentId: '',
  //     firstName: '',
  //     lastName: '',
  //     level: {
  //       id: '',
  //       value: '',
  //       description: ''
  //     }
  //   },
  //   payables: [],
  //   payablesByInvoiceNo: [],
  //   open: false
  // })

  // const [store, setStore] = useState({
  //   INIT_STATUS: (props.match.params.id ? INIT_STATUS.PAYABLES : INIT_STATUS.INIT),
  //   searchFlag: (props.match.params.id ? false : true),
  //   payablesFlag: (props.match.params.id ? true : false),
  //   list: [],
  //   searchValue: '',
  //   searchBy: 'STUDENT_ID',
  //   entity: {
  //     studentId: '',
  //     firstName: '',
  //     lastName: '',
  //     level: {
  //       id: '',
  //       value: '',
  //       description: ''
  //     }
  //   },
  //   studentPayables: {
  //     invoiceNo: '',
  //     payables: [
  //       {
  //         "id": null,
  //         "invoiceNo": null,
  //         "code": "no_data",
  //         "name": "NO DATA",
  //         "amount": 0,
  //         "payment": 0.0,
  //         "order": 0,
  //         "student": null,
  //         "createdDate": null,
  //         "lastModifiedDate": null,
  //         "user": null,
  //         "balance": 0.0,
  //         "paid": 0
  //       }],
  //     payablesByInvoiceNo: [
  //       {
  //         "id": null,
  //         "invoiceNo": null,
  //         "code": "no_data",
  //         "name": "NO DATA",
  //         "amount": 0,
  //         "payment": 0.0,
  //         "order": 0,
  //         "student": null,
  //         "createdDate": null,
  //         "lastModifiedDate": null,
  //         "user": null,
  //         "balance": 0.0,
  //         "paid": 0
  //       }]
  //   },
  //   optionsList: optionsList,
  //   paging: {
  //     rowsPerPage: 25,
  //     totalElements: 0,
  //     currentPage: 0
  //   }
  // });

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

    if (!data.studentPayables) {
      data.studentPayables = {
        invoiceNo: '',
        payables: [],
        payablesByInvoiceNo: []
      };
    }
    if (!data.studentPayables.payables) {
      data.studentPayables.payables = [];
    }
    if (!data.studentPayables.payablesByInvoiceNo) {
      data.studentPayables.payablesByInvoiceNo = [];
    }
  }

  const setError = (error, errorCode, formMethod, serviceName) => {
    console.error(`[BillingComponent.setError]  error=`, error)
    let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName)
    showErrorAlert(errMsg)
  }


  const doRetrieve = (data) => {
    console.log(`[BillingComponent.doRetrieve] data==>`, data)
    getListBy(data.searchBy, data.searchValue, currPageable.paging.currentPage, currPageable.paging.rowsPerPage)
      .then(response => {
        console.log(`[BillingComponent.doRetrieve BillingService.getListBy] response==>`, response)
        let formData = {
          ...currPageable,
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
        dispatch(setPageable(formData))
      })
      .catch(error => setError(error, ERROR_CODE.LIST_ERROR, 'BillingComponent.doRetrieve', 'BillingService.getListBy'));
  }

  const onChangeRowsPerPage = (e) => {
    let paging = {
      ...currPageable.paging
    }
    paging.rowsPerPage = e.target.value
    paging.currentPage = 0;

    let data = {
      ...currPageable,
      paging: paging
    }
    dispatch(setPageable(data))
    doRetrieve();
  }
  const onChangePage = (e, newPage) => {
    let paging = {
      ...currPageable.paging
    }
    paging.currentPage = newPage

    let data = {
      ...currPageable,
      paging: paging
    }
    dispatch(setPageable(data))

    doRetrieve({
      searchBy: data.searchBy,
      searchValue: data.searchValue,
      currentPage: data.paging.currentPage,
      rowsPerPage: data.paging.rowsPerPage
    });
  }

  const doPayables = row => {
    console.log(`[BillingComponent.doPayables] id==>`, row)
    getStudentPayables(row.id).then(response => {
      console.log(`[BillingComponent.doPayables BillingService.getStudentPayables] response==>`, response)
      let payables = response.data.studentPayables.payables
      payables.map((row) => {
        // let value = row.payment ? row.payment.replaceAll(',', '') : 0;
        row.payment = formatter.format(row.payment)
        return row
      });
      let formData = {
        ...currPageable,
        INIT_STATUS: INIT_STATUS.RESET,
        entity: response.data.student,
        studentPayables: {
          ...response.data.studentPayables,
          payables: payables
        },
        billingByInvoice: {
          ...response.data.billingByInvoice
        },
        searchFlag: false,
        payablesFlag: true
      }
      doInitFormData(formData);
      //setStore(formData);
      dispatch(setPageable(formData))
    }).catch(error => {
      console.error(`[BillingComponent.doPayables BillingService.getStudentPayables] error==>`, error);
      console.error(`[BillingComponent.doPayables BillingService.getStudentPayables] error==>${JSON.stringify(error)}`);
      //showErrorAlert, showInfoAlert, showWarningAlert
      showErrorAlert(error.message);
    });
  }

  const doShowSaveConfirmDialog = (data) => {
    console.log(`[BillingComponent.doShowSaveConfirmDialog] data==>`, data);
    let paymentTotal = 0;
    let balanceTotal = 0;
    data.payables.map((row) => {
      let balance = row.balance ? row.balance.replaceAll(',', '') : 0
      let payment = row.payment ? row.payment.replaceAll(',', '') : 0

      row.balance = Number(balance)
      row.payment = Number(payment)

      balanceTotal += row.balance
      paymentTotal += row.payment

      return row
    });

    // doOpenSnackBar({
    //   message: `Total amount is ${paymentTotal}`
    // })

    if (Number(paymentTotal) == 0) {
      console.log(`[BillingComponent.doShowSaveConfirmDialog] 1 totalBalance=${balanceTotal}, paymentTotal=${paymentTotal}`);

      doOpenSnackBar({
        message: `Total amount is ${paymentTotal}`
      })
    } else {
      console.log(`[BillingComponent.doShowSaveConfirmDialog] 2 totalBalance=${balanceTotal}, paymentTotal=${paymentTotal}`);
      let confirmStoreTemp = {
        ...currConfirmPayables,
        INIT_STATUS: INIT_STATUS.RESET,
        open: true,
        entity: currPageable.entity,
        payables: data.payables,
        payablesByInvoiceNo: [],
        paymentTotal: paymentTotal,
        balanceTotal: balanceTotal - paymentTotal,
        invoiceNo: ''
      }
      doInitConfirmStore(confirmStoreTemp);

      console.log(`[BillingComponent.doSavePayables] confirmStoreTemp==>`, confirmStoreTemp);
      dispatch(setConfirmPayables(confirmStoreTemp));
    }

  }
  const doConfirmSavePayables = () => {
    console.log(`[BillingComponent.doConfirmSavePayables] confirmStore==>`, currConfirmPayables);
    doSavePayables(currConfirmPayables);
  }

  const doSavePayables = (data) => {
    console.log(`[BillingComponent.doSavePayables] data==>`, data);

    save(data.payables, data.entity.id).then(response => {
      console.log(`[BillingComponent.doSavePayables BillingService.save] response==>`, response)
      let formData = {
        ...currPageable,
        INIT_STATUS: INIT_STATUS.PAYABLES_RESET,
        entity: response.data.student,
        studentPayables: response.data.studentPayables,
        searchFlag: false,
        payablesFlag: true,
      }

      doInitFormData(formData);
      dispatch(setPageable(formData));

      let payablesByInvoiceNo = [
        //...response.data.studentPayables.payablesByInvoiceNo
      ]
      for (const row of response.data.studentPayables.payablesByInvoiceNo) {
        let temp = {
          ...row
        }
        payablesByInvoiceNo.push(temp)
      }

      console.log(`[BillingComponent.doSavePayables BillingService.save] payablesByInvoiceNo==>`, payablesByInvoiceNo)

      let paymentTotal = 0;
      payablesByInvoiceNo.map((row) => {
        row.paid = Number(row.paid)
        paymentTotal += row.paid
        return row
      })
      console.log(`[BillingComponent.doSavePayables BillingService.save] payablesByInvoiceNo==>`, payablesByInvoiceNo)

      dispatch(setConfirmPayables({
        ...currConfirmPayables,
        INIT_STATUS: INIT_STATUS.RESET,
        payables: [],
        invoiceDate: moment(response.data.studentPayables.invoiceDate).format('lll'),
        invoiceNo: response.data.studentPayables.invoiceNo,
        payablesByInvoiceNo: payablesByInvoiceNo,
        paymentTotal: paymentTotal,
        balanceTotal: 0
      }));
      // close dialog
      // setConfirmStore({
      //   ...confirmStore,
      //   payables: [],
      //   open: false,
      //   total: formatter.format(0),
      //   balanceTotal: formatter.format(0)
      // });

      doOpenSnackBar({
        message: 'Payables saved successfully!'
      })
    })
  }
  const doCloseSaveBillingDialog = () => {
    let confirmStoreTemp = {
      ...currConfirmPayables,
      open: false
    }
    dispatch(setConfirmPayables(confirmStoreTemp));
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

  const doOpenSnackBar = (state) => {
    setSnackbar({
      ...snackbar,
      open: true,
      ...state
    })
  }
  const doCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
      message: ''
    })
  }

  const doUpdateCurPageable = (data) => {
    dispatch(setPageable({
      ...currPageable,
      data
    }));
  }

  return (
    <>
      <BillingHtmlComponent
        store={currPageable}
        doRetrieve={doRetrieve}
        doPayables={doPayables}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        doShowSaveConfirmDialog={doShowSaveConfirmDialog}
        doSavePayables={doSavePayables}
        doUpdateCurPageable={doUpdateCurPageable}

      />
      <SavePayablesConfimationHtml
        confirmStore={currConfirmPayables}
        title="Please click save button to confirm."
        open={currConfirmPayables.open}
        closeDialog={doCloseSaveBillingDialog}
        saveDialog={doConfirmSavePayables} />
      {/* <SaveBillingDialog title="Please click save button to confirm."
        open={confirmStore.open}
        <SavePayablesConfimationHtml confirmStore={confirmStore}/>
      </SaveBillingDialog> */}


      <Snackbar open={open}
        autoHideDuration={6000}
        onClose={doCloseSnackbar}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={doCloseSnackbar} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}