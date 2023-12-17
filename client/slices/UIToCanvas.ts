// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    fps: 0,
    camera: { scale: 0, x: 0, y: 0 },
    cursor: { x: 0, y: 0 },
    creatureCount: 0,
    foodCount: 0,
  },

  reducers: {
    updateUIData: (state, action) => {
      state = action.payload

      return state
    },
  },
})

export const uiSelector = (state: RootState) => state.UI

export const { updateUIData } = uiSlice.actions
export default uiSlice.reducer
