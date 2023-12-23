import Canvas from './canvas'
import Nav from './UI/nav'
import { useAppSelector } from '../hooks'
import { Route, Routes, useLocation } from 'react-router-dom'
import Deb from './UI/Debugger'
import Debugger from './UI/Debugger'

function App() {
  return (
    <div>
      <Debugger />
      <Canvas />
      <Nav />
    </div>
  )
}

export default App
