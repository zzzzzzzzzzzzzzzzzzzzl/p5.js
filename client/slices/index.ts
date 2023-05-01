import { combineReducers } from '@reduxjs/toolkit'
import gameReducer from './Slice'
import navReducer from './nav'

export default combineReducers({
  game: gameReducer,
  nav:navReducer
})
