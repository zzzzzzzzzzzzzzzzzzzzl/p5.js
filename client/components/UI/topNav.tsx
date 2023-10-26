import { useAppDispatch } from '../../hooks'
import { Link } from 'react-router-dom'
import { changeDisplay } from '../../slices/canvasDisplay'
import React from 'react'
import Enviroment from './enviroment'

function TopNav() {
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

  function handleClick(b) {
    dispatch(changeDisplay(b))
  }
  // let help = Enviroment.p5.fps
  return (
    <div
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 3fr))',
        gridGap: '10px',
      }}
    >
      <Link to={'/'} onClick={() => handleClick(true)}>
        <div
          id="stats"
          style={{
            backgroundColor: `rgb(${colour})`,
            height: '50px',
            borderRadius: '10px',
            display: 'inline-block',
            padding: '20px',
            margin: '5px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              color: 'white',
              margin: 'auto',
              fontSize: '21px',
              textDecoration: 'none',
            }}
          >
            Worms:{' '}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default React.memo(TopNav)
