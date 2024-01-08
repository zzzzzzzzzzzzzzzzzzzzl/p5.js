import { useAppDispatch } from '../../hooks'
import React from 'react'
import { Button } from './button'
import { loadScene } from '../../slices/UIToCanvas'

function Nav() {
  return (
    <div
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 3fr))',
        gridGap: '10px',
      }}
    >
      <Button name="creatureEditor" fn="loadScene" />
      <Button name="environment" fn="loadScene" />
    </div>
  )
}

export default React.memo(Nav)
