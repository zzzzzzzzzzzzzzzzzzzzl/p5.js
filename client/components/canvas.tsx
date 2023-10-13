import { useAppSelector } from '../hooks'
import Environment from './creature/Environment'
import Sketch from 'react-p5'

const parentElement = `${Math.random()}canvas`
function Canvas() {
  const state = useAppSelector((state) => state.game)

  let env = new Environment(800, 10, 100, parentElement)
  return (
    <div style={{ display: 'inline-block' }}>
      <Sketch setup={env.setup} draw={env.draw} />
    </div>
  )
}

export default Canvas
