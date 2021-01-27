
import { useGlobalVariable } from '../providers/GlobalVariableProvider';
import Utils from './Utils';

export const useMessageAlert = () => {

 // const [globalProps, , setAlertProps, , , , ,] = useGlobalVariable();
 const [globalProps, setGlobalProps, setAlertProps] = useGlobalVariable();
 const showErrorMsgAlert = (error, errorCode, formMethod, serviceName) => {
  let errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName)
  showMsgAlert(true, errMsg, 'error')
 }

 const showErrorAlert = (msg) => {
  showMsgAlert(true, msg, 'error')
 }

 const showInfoAlert = (msg) => {
  showMsgAlert(true, msg, 'info')
 }

 const showWarningAlert = (msg) => {
  showMsgAlert(true, msg, 'warning')
 }

 const showSuccessAlert = (msg) => {
  showMsgAlert(true, msg, 'success')
 }

 const showMsgAlert = (open, msg, severity) => {
  setAlertProps({
   open: open,
   severity: severity,
   msg: msg,
  })
 }

 const closeMsgAlert = () => {
  console.log(`[useMessageAlert.closeMsgAlert] 1 globalProps=>`, globalProps)
  setAlertProps({
   open: false
  })

  console.log(`[useMessageAlert.closeMsgAlert] 2 globalProps=>`, globalProps)
 }

 return [
  globalProps,
  showErrorAlert,
  showErrorMsgAlert,
  showInfoAlert,
  showWarningAlert,
  showSuccessAlert,
  closeMsgAlert
 ]
}
