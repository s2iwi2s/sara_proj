import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
import { defaultPageable } from '../Utils'

import { resetSelectedItemCommon, updateSelectedItemCommon, setPageableCommon, setPageableEntityCommon, setSearchValueCommon, setOptionsListCommon } from '../CommonSlice'

const blankPageable = {
	...defaultPageable
}
const blankSelectedItem = {
	level: { 'id': '' },
	optionsList: {
		studentLevelList: []
	}
}

export const StudentSlice = createSlice({
	name: 'students',
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
			state.selectedItem = {
				...action.payload,
				birthDate: moment(action.payload.birthDate).format('YYYY-MM-DD'),
				optionsList: {
					studentLevelList: []
				}
			}
		},

		updateSelectedItem: (state, action) => updateSelectedItemCommon(state, action),
		setPageable: (state, action) => setPageableCommon(state, action),
		setPageableEntity: (state, action) => setPageableEntityCommon(state, action, blankPageable),
		setOptionsList: (state, action) => setOptionsListCommon(state, action),
	}
})

export const { resetSelectedItem, setSelectedItem, setPageable, setPageableEntity, setSearchValue, updateSelectedItem, setOptionsList } = StudentSlice.actions

export const selectPageable = state => state.students.pageable
export const selectSelectedItem = state => state.students.selectedItem
export const selectSearchValue = state => state.students.searchValue


export default StudentSlice.reducer;