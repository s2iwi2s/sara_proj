import axios from "axios";
import Utils, { API_URL_BASE } from '../Utils'

export const ENTITY = "address";
class AddressService {

 getList = (searchValue, page, pageSize) => {
  const theurl = `${Utils.urlListPattern(ENTITY)}?searchValue=${searchValue}&page=${page}&size=${pageSize}&sort=name,address1,city`
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
 getListByUser = (refId, searchValue) => {
  const theurl = `${API_URL_BASE}address/by/${refId}?searchValue=${searchValue}`
  return axios.get(theurl);
 }
 getByRefId = (refId, typeId) => {
  const theurl = `${API_URL_BASE}address/byRefId/${typeId}/${refId}`//ADDRESS_TYPE
  return axios.get(theurl);
 }
}

export default new AddressService();


