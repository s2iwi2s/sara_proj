
export const resetSelectedItemCommon = (state, action, blankSelectedItem) => {
 state.selectedItem = {
  ...blankSelectedItem
 }
}

export const setSelectedItemCommon = (state, action, blankSelectedItem) => {
 state.selectedItem = {
  ...blankSelectedItem,
  ...action.payload
 }
}

export const updateSelectedItemCommon = (state, action) => {
 let temp = {
  ...state.selectedItem,
  ...action.payload
 }
 state.selectedItem = temp
}

export const setPageableCommon = (state, action) => {
 state.pageable = action.payload
}

export const setPageableEntityCommon = (state, action, blankPageable) => {
 let temp = {
  ...blankPageable
 }
 temp.list = [action.payload]
 state.pageable = temp
}
export const setSearchValueCommon = (state, action) => {
 state.searchValue = action.payload
}

export const setOptionsListCommon = (state, action) => {
 state.selectedItem = {
  ...state.selectedItem,
  optionsList: { ...action.payload }
 }
}

export default function CommonSlice() {

}