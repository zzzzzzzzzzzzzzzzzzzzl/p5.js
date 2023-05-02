import { useAppSelector } from '../hooks';
import enviroment from './creature/enviroment';



    
    
    // let a=new enviroment(1200,100,10)
    
    let a=new enviroment(800,100,10)
    function Canvas() {

    const state = useAppSelector((state) => state.game);



return  <div  style={{ display: "inline-block"}} >
    <div id="canvasParent"></div>
</div>
}

export default Canvas