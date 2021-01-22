import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
import { resetSelectedItemCommon, setPageableCommon, setPageableEntityCommon, setSelectedItemCommon, updateSelectedItemCommon } from '../CommonSlice';
import { defaultPageable } from '../Utils'

const blankPageable = {
	...defaultPageable
}
const blankSelectedItem = {
	level: { 'id': '' },
	active: true,
	list: [],
	optionsList: {
		levelList: []
	}
}

export const GradeLevelSlice = createSlice({
	name: 'gradeLevels',
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

		setOptionsList: (state, action) => {
			console.log(`[GradeLevelSlice.setOptionsList] action=`, action)
			const optionsList = action.payload
			let list = state.selectedItem.accountPayablesSettings ? state.selectedItem.accountPayablesSettings : []
			let applyToAllList = optionsList.applyToAllList;
			if (list.length === 0) {
				list = [...applyToAllList]
				list.map(i => i.status = 'NEW')
			} else {
				let temp = [];
				let tempList = [];
				list.map(({ id }) => {
					temp.push(id);
				});
				applyToAllList.map((row) => {
					if (temp.indexOf(row.id) === -1) {
						let rowTemp = {
							...row,
							status: 'NEW'
						}
						tempList.push(rowTemp)
					}
				});

				let tempList2 = [
					...tempList,
					...list
				];
				list = tempList2;
			}
			state.selectedItem = {
				...state.selectedItem,
				list: list,
				optionsList: { ...optionsList }
			}
		},

		updateSelectedItem: (state, action) => updateSelectedItemCommon(state, action),
		setPageable: (state, action) => setPageableCommon(state, action),
		setPageableEntity: (state, action) => setPageableEntityCommon(state, action, blankPageable),
		// updateSelectedItem: (state, action) => {
		// 	let temp = {
		// 		...state.selectedItem,
		// 		...action.payload
		// 	}
		// 	state.selectedItem = temp
		// },

		// setPageable: (state, action) => {
		// 	state.pageable = action.payload
		// },

		// setPageableEntity: (state, action) => {
		// 	let temp = {
		// 		...blankPageable
		// 	}
		// 	temp.list = [action.payload]
		// 	state.pageable = temp
		// },
	}
})

export const { setSelectedItem, resetSelectedItem, setOptionsList, updateSelectedItem, setPageable, setPageableEntity, setSearchValue } = GradeLevelSlice.actions

export const selectPageable = state => state.gradeLevels.pageable
export const selectSelectedItem = state => state.gradeLevels.selectedItem
export const selectSearchValue = state => state.gradeLevels.searchValue


export default GradeLevelSlice.reducer;