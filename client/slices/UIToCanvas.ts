// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    fps: 0,
  },

  reducers: {
    updateFPS: (state, action) => {
      state.fps = action.payload
      return state
    },
  },
})

export const uiSelector = (state: RootState) => state.UI

export const { updateFPS } = uiSlice.actions
export default uiSlice.reducer
