import axios from "axios";
import Utils, { API_URL_BASE } from "../Utils";


class BillingService {

 getListBy = (by, searchValue, page, pageSize) => {
  const theurl = `${API_URL_BASE}billing/search/${by}?searchValue=${searchValue}&page=${page}&size=${pageSize}`
  return axios.get(theurl);
 }
 getStudentPayables = (id) => {
  const theurl = `${API_URL_BASE}billing/payables/${id}`
  return axios.get(theurl);
 }
 save = (data, id) => {
  const theurl = `${Utils.urlSavePattern('billing')}/${id}`
  return axios.post(theurl, data);
 }
}

export default new BillingService();


