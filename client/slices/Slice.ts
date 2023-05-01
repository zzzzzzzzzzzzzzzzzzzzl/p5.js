// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

let sampleData = []

export const gameSlice = createSlice({
  name: 'game',
  initialState: sampleData,

  reducers: {
    test: (state, action) => {
      const newState=action.payload
      return action.payload
    },
   
  },
})
export const gameSelector = (state: RootState) => state.game
export const {
  test,
} = gameSlice.actions
export default gameSlice.reducer
