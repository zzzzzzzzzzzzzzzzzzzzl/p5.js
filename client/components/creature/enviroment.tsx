import p5 from 'p5';
import creature from './creatureClass';

class enviroment {
  constructor(envSize,creatureCount,foodCount) {
    
    this.creatureArr=Array(creatureCount).fill().map(()=>{return new creature(envSize)})
    this.foodArr=Array(foodCount).fill().map(()=>{return {pos:[Math.random()*envSize,Math.random()*envSize]}})
    
    this.draw(envSize)

}
renderCreature(){
  this.creatureArr.map((i)=>{
    this.p5.fill(i.color)
    this.p5.stroke(i.color)
    this.p5.ellipse(i.pos[0], i.pos[1], i.size, i.size)
  })
}
renderFood(){
  this.foodArr.map((i)=>{
    this.p5.fill(100,200,10)
    this.p5.ellipse(i.pos[0], i.pos[1], 5, 5)
  })
}
renderVisionLines(){
  this.creatureArr.map((i)=>{
    this.p5.stroke(i.color)
    const creaturesInVision=i.entityTracking(this.creatureArr)
    i.targetEntity(creaturesInVision)
    creaturesInVision.forEach((j)=>{
      // this.p5.line(...j)
    })
    this.p5.stroke(0,50,50)
    const foodInVision=i.foodTracking(this.foodArr)
    i.targetFood(foodInVision)
    // foodInVision.forEach((j)=>{
    //   this.p5.line(...j)
    // })
  })
  this.renderNearestFoodLines()
}
renderNearestFoodLines(){
  this.creatureArr.map((i)=>{
    this.p5.stroke(255,50,250)
    if(i.nearestFood){
      this.p5.line(...i.nearestFood)
    }
      this.p5.stroke(255,0,0)
      if(i.nearestEntity){

        this.p5.line(...i.nearestEntity.spread)
      }
  })
}


update(){
  this.renderVisionLines()
  this.renderCreature()
  this.renderFood()
  this.creatureArr.forEach((i)=>{
      if(i.laziness<Math.random()){i.randomMove()}
      this.foodArr=i.eatFood(this.foodArr)
      this.creatureArr=i.eatFood(this.creatureArr)
  })
}
draw(envSize){
  new p5((p5) => {
    this.p5=p5
    this.p5.setup = () => {
      this.p5.createCanvas(envSize, envSize).parent("canvasParent")
      this.p5.background(0);
    }

    this.p5.draw = () => {
      this.p5.background(0);
      this.update(this.creatureArr)      
    }
  })
}
creatureStats(){
  
  return (
    <div id="creatureStats">
      {this.creatureArr.map((i) => {
        const color = `rgb(${i.color})`;

        return (
          <div
            id="stat"
            style={{ color: "black", backgroundColor: color }}
          >
            <div>size: {i.size}</div>
            <div>speed: {i.speed.toFixed(2)}</div>
            <div>vision: {i.vision.toFixed(2)}</div>
          </div>
        );
      })}
    </div>
  );
  
  
}
  }


export default enviroment;