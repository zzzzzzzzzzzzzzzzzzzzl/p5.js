// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

let sampleData = {vision:50+500*Math.random(),size:Math.random()*5+20,greed:Math.random(),speed:.5+Math.random(),aggresion:(Math.random()-.75),
  largeAggresion:(Math.random()-.75),smallAggresion:(Math.random()-.25)}

export const gameSlice = createSlice({
  name: 'game',
  initialState: sampleData,

  reducers: {
    test: (state, action) => {
      return action.payload
    },
   
  },
})

export const gameSelector = (state: RootState) => state.game
export const {
  test,
} = gameSlice.actions
export default gameSlice.reducer
