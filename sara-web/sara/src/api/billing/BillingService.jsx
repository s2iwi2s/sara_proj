import axios from "axios";
import Utils, { API_URL_BASE } from "../Utils";

export const getListBy = (by, searchValue, page, pageSize) => axios.get(`${API_URL_BASE}billing/search/${by}?searchValue=${searchValue}&page=${page}&size=${pageSize}`)

export const getStudentPayables = (id) => axios.get(`${API_URL_BASE}billing/payables/${id}`)

export const save = (data, id) => axios.post(`${Utils.urlSavePattern('billing')}/${id}`, data)

export default function BillingService() {
}

