import { useAppSelector, useAppDispatch } from '../../hooks'
import { Link } from 'react-router-dom'
import { changeDisplay } from '../../slices/canvasDisplay'
import React, { Component } from 'react'
import Enviroment from './enviroment'
import { stat } from 'node:fs'

function Helpmegod() {
  const state = useAppSelector((state) => state.UI)
  return (
    <div style={{ color: 'white' }}>
      <p>Frame Count: {Math.round(state.fps)}</p>
      <p>camera Stats: scale:{Number(state.cameraScale.toFixed(2))},translate:{state.cameraTranslateX}</p>
    </div>

    
    
  )
}

export default Helpmegod
