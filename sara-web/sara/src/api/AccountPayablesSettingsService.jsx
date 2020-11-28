import axios from "axios";
import Utils, { API_URL_BASE, URL_LIST } from "./Utils";


export const ENTITY = "accountPayablesSettings";

class AccountPayablesSettingsService {

 getList = (searchValue, page, pageSize) => {
  const theurl = `${Utils.urlListPattern(ENTITY)}?searchValue=${searchValue}&page=${page}&size=${pageSize}&sort=priority,description, amount`
  return axios.get(theurl);
 }
 get = (id) => {
  const theurl = `${Utils.urlDetailsPattern(ENTITY)}/${id}`
  return axios.get(theurl);
 }
 delete = (id) => {
  const theurl = `${Utils.urlDeletePattern(ENTITY)}/${id}`
  return axios.delete(theurl);
 }
 save = (data) => {
  const theurl = `${Utils.urlSavePattern(ENTITY)}`
  return axios.post(theurl, data);
 }
 getActiveList = (searchValue, page, pageSize) => {
  const theurl = `${API_URL_BASE + ENTITY + "/active"}?searchValue=${searchValue}&page=${page}&size=${pageSize}&sort=priority,description,amount`
  return axios.get(theurl);
 }
 getApplyToAllList = () => {
  const theurl = `${API_URL_BASE + ENTITY + "/applyToAllList"}`
  return axios.get(theurl);
 }
}

export default new AccountPayablesSettingsService();


