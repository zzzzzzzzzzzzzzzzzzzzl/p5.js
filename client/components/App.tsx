import Canvas from './canvas'
import Nav from './UI/nav'
import { useAppSelector } from '../hooks'
import { Route, Routes, useLocation } from 'react-router-dom'
import Deb from './UI/Debugger'
import Debugger from './UI/Debugger'
import CreatureEditorSideBar from './UI/creatureEditorSideBar'

function App() {
  const containerStyle = {
    /* Add your container styles here */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    /* Any other styles you need */
  }
  return (
    <div>
      <Debugger />
      <div>
        <div style={containerStyle}>
          <Canvas style={{}} />
          <CreatureEditorSideBar />
        </div>
      </div>
      <Nav />
    </div>
  )
}

export default App
