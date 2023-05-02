import { useAppDispatch, useAppSelector } from '../../hooks'

function TempPage2() {
  let colour=[50+Math.random()*60,80+Math.random()*60,20+Math.random()*20]
  function incrementColour(){
    colour= colour.map((i)=>{
      return i+50+Math.random()*20
    })
    return colour
  }

 

  return (
    <div >
      <div id='vision' style={{ backgroundColor: `rgb(${colour})`, height: "210px", borderRadius: "10px", display: "inline-block", padding: "50px", margin: "5px" }}>
        <div style={{ color: "white", margin: "auto" ,fontSize:'31px'}}>
         so yea, I want to add so you can make your own worms, and so you can edit the enviroment youself that is the next thing im going to add, 
         I think though that I am mostly done with this project though.

        </div>
       
      </div>
    </div>
  );
}

export default TempPage2;
