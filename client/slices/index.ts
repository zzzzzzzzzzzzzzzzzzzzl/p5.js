import { combineReducers } from '@reduxjs/toolkit'
import gameReducer from './Slice'

export default combineReducers({
  game: gameReducer,
})
