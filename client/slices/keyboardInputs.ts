import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const keyboardInputs = createSlice({
  name: 'keyboardInputs',
  initialState: {
    keyUp: '',
  },

  reducers: {
    keyUp: (state, action) => {
      if (!action.payload) {
        action.payload = ''
      }
      state = action.payload
      return state
    },
  },
})

export const CanvasToUI = (state: RootState) => state.keyboardInputs

export const { keyUp } = keyboardInputs.actions
export default keyboardInputs.reducer
