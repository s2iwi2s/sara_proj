import { createSlice } from '@reduxjs/toolkit'
import { INIT_STATUS } from '../Utils'
import { resetSelectedItemCommon, setSelectedItemCommon, updateSelectedItemCommon, setPageableCommon, setPageableEntityCommon, setOptionsListCommon } from '../CommonSlice'

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
	school: { id: '' },
	optionsList: {
		schoolList: [],
	}
}

export const UsersSlice = createSlice({
	name: 'users',
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
		setOptionsList: (state, action) => setOptionsListCommon(state, action),
	}
})

export const { setSelectedItem, updateSelectedItem, setPageable, setPageableEntity, setSearchValue, setOptionsList, resetSelectedItem } = UsersSlice.actions

export const selectPageable = state => state.users.pageable
export const selectSelectedItem = state => state.users.selectedItem
export const selectSearchValue = state => state.users.searchValue


export default UsersSlice.reducer;