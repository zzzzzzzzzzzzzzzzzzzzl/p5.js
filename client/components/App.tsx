import Canvas from './canvas'
import Nav from './UI/nav'
import { useAppSelector } from '../hooks'
import { Route, Routes, useLocation } from 'react-router-dom'
import Deb from './UI/Debugger'
import Debugger from './UI/Debugger'
import CreatureEditorSideBar from './UI/creatureEditorSideBar'
import { useAppDispatch } from '../../my-app/src/app/hooks'

function App() {
  const state = useAppSelector((state) => state.UIToCanvas)

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
  }

  const mainContentStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  const leftElementStyle = {
    padding: '20px',
  }

  const rightElementStyle = {
    padding: '2px',
    // position: 'absolute',
  }

  return (
    <div>
      <Debugger />
      <div>
        <div style={containerStyle}>
          <div style={mainContentStyle}>
            <div style={leftElementStyle}>
              <Canvas />
            </div>
            {state.scene === 'creatureEditor' && (
              <div style={rightElementStyle}>
                <CreatureEditorSideBar />
              </div>
            )}
          </div>
        </div>
      </div>
      <Nav />
    </div>
  )
}

export default App
