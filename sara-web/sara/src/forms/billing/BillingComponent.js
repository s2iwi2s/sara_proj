import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { ERROR_CODE, formatter, INIT_STATUS } from '../../api/Utils'

import BillingHtmlComponent from './BillingHtmlComponent';
import SavePayablesConfimationHtml from './SavePayablesConfimationHtml';

import { getListBy, getStudentPayablesByPeriod, save } from '../../api/billing/BillingService'
import { optionsList, selectPageable, setPageable, updatePageable } from '../../api/billing/BillingSlice';
import useMessageAlert from "../../api/useMessageAlert"

export default function BillingComponent() {
  const { showErrorMsgAlert } = useMessageAlert();

  const dispatch = useDispatch();
  const currPageable = useSelector(selectPageable)

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'center'
  })
  const { message, open, vertical, horizontal } = snackbar


  const [confirmStore, setConfirmStore] = useState({
    INIT_STATUS: INIT_STATUS.INIT,
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
    payablesByInvoiceNo: [],
    open: false
  })

  const doInitFormData = data => {
    //data.optionsList = optionsList;

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
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'BillingComponent.doRetrieve', 'BillingService.getListBy'));
  }

  const onChangeRowsPerPage = (e) => {
    let paging = {
      ...currPageable.paging
    }
    paging.rowsPerPage = e.target.value
    paging.currentPage = 0;

    let data = {
      paging: paging
    }
    doUpdateCurrPageable(data)

    doRetrieve();
  }
  const onChangePage = (e, newPage) => {
    let paging = {
      ...currPageable.paging
    }
    paging.currentPage = newPage

    let data = {
      paging: paging
    }
    doUpdateCurrPageable(data)

    doRetrieve({
      searchBy: data.searchBy,
      searchValue: data.searchValue,
      currentPage: data.paging.currentPage,
      rowsPerPage: data.paging.rowsPerPage
    });
  }

  const doUpdateCurrPageable = (formData) => {
    dispatch(updatePageable(formData))
  }
  const doPayables = (id, periodId) => {
    console.log(`[BillingComponent.doPayables BillingService.getStudentPayablesByPeriod] id=${id}, periodId=${periodId}`)
    getStudentPayablesByPeriod(id, periodId).then(response => {
      console.log(`[BillingComponent.doPayables BillingService.getStudentPayablesByPeriod] response==>`, response)
      console.log(`[BillingComponent.doPayables BillingService.getStudentPayablesByPeriod] response.data.optionsList==>`, response.data.optionsList)
      let payables = response.data.studentPayables.payables;
      payables.map((row) => {
        // let value = row.payment ? row.payment.replaceAll(',', '') : 0;
        row.payment = formatter.format(row.payment);
        return row
      });

      let optionsListTemp = {
        ...response.data.optionsList,
        ...optionsList
      }
      console.log(`[BillingComponent.doPayables BillingService.getStudentPayables] optionsListTemp==>`, optionsListTemp)
      let formData = {
        INIT_STATUS: INIT_STATUS.RESET,
        entity: response.data.student,
        periodId: periodId,
        studentPayables: {
          ...response.data.studentPayables,
          payables: payables
        },
        billingByInvoice: {
          ...response.data.billingByInvoice
        },
        paymentBalance: {
          ...response.data.paymentBalance
        },

        searchFlag: false,
        payablesFlag: true
      }

      doInitFormData(formData);
      formData.optionsList = optionsListTemp

      console.log(`[BillingComponent.doPayables BillingService.getStudentPayables] formData==>`, formData)
      doUpdateCurrPageable(formData)


    })
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'BillingComponent.doPayables', 'BillingService.getStudentPayables'));
  }
  const doShowSaveConfirmDialog = (data) => {
    console.log(`[BillingComponent.doShowSaveConfirmDialog] data==>`, data);
    let paymentTotal = 0;
    let balanceTotal = 0;
    data.payables.map((row) => {
      let balance = row.balance ? row.balance.replaceAll(',', '') : 0;
      let payment = row.payment ? row.payment.replaceAll(',', '') : 0;

      row.balance = Number(balance);
      row.payment = Number(payment);

      balanceTotal += row.balance;
      paymentTotal += row.payment;
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
        ...confirmStore,
        INIT_STATUS: INIT_STATUS.RESET,
        open: true,
        entity: currPageable.entity,
        payables: data.payables,
        payablesByInvoiceNo: [],
        paymentTotal: paymentTotal,
        balanceTotal: balanceTotal - paymentTotal,
        invoiceNo: '',
        periodId: currPageable.periodId,
        comment: data.comment,
        invoiceDate: data.invoiceDate
      }
      doInitConfirmStore(confirmStoreTemp);

      console.log(`[BillingComponent.doShowSaveConfirmDialog] confirmStoreTemp==>`, confirmStoreTemp);
      setConfirmStore(confirmStoreTemp);
    }

  }
  const doConfirmSavePayables = () => {
    console.log(`[BillingComponent.doConfirmSavePayables] confirmStore==>`, confirmStore);
    doSavePayables(confirmStore);
  }

  const doSavePayables = (data) => {
    console.log(`[BillingComponent.doSavePayables] data==>`, data);

    save(data.payables, data.entity.id, data.periodId, moment(data.invoiceDate)).then(response => {
      console.log(`[BillingComponent.doSavePayables BillingService.save] response==>`, response)
      let formData = {
        INIT_STATUS: INIT_STATUS.PAYABLES_RESET,
        entity: response.data.student,
        studentPayables: response.data.studentPayables,
        searchFlag: false,
        payablesFlag: true,
      }

      console.log(`[BillingComponent.doSavePayables BillingService.save] 1 formData==>`, formData)
      doInitFormData(formData);
      console.log(`[BillingComponent.doSavePayables BillingService.save] 2 formData==>`, formData)
      dispatch(updatePageable(formData));
      console.log(`[BillingComponent.doSavePayables BillingService.save] 3 formData==>`, formData)
      let payablesByInvoiceNo = [
        //...response.data.studentPayables.payablesByInvoiceNo
      ]
      console.log(`[BillingComponent.doSavePayables BillingService.save] 0 payablesByInvoiceNo==>`, payablesByInvoiceNo)
      for (const row of response.data.studentPayables.payablesByInvoiceNo) {
        let temp = {
          ...row
        }
        payablesByInvoiceNo.push(temp)
      }

      console.log(`[BillingComponent.doSavePayables BillingService.save] 1 payablesByInvoiceNo==>`, payablesByInvoiceNo)

      let paymentTotal = 0;
      payablesByInvoiceNo.map((row) => {
        row.paid = Number(row.paid);
        paymentTotal += row.paid;
        return row
      });
      console.log(`[BillingComponent.doSavePayables BillingService.save] 2 payablesByInvoiceNo==>`, payablesByInvoiceNo)

      setConfirmStore({
        ...confirmStore,
        INIT_STATUS: INIT_STATUS.RESET,
        payables: [],
        invoiceDate: moment(response.data.studentPayables.invoiceDate).format('L'),
        invoiceNo: response.data.studentPayables.invoiceNo,
        payablesByInvoiceNo: payablesByInvoiceNo,
        paymentTotal: paymentTotal,
        balanceTotal: 0
      });

      doUpdateCurrPageable({
        billingByInvoice: {
          ...response.data.billingByInvoice
        },
      })

      doOpenSnackBar({
        message: 'Payables saved successfully!'
      })
    })
      .catch(error => showErrorMsgAlert(error, ERROR_CODE.LIST_ERROR, 'BillingComponent.doSavePayables', 'BillingService.save'));
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
        doUpdateCurrPageable={doUpdateCurrPageable}
      />
      <SavePayablesConfimationHtml
        confirmStore={confirmStore}
        title="Please click save button to confirm."
        open={confirmStore.open}
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