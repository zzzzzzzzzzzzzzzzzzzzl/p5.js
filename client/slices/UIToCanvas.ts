// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    fps: 0,
    cameraScale: 0
    ,cameraTranslateX:0
    ,cameraTranslateY:0
  },

  reducers: {
    updateFPS: (state, action) => {
      state.fps = action.payload
      return state
    },
    updateCamera: (state, action) => {
      if (action.payload){
        state.cameraScale = action.payload.scale
        state.cameraTranslateX=action.payload.translate.x
        state.cameraTranslateY=action.payload.translate.y

        return state

      }
    },
  },
})

export const uiSelector = (state: RootState) => state.UI

export const { updateFPS,updateCamera } = uiSlice.actions
export default uiSlice.reducer
