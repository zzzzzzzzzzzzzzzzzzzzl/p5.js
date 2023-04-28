// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'



// {id:id,task:input,done:false}
const sampleData = []

// where our business logic goes
export const gameSlice = createSlice({
  name: 'game',
  initialState: sampleData,

  reducers: {
    test: (state, action) => {
      const newState = state
      return newState
    },
   
  },
})

// a selector to be used as: const example = useSelector(exampleSelector)
export const gameSelector = (state: RootState) => state.game

// actions to be dispatched using dispatch(exampleAddToArray({ example: 'hi' }))
export const {
  test,
} = gameSlice.actions

// the reducer to be used in store.js
export default gameSlice.reducer
