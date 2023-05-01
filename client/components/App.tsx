import Canvas from "./main";
import P5 from "./main";
import Stats from "./UI/stats";
import GetWord from "./words/wordsApi";
import Nav from './UI/nav'
import Enviroment from './UI/enviroment'
import { useAppSelector } from "../hooks";
import Mutate from './UI/mutate'



function App() {
  const state = useAppSelector((state) => state.nav);

  return (
    <div >
      <GetWord />
      <Canvas />
      <Nav/>
      {state.mutate && <Mutate />}
      {state.stats && <Stats />}
      {state.enviroment &&<Enviroment/>}

    </div>
  );
}

export default App;
