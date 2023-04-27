import enviroment from './creature/enviroment';

let a=new enviroment(1000,1000,100)

function Canvas() {



return  <div  style={{ display: "inline-block"}} >
    <div id="canvasParent"></div>
    <div style={{ display: "inline-block"}}>{a.creatureStats()}</div>
</div>
}

export default Canvas