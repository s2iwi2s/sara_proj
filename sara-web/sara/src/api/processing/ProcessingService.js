import axios from "axios";
import Utils, { API_URL_BASE, URL_OPTIONS } from "../Utils";

export const ProcessingService = () => {

 const ENTITY = "processing";
 const sort = "createdDate,desc"

 const getList = (searchValue, page, pageSize) => axios.get(`${Utils.urlListPattern(ENTITY)}?searchValue=${searchValue}&page=${page}&size=${pageSize}&sort=${sort}`)
 const get = (id) => axios.get(`${Utils.urlListPattern(ENTITY)}/${id}`)
 const getOptions = () => axios.get(`${Utils.urlOptionsPattern(ENTITY)}`)
 const deleteItem = (id) => axios.delete(`${Utils.urlDeletePattern(ENTITY)}/${id}`)

 const PROCESS_NAME_CLOSEPERIOD = "CLOSE_PERIOD"
 const getListClosePeriod = (searchValue, page, pageSize) => axios.get(`${Utils.urlListPattern(ENTITY) + '/' + PROCESS_NAME_CLOSEPERIOD}?searchValue=${searchValue}&page=${page}&size=${pageSize}&sort=${sort}`)
 const getOptionsByPeriod = (periodId) => axios.get(API_URL_BASE + ENTITY + URL_OPTIONS + `/period/${periodId}`)
 const saveClosePeriod = (data) => axios.patch(`${API_URL_BASE + ENTITY + '/period'}`, data)

 return {
  getList: getList,
  get: get,
  getOptions: getOptions,
  deleteItem: deleteItem,
  //save: save,

  getListClosePeriod: getListClosePeriod,
  getOptionsByPeriod: getOptionsByPeriod,
  saveClosePeriod: saveClosePeriod
 }
}

