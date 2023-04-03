import p5 from 'p5';
import creature from './creatureClass';

class enviroment {
  constructor(envSize,creatureCount,foodCount) {

    this.count=0

    
    
    this.creatureArr=Array(creatureCount).fill().map(()=>{return new creature(envSize)})
    this.foodArr=Array(foodCount).fill().map(()=>{return {pos:[(Math.random()*(envSize-100)+50),(Math.random()*(envSize-100)+50)]}})
    

    this.fittnessArr=[]
    this.genePool=this.creatureArr.map((i)=>{
      return i.gene})
      console.log(this.genePool)
    this.draw(envSize)

    let timer = setInterval(() => {

      this.creatureArr.map((i)=>{
        i.fittness++
      })
      this.count++;
      console.log( this.count);
    }, 1000);

}
renderCreature(){
  this.creatureArr.map((i)=>{
    this.p5.fill(i.color)
    this.p5.stroke(i.color)
    this.p5.ellipse(i.pos[0], i.pos[1], i.size, i.size)
    i.snake.map((j)=>{
        this.p5.fill(i.color)
        this.p5.stroke(i.color)
        this.p5.ellipse(j[0], j[1], i.size, i.size)
    })
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
starvation(){
  this.creatureArr=this.creatureArr.filter((i)=>{
    
    if(i.energy>0){
      this.fittnessArr.push({fitness:i.fitness,gene:i.gene})
      return true
    }
  })
}

processRemainingCreatures(){
  this.creatureArr.map((i)=>{
    this.fittnessArr.push({fitness:i.fitness+5,gene:i.gene})
  })
  this.creatureArr=[]
  
}


spawnNextGeneration(){}
fn(){
  if (this.count==5||this.creatureArr.length<2){
    this.processRemainingCreatures()
    console.log("next generation")
    this.count=0
  }

}
mousePressed() {
  if (this.p5.mouseIsPressed&& this.p5.mouseButton===this.p5.LEFT) {
    this.foodArr.push({pos:[this.p5.mouseX,this.p5.mouseY]})
  }
}

update(){
  this.spawnNextGeneration()
  this.renderVisionLines()
  this.renderCreature()
  this.renderFood()
  this.mousePressed()
  this.starvation()
  this.creatureArr.forEach((i)=>{
    i.randomMove()
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
            <div>size: {i.size.toFixed(2)}</div>
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