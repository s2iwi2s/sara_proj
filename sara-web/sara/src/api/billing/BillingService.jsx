import axios from "axios";
import { API_URL_BASE } from "../Utils";


class BillingService {

 getListBy = (by, searchValue, page, pageSize) => {
  const theurl = `${API_URL_BASE}billing/search/${by}?searchValue=${searchValue}&page=${page}&size=${pageSize}`
  return axios.get(theurl);
 }
 getStudentPayables = (id) => {
  const theurl = `${API_URL_BASE}billing/payables/${id}`
  return axios.get(theurl);
 }
}

export default new BillingService();


