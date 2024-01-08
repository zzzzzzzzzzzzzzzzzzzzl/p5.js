import { useAppDispatch } from '../../hooks'

import React from 'react'
import { loadScene } from '../../slices/UIToCanvas'

let colour = [
  50 + Math.random() * 60,
  80 + Math.random() * 60,
  20 + Math.random() * 20,
]

export function Button(props) {
  const dispatch = useAppDispatch()
  const objFN = {
    loadScene: () => {
      dispatch(loadScene(props.name))
    },
    heck: () => {},
    //editorsave
    //editorload
    //editor
  }
  const style = {
    backgroundColor: `rgb(${props.colour})`,
    borderRadius: '10px',
    display: 'inline-block',
    padding: '20px',
    margin: '5px',
  }

  return (
    <div id="stats" style={style} onClick={objFN[props.fn]}>
      <div
        onClick={objFN[props.fn]}
        id="stats"
        style={{ color: 'white', margin: 'auto', fontSize: '21px' }}
      >
        {props.name}:{' '}
      </div>
    </div>
  )
}
