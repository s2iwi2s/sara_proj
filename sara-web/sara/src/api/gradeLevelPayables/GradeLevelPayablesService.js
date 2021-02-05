import axios from "axios";
import Utils, { API_URL_BASE, URL_OPTIONS } from "../Utils";


export const ENTITY = "gradeLevelPayables";
const sort = "priority,description"

export const getList = (searchValue, page, pageSize, periodId) => axios.get(`${Utils.urlListPattern(ENTITY)}/period/${periodId}`, {
 params: {
  searchValue: searchValue,
  page: page,
  size: pageSize,
  sort: sort
 }
})
export const get = (id) => axios.get(`${Utils.urlListPattern(ENTITY)}/${id}`)
export const getOptions = () => axios.get(`${Utils.urlOptionsPattern(ENTITY)}`)
export const getOptionsByPeriod = (periodId) => axios.get(API_URL_BASE + ENTITY + URL_OPTIONS + `/period/${periodId}`)
export const deleteItem = (id) => axios.delete(`${Utils.urlDeletePattern(ENTITY)}/${id}`)
export const save = (data) => axios.post(`${Utils.urlSavePattern(ENTITY)}`, data)

export default function GradeLevelPayablesService() {
}
