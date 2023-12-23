import { combineReducers } from '@reduxjs/toolkit'
import CanvasToUI from './CanvasToUI'
import UIToCanvas from './UIToCanvas'

export default combineReducers({
  CanvasToUI: CanvasToUI,
  UIToCanvas: UIToCanvas,
})
