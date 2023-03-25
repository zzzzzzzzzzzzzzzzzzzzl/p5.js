import enviroment from './creature/enviroment';

let a=new enviroment(1700,20,1000)

function Canvas() {



return  <div  style={{ display: "inline-block"}} >
    <div id="canvasParent"></div>
    <div style={{ display: "inline-block"}}>{a.creatureStats()}</div>
</div>
}

export default Canvas