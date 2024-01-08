import { useAppSelector } from '../hooks'
import Environment from './p5scene/Environment'
import Sketch from 'react-p5'
import { sceneManager } from './p5scene/sceneManager'

function Canvas() {
  let env = new sceneManager()
  return (
    <Sketch setup={env.setup} draw={env.draw} keyReleased={env.keyReleased} />
  )
}

export default Canvas
