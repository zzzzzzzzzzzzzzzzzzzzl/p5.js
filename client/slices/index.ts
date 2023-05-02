import { combineReducers } from '@reduxjs/toolkit'
import gameReducer from './Slice'
import navReducer from './nav'
import canvasReducer from './canvasDisplay'

export default combineReducers({
  game: gameReducer,
  nav:navReducer,
  canvas:canvasReducer,
})
