import Canvas from './canvas'
import Stats from './UI/stats'
import GetWord from './words/wordsApi'
import Nav from './UI/nav'
import Enviroment from './UI/enviroment'
import { useAppSelector } from '../hooks'
import Mutate from './UI/mutate'
import { Route, Routes, useLocation } from 'react-router-dom'
import TopNav from './UI/topNav'
import TempPage from './UI/tempPage'
import TempPage2 from './UI/tempPage2'
import TempPage3 from './UI/tempPage3'

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
  console.log()

  if (canvas && useLocation().pathname == '/') {
    displayCanvas = 'block'
  }

  return (
    <div>
      {state &&
        [0].map((i) => {
          return <></>
        })}
      <TopNav />
      <Canvas />
      <div style={{ display: `${displayCanvas}` }}></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<TempPage />} />
        <Route path="/hurt" element={<TempPage2 />} />
        <Route path="/have" element={<TempPage3 />} />
      </Routes>
    </div>
  )
}

export default App
