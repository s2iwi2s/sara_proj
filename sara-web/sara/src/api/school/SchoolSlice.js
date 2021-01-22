import { createSlice } from '@reduxjs/toolkit'
import { resetSelectedItemCommon, setSelectedItemCommon, updateSelectedItemCommon, setPageableCommon, setPageableEntityCommon, setSearchValueCommon } from '../CommonSlice'
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
const blankSelectedItem = {
	optionsList: {
	}
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
		setSelectedItem: (state, action) => setSelectedItemCommon(state, action),
		updateSelectedItem: (state, action) => updateSelectedItemCommon(state, action),
		setPageable: (state, action) => setPageableCommon(state, action),
		setPageableEntity: (state, action) => setPageableEntityCommon(state, action, blankPageable),
	}
})

export const { resetSelectedItem, setSelectedItem, setPageable, setPageableEntity, updateSelectedItem } = SchoolSlice.actions

export const selectPageable = state => state.school.pageable
export const selectSelectedItem = state => state.school.selectedItem
export const selectSearchValue = state => state.school.searchValue

export default SchoolSlice.reducer;