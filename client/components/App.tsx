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
      <div>
        <Canvas />
        <div className="evilDoerHellRaiser"></div>
      </div>
      <Nav />
    </div>
  )
}

export default App
