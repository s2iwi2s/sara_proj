import axios from "axios";
import Utils from "../Utils";

const ENTITY = "user";

const sort = "lastName, firstName"

export const getList = (searchValue, page, pageSize) => axios.get(`${Utils.urlListPattern(ENTITY)}?searchValue=${searchValue}&page=${page}&size=${pageSize}&sort=${sort}`)
export const get = (id) => axios.get(`${Utils.urlListPattern(ENTITY)}/${id}`)
export const getOptions = () => axios.get(`${Utils.urlOptionsPattern(ENTITY)}`)
export const deleteItem = (id) => axios.delete(`${Utils.urlDeletePattern(ENTITY)}/${id}`)
export const save = (data) => axios.post(`${Utils.urlSavePattern(ENTITY)}`, data)


const  EndUserService = () => {
 const test = () => {

 }
 return [test]
}

export default EndUserService


