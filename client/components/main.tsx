import enviroment from './creature/enviroment';

let a=new enviroment(700,40,800)

function Canvas() {



return  <div  style={{ display: "inline-block"}} >
    <div id="canvasParent"></div>
    <div style={{ display: "inline-block"}}>{a.creatureStats()}</div>
</div>
}

export default Canvas