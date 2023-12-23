import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const uiSlice = createSlice({
  name: 'canvas',
  initialState: {
    scene: 'environment',
  },

  reducers: {
    updateCanvasData: (state, action) => {
      state = action.payload
      return state
    },
    loadScene: (state, action) => {
      state.scene = action.payload
      return state
    },
  },
})

export const CanvasToUI = (state: RootState) => state.CanvasToUI

export const { updateCanvasData, loadScene } = uiSlice.actions
export default uiSlice.reducer
