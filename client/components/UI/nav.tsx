import { useAppDispatch } from '../../hooks'
import { changeDisplay } from '../../slices/nav';
import React from 'react';

function Nav() {
  const dispatch=useAppDispatch()

  let colour=[50+Math.random()*60,80+Math.random()*60,20+Math.random()*20]
  function incrementColour(){
    colour= colour.map((i)=>{
      return i+20-Math.random()*40
    })
    return colour
  }

  function handleClick(event) {
    dispatch( changeDisplay(event.target.id))

  }
  return (
    <div style={{  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 3fr))", gridGap: "10px", }}>

          <div id='stats' onClick={handleClick} style={{ backgroundColor: `rgb(${colour})`, height: "100px", borderRadius: "10px", display: "inline-block", padding: "20px", margin: "5px" }}>
          <div  id='stats' onClick={handleClick} style={{ color: "white", margin: "auto" ,fontSize:'21px'}}>stats:  </div>here </div>     

          <div id='mutate' onClick={handleClick}style={{ backgroundColor: `rgb(${incrementColour()})`, height: "100px", borderRadius: "10px", display: "inline-block", padding: "20px", margin: "5px" }}>
          <div  id='mutate' onClick={handleClick} style={{ color: "white", margin: "auto" ,fontSize:'21px'}}>mutate:  </div>here </div>   
          
          <div id='enviroment' onClick={handleClick}style={{ backgroundColor: `rgb(${incrementColour()})`, height: "100px", borderRadius: "10px", display: "inline-block", padding: "20px", margin: "5px" }}>
          <div id='enviroment'  onClick={handleClick} style={{ color: "white", margin: "auto" ,fontSize:'21px'}}>enviroment:  </div>here </div>  






    </div>
    

    
  );
}

export default React.memo(Nav)