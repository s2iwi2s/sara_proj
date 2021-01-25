import { createSlice } from '@reduxjs/toolkit'
import { INIT_STATUS } from '../Utils'
import { resetSelectedItemCommon, setSelectedItemCommon, updateSelectedItemCommon, setPageableCommon, setPageableEntityCommon, setOptionsListCommon } from '../CommonSlice'


export const optionsList = {
	billingSearchBy: [{
		id: '1',
		value: 'STUDENT_ID',
		label: 'Student ID'
	}, {
		id: '2',
		value: 'STUDENT_NAME',
		label: 'Student Name'
	}]
}
const blankPageable = {
	INIT_STATUS: INIT_STATUS.INIT,
	list: [],
	searchValue: '',
	searchBy: '',
	searchFlag: true,
	payablesFlag: false,
	paging: {
		rowsPerPage: 25,
		totalElements: 0,
		currentPage: 0,
		totalPage: 0
	},
	optionsList: optionsList
}
const blankSelectedItem = {
	studentId: '',
	firstName: '',
	lastName: '',
	level: {
		id: '',
		value: '',
		description: ''
	},
	school: {
		id: ''
	}
}

const blankConfirmPayables = {
	INIT_STATUS: INIT_STATUS.INIT,
	entity: {
		studentId: '',
		firstName: '',
		lastName: '',
		level: {
			id: '',
			value: '',
			description: ''
		}
	},
	payables: [],
	payablesByInvoiceNo: [],
	open: false
}

export const BillingSlice = createSlice({
	name: 'billing',
	initialState: {
		pageable: {
			...blankPageable
		},
		selectedItem: {
			...blankSelectedItem
		},
		confirmPayables: {
			...blankConfirmPayables
		}
	},
	reducers: {
		resetSelectedItem: (state, action) => resetSelectedItemCommon(state, action, blankSelectedItem),
		setSelectedItem: (state, action) => setSelectedItemCommon(state, action, blankSelectedItem),
		updateSelectedItem: (state, action) => updateSelectedItemCommon(state, action),
		setPageable: (state, action) => setPageableCommon(state, action),
		setPageableEntity: (state, action) => setPageableEntityCommon(state, action, blankPageable),
		setOptionsList: (state, action) => setOptionsListCommon(state, action),

		setConfirmPayables: (state, action) => {
			state.confirmPayables = {
				...action.payload
			}
		},
	}
})

export const { setSelectedItem, updateSelectedItem, setPageable, setPageableEntity, setSearchValue, setOptionsList, resetSelectedItem, setConfirmPayables } = BillingSlice.actions

export const selectPageable = state => state.billing.pageable
export const selectSelectedItem = state => state.billing.selectedItem
export const selectSearchValue = state => state.billing.searchValue
export const selectConfirmPayables = state => state.billing.confirmPayables


export default BillingSlice.reducer;