import { useAppDispatch, useAppSelector } from '../../hooks'

function Enviroment() {
  let colour=[50+Math.random()*60,80+Math.random()*60,20+Math.random()*20]
  function incrementColour(){
    colour= colour.map((i)=>{
      return i+20+Math.random()*40
    })
    return colour
  }

  function handleSizeSubmit(event) {
    event.preventDefault(); // prevent default form submission behavior
    console.log('Size submitted:', event.target.elements.size.value);
  }

  function handleCreatureCountSubmit(event) {
    event.preventDefault(); // prevent default form submission behavior
    console.log('Creature count submitted:', event.target.elements.creatureCount.value);
  }

  function handleFoodCountSubmit(event) {
    event.preventDefault(); // prevent default form submission behavior
    console.log('Food count submitted:', event.target.elements.foodCount.value);
  }

  return (
    <div>
      <div id='stats' style={{ backgroundColor: `rgb(${colour})`, height: "150px", borderRadius: "10px", display: "inline-block", padding: "50px", margin: "5px" }}>
        <div style={{ color: "white", margin: "auto" ,fontSize:'21px'}}>
          want to be able to edit the enviroment <br/>
            also not connected.. but as note to self, dont put any of these above 2000
          <form onSubmit={handleSizeSubmit}>
            <label>
              Enviroment size: &nbsp;
              <input type="text" name="size" style={{width:'50px'}}/>
            </label>
          </form>
        </div>
        <div style={{ color: "white", margin: "auto" ,fontSize:'21px'}}>
          <form onSubmit={handleCreatureCountSubmit}>
            <label>
              Creature count: &nbsp;
              <input type="text" name="creatureCount" style={{width:'50px'}}/>
            </label>
          </form>
        </div>
        <div style={{ color: "white", margin: "auto" ,fontSize:'21px'}}>
          <form onSubmit={handleFoodCountSubmit}>
            <label>
              Food count: &nbsp;
              <input type="text" name="foodCount" style={{width:'50px'}}/>
            </label>
          </form>
        </div>
        <div style={{backgroundColor: `rgb(${incrementColour()})`, color: "white", margin: "auto" ,fontSize:'21px',borderRadius: "10px"}}>
            add
        </div>
      </div>
    </div>
  );
}

export default Enviroment;
