import Canvas from "./main";
import P5 from "./main";
import Stats from "./UI/stats";
import GetWord from "./words/wordsApi";
import Nav from './UI/nav'
import Enviroment from './UI/enviroment'
import { useAppSelector } from "../hooks";
import Mutate from './UI/mutate'
import { Route, Routes, useLocation } from 'react-router-dom'
import TopNav from './UI/topNav'


function Home(){
  const state = useAppSelector((state) => state.nav);
  return (
    <div>
      <Nav/>
      {state.mutate && <Mutate/>}
      {state.enviroment &&<Enviroment/>}
      {state.stats &&<div style={{ transform: "scale(.6)", transformOrigin: "50% 0%" }}>
      <Stats />
    </div>}
    </div>
  )
}


function App() {

  const state = useAppSelector((state) => state.nav);
  const canvas = useAppSelector((state) => state.canvas);
  let displayCanvas='none'
  if(canvas){
    displayCanvas='block'
  }
  return (
    <div >
      {state && [0].map((i)=>{
        console.log('help')
        return(<></>)
      })}
      <TopNav/>
      <GetWord />

<div style={{ display: `${displayCanvas}`}}>
      <Canvas />
</div>

      

      <Routes>
      <Route path="/" element={<Home/>} />
          <Route path="/h" element={<Nav/>} />
          <Route path="help/:name/:code" element={<Enviroment/>} />
      </Routes>

    </div>
  );
}

export default App;
