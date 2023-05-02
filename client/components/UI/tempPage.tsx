import { useAppDispatch, useAppSelector } from '../../hooks'

function TempPage() {
  let colour=[20+Math.random()*40,30+Math.random()*30,20+Math.random()*20]
  function incrementColour(){
    colour= colour.map((i)=>{
      return i+20+Math.random()*20
    })
    return colour
  }

 

  return (
    <div >
      <div id='vision' style={{ backgroundColor: `rgb(${colour})`, height: "810px", borderRadius: "10px", display: "inline-block", padding: "50px", margin: "5px" }}>
        <div style={{ color: "white", margin: "auto" ,fontSize:'31px'}}>

            <p>

          ok so i wanted to make a mini creature simulation. I used p5.js which is pretty neat for visualisng stuff. Im pretty happy with what I made Im not sure if it will meet critera or not since it is kind of just
          some random thing, but whatever its pretty cool, sorry its late.
<br/>
<br/>
 so basicly the creatures are just all random walkers . they will all just move in a random direction every frame.
 but each creature has stats right, like what are those, they are basicly just weights that effect how the random numbers will generate, if a creature is greedy, it is more likley to move toward food.
 if a creature is aggressive it is more likley to move toward other creatures and if greed or aggresion is negative they will move away from food and enemies respectivley.
 I feel like the rest of the stats ar kind of obvious.
 <br/>
<br/>
<br/>
<br/>
            </p>
        </div>
 <img src="https://mizuma-art.co.jp/wp-content/uploads/2018/01/0bc701df888062cb7221d3c52e14c4cd.jpg" alt="" />
       
      </div>
    </div>
  );
}

export default TempPage;
