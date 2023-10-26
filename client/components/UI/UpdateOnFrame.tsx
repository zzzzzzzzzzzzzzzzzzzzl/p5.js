import { useAppSelector, useAppDispatch } from '../../hooks'
import { Link } from 'react-router-dom'
import { changeDisplay } from '../../slices/canvasDisplay'
import React, { Component } from 'react'
import Enviroment from './enviroment'

function Helpmegod() {
  const state = useAppSelector((state) => state.UI)
  return (
    <div style={{ color: 'white' }}>
      <p>Frame Count: {Math.round(state.fps)}</p>
    </div>
  )
}

export default Helpmegod
