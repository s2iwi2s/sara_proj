import { createSlice } from '@reduxjs/toolkit'
import { resetSelectedItemCommon, updateSelectedItemCommon, setPageableCommon, setPageableEntityCommon, setOptionsListCommon } from '../CommonSlice'
import { INIT_STATUS } from '../Utils'

const blankPageable = {
	INIT_STATUS: INIT_STATUS.INIT,
	list: [],
	searchValue: '',
	paging: {
		rowsPerPage: 25,
		totalElements: 0,
		currentPage: 0,
		totalPage: 0
	}
}
export const blankSelectedItem = {
	currentPeriod: { 'id': '' },
	optionsList: {
		periodList: []
	}
}

const initForm = (values) => {
	let data = {
		...values
	}
	if (data.currentPeriod == null) {
		data.currentPeriod = { 'id': '' }
	}
	return data
}

export const SchoolSlice = createSlice({
	name: 'school',
	initialState: {
		searchValue: '',
		pageable: {
			...blankPageable
		},
		selectedItem: {
			...blankSelectedItem
		}
	},
	reducers: {
		resetSelectedItem: (state, action) => resetSelectedItemCommon(state, action, blankSelectedItem),
		setSelectedItem: (state, action) => {
			const data = initForm(action.payload)
			state.selectedItem = {
				...blankSelectedItem,
				...data
			}
		},
		updateSelectedItem: (state, action) => updateSelectedItemCommon(state, action),
		setPageable: (state, action) => setPageableCommon(state, action),
		setPageableEntity: (state, action) => setPageableEntityCommon(state, action, blankPageable),
		setOptionsList: (state, action) => setOptionsListCommon(state, action),
	}
})

export const { resetSelectedItem, setSelectedItem, setPageable, setPageableEntity, updateSelectedItem, setOptionsList } = SchoolSlice.actions

export const selectPageable = state => state.school.pageable
export const selectSelectedItem = state => state.school.selectedItem
export const selectSearchValue = state => state.school.searchValue

export default SchoolSlice.reducer;