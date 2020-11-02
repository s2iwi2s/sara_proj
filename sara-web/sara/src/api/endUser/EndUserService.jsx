import axios from "axios";
import Utils from "../Utils";

export const ENTITY = "user";
class EndUserService {

 getList = (searchValue, page, pageSize) => {
  const theurl = `${Utils.urlListPattern(ENTITY)}?searchValue=${searchValue}&page=${page}&size=${pageSize}`
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
}

export default new EndUserService();


