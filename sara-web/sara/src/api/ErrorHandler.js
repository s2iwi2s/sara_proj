import { useGlobalVariable } from "../providers/GlobalVariableProvider";
import Utils from "./Utils";

export default function ErrorHandler() {
 const [globalProps, setGlobalProps, showErrorAlert, showInfoAlert, showWarningAlert, showSuccessAlert] = useGlobalVariable();

 const handleErrorResponse = (error, comp) => {
  const errStr = JSON.stringify(error);


  console.error(`Utils[][${comp}][ERROR] ${errStr}`)
  if (error.status) {
   //{"timestamp":"2020-08-24T23:57:30.853+00:00","status":401,"error":"Unauthorized","message":"Unauthorized","path":"/users/test/todos"}
   console.error(`[Utils][${comp}][ERROR] ${error.status}: ${error.message}`)
  } else {
   console.error(`[Utils][${comp}][ERROR] ${error.name}: ${error.message}`)
   console.error(`[Utils][${comp}][ERROR] stack ${error.stack}`)
  }


  const { errorCode, formMethod, serviceName } = comp
  const errMsg = Utils.getFormatedErrorMessage(error, errorCode, formMethod, serviceName)
  showErrorAlert(errMsg)

  //const errorMessage = `${error.name}: ${error.message}`;
  //this.handleState('', errorMessage);
  //console.error(error);
 }

}