import { combineReducers } from '@reduxjs/toolkit'
import CanvasToUI from './CanvasToUI'
import UIToCanvas from './UIToCanvas'
import keyboardInputs from './keyboardInputs'

export default combineReducers({
  CanvasToUI: CanvasToUI,
  UIToCanvas: UIToCanvas,
  keyboardInputs: keyboardInputs,
})
