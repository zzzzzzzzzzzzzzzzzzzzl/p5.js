import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const uiSlice = createSlice({
  name: 'ss',
  initialState: {
    scene: 'creatureEditor',
  },

  reducers: {
    updateCanvasData: (state, action) => {
      state = action.payload
      return state
    },
    loadScene: (state, action) => {
      console.log(action.payload)
      state.scene = action.payload
      return state
    },
  },
})

export const CanvasToUI = (state: RootState) => state.CanvasToUI

export const { updateCanvasData, loadScene } = uiSlice.actions
export default uiSlice.reducer
