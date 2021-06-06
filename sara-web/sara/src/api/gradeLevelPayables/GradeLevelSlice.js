import { createSlice } from '@reduxjs/toolkit'
import { resetSelectedItemCommon, setPageableCommon, setPageableEntityCommon, updateSelectedItemCommon } from '../CommonSlice';
import { defaultPageable } from '../Utils'

const blankPageable = {
	...defaultPageable
}
const blankSelectedItem = {
	level: { 'id': '' },
	period: { 'id': '' },
	active: true,
	text: false,
	list: [],
	optionsList: {
		levelList: [],
		periodList: [],
		applyToAllList: []
	}
}

const initForm = (values) => {
	let data = {
		...values
	}
	if (data.period == null) {
		data.period = { 'id': '' }
	}
	return data
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
		setSelectedItem: (state, action) => {
			console.log(`[GradeLevelSlice.setSelectedItem] action=`, action)
			const data = initForm(action.payload)
			state.selectedItem = {
				...blankSelectedItem,
				...data
			}
			console.log(`[GradeLevelSlice.setSelectedItem] state.selectedItem=`, state.selectedItem)
		},

		setOptionsList: (state, action) => {
			console.log(`[GradeLevelSlice.setOptionsList] START =====>`)
			console.log(`[GradeLevelSlice.setOptionsList] action=>`, action)
			const optionsList = action.payload.optionsList

			state.selectedItem = {
				...state.selectedItem,
				list: [],
				optionsList: { ...optionsList }
			}

			let list = action.payload.accountPayablesSettings? action.payload.accountPayablesSettings : []
			let applyToAllList = optionsList.applyToAllList;
			if (list.length === 0) {
				list = [...applyToAllList];
				list.map(i => i.status = 'NEW');
			} else {
				let tempList = [];
				applyToAllList.map(row => {
					const filterCount = list.filter(item => row.id === item.id).length;
					if (filterCount === 0) {
						let rowTemp = {
							...row,
							status: 'NEW'
						}
						tempList.push(rowTemp)
					}
					return row
				});

				let tempList2 = [
					...tempList,
					...list
				];
				list = tempList2;
			}
			list = list.sort((o1, o2) => {
				return o1.priority - o2.priority;
			})
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