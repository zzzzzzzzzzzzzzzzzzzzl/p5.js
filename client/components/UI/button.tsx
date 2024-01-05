import { useAppDispatch } from '../../hooks'

import React from 'react'
import { loadScene } from '../../slices/UIToCanvas'
export function Button(props) {
  const dispatch = useAppDispatch()
  const objFN = {
    loadScene: () => {
      dispatch(loadScene(props.name))
    },
    heck: () => {},
  }
  let colour = [
    50 + Math.random() * 60,
    80 + Math.random() * 60,
    20 + Math.random() * 20,
  ]

  return (
    <div
      id="stats"
      style={{
        backgroundColor: `rgb(${colour})`,
        height: '100px',
        borderRadius: '10px',
        display: 'inline-block',
        padding: '20px',
        margin: '5px',
      }}
      onClick={objFN[props.fn]}
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
