// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState: true,

  reducers: {
    changeDisplay: (state, action) => {
      return action.payload
    },
  },
})

export const canvasSelector = (state: RootState) => state.canvas

export const { changeDisplay } = canvasSlice.actions
export default canvasSlice.reducer
