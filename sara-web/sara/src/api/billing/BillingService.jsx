import axios from "axios";
import Utils, { API_URL_BASE } from "../Utils";

export const getListBy = (by, searchValue, page, pageSize) => axios.get(`${API_URL_BASE}billing/search/${by}?searchValue=${searchValue}&page=${page}&size=${pageSize}`)

export const getStudentPayables = (id) => axios.get(`${API_URL_BASE}billing/payables/${id}`)
export const getStudentPayablesByPeriod = (id, periodId) => axios.get(`${API_URL_BASE}billing/payables/${id}/period/${periodId}`)

export const save = (data, id, periodId, invoiceDate) => axios.post(`${Utils.urlSavePattern('billing')}/${id}/${periodId}/${invoiceDate}`, data)

export default function BillingService() {
}