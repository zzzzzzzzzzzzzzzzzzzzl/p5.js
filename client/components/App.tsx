import Canvas from './canvas'
import Stats from './UI/stats'
import Nav from './UI/nav'
import Enviroment from './UI/enviroment'
import { useAppSelector } from '../hooks'
import Mutate from './UI/mutate'
import { Route, Routes, useLocation } from 'react-router-dom'
import Helpmegod from './UI/UpdateOnFrame'
function Home() {
  const state = useAppSelector((state) => state.nav)
  return (
    <div>
      <Nav />
      {state.mutate && <Mutate />}
      {state.enviroment && <Enviroment />}
      {state.stats && (
        <div style={{ transform: 'scale(.6)', transformOrigin: '50% 0%' }}>
          <Stats />
        </div>
      )}
    </div>
  )
}

function App() {
  const state = useAppSelector((state) => state.nav)
  const canvas = useAppSelector((state) => state.canvas)

  let displayCanvas = 'none'

  if (canvas && useLocation().pathname == '/') {
    displayCanvas = 'block'
  }

  return (
    <div>
      {state &&
        [0].map((i) => {
          return <></>
        })}
      <Helpmegod />
      <Canvas />
      <div style={{ display: `${displayCanvas}` }}></div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
