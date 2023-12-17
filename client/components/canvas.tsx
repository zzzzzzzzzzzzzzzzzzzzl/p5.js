import { useAppSelector } from '../hooks'
import Environment from './creature/Environment'
import Sketch from 'react-p5'

function Canvas() {
  const state = useAppSelector((state) => state.game)

  let env = new Environment(800, 50, 1000)
  return (
    // <div style={{ display: 'inline-block' }}>
    <Sketch setup={env.setup} draw={env.draw} />
    // </div>
  )
}

export default Canvas
