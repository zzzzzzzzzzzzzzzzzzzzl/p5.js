import { useAppSelector } from '../hooks';
import enviroment from './creature/enviroment';



    
    
    // let a=new enviroment(1200,100,10)
    const parentElement=`${Math.random()}canvas`
    let a=new enviroment(800,100,10,parentElement )
    function Canvas() {

    const state = useAppSelector((state) => state.game);



return  <div  style={{ display: "inline-block"}} >
    <div id={parentElement}></div>
</div>
}

export default Canvas