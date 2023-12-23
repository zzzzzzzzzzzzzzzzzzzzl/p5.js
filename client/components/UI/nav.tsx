import { useAppDispatch } from '../../hooks'
import React from 'react'
import { LoadScene } from './LoadScene'

function Nav() {
  const dispatch = useAppDispatch()

  let colour = [
    50 + Math.random() * 60,
    80 + Math.random() * 60,
    20 + Math.random() * 20,
  ]
  function incrementColour() {
    colour = colour.map((i) => {
      return i + 20 - Math.random() * 40
    })
    return colour
  }

  return (
    <div
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 3fr))',
        gridGap: '10px',
      }}
    >
      <LoadScene name="creatureEditor" />
      <LoadScene name="environment" />
    </div>
  )
}

export default React.memo(Nav)
