import { useAppDispatch } from '../../hooks'

import React from 'react'
import { loadScene } from '../../slices/UIToCanvas'

export function LoadScene(props) {
  const dispatch = useAppDispatch()

  let colour = [
    50 + Math.random() * 60,
    80 + Math.random() * 60,
    20 + Math.random() * 20,
  ]
  function handleClick(event) {
    dispatch(loadScene(props.name))
  }
  return (
    <div
      id="stats"
      onClick={handleClick}
      style={{
        backgroundColor: `rgb(${colour})`,
        height: '100px',
        borderRadius: '10px',
        display: 'inline-block',
        padding: '20px',
        margin: '5px',
      }}
    >
      <div
        id="stats"
        style={{ color: 'white', margin: 'auto', fontSize: '21px' }}
      >
        {props.name}:{' '}
      </div>
      here{' '}
    </div>
  )
}
