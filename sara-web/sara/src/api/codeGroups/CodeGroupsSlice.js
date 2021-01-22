import { createSlice } from '@reduxjs/toolkit'
import { INIT_STATUS } from '../Utils'
import { resetSelectedItemCommon, setSelectedItemCommon, updateSelectedItemCommon, setPageableCommon, setPageableEntityCommon } from '../CommonSlice'

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
export const CodeGroupsSlice = createSlice({
	name: 'codeGroups',
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
		setSelectedItem: (state, action) => setSelectedItemCommon(state, action, blankSelectedItem),
		updateSelectedItem: (state, action) => updateSelectedItemCommon(state, action),
		setPageable: (state, action) => setPageableCommon(state, action),
		setPageableEntity: (state, action) => setPageableEntityCommon(state, action, blankPageable),
	}
})

export const { resetSelectedItem, setSelectedItem, updateSelectedItem, setPageable, setPageableEntity } = CodeGroupsSlice.actions

export const selectPageable = state => state.codeGroups.pageable
export const selectSelectedItem = state => state.codeGroups.selectedItem
export const selectSearchValue = state => state.codeGroups.searchValue


export default CodeGroupsSlice.reducer;