import p5 from 'p5';
import creature from './creatureClass';

class enviroment {
  constructor(envSize,creatureCount,foodCount) {

    this.count=0

    this.foodCount=foodCount
    this.envSize=envSize
    this.creatureArr=Array(creatureCount).fill().map(()=>{return new creature(envSize)})
    this.foodArr=Array(foodCount).fill().map(()=>{return {pos:[(Math.random()*(envSize-100)+50),(Math.random()*(envSize-100)+50)]}})
    

    this.fitnessArr=[]
    this.genePool=this.creatureArr.map((i)=>{
      return i.gene})
    this.draw(envSize)

    let timer = setInterval(() => {
      this.creatureArr.map((i,idx)=>{
        i.fitness++
      })
      this.count++;
    }, 1000);

}
genCreature(){
  // if(this.fitnessArr[0]){
    this.creatureArr=Array(30).fill().map(()=>{return new creature(this.envSize)})
  // }else{
  //   this.creatureArr=FitnessArr.map((i)=>{return new creature(envSize)})//we need to map over the fitness arr
  // }
}
genFood(){
  this.foodArr=Array(this.foodCount).fill().map(()=>{return {pos:[(Math.random()*(this.envSize-100)+50),(Math.random()*(this.envSize-100)+50)]}})
}
renderCreature(){
  this.creatureArr.map((i)=>{
  
    this.p5.fill(i.color)
    this.p5.stroke(i.color)
    this.p5.ellipse(i.pos[0], i.pos[1], i.size, i.size)
    this.p5.textSize(32);
    // this.p5.text(i.energy.toFixed(1), i.pos[0], i.pos[1]);
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
    this.p5.ellipse(i.pos[0]+5, i.pos[1]+5, 5, 5)
  })
}
renderVisionLines(){
  this.creatureArr.map((i)=>{
    this.p5.stroke(i.color)
    const creaturesInVision=i.entityTracking(this.creatureArr)
    // i.targetEntity(creaturesInVision)
    creaturesInVision.forEach((j)=>{
    })
    // this.p5.stroke(0,50,50)
    const foodInVision=i.foodTracking(this.foodArr)
    i.targetFood(foodInVision)

  })
  this.renderNearestFoodLines()
}
renderNearestFoodLines(){
  this.creatureArr.map((i)=>{
    // this.p5.stroke(255,50,250)
    if(i.nearestFood){
      // this.p5.line(...i.nearestFood)
    }
      // this.p5.stroke(255,0,0)
      if(i.nearestEntity){

        // this.p5.line(...i.nearestEntity.spread)
      }
  })
}
starvation(){
  this.creatureArr=this.creatureArr.filter((i)=>{
    
    if(i.energy>0){
      return true

    }
    this.fitnessArr.push({fitness:i.fitness,gene:i.gene})
    console.log(this.fitnessArr)
  })
}

processRemainingCreatures(){
  this.creatureArr.map((i)=>{
    
    this.fitnessArr.push({fitness:i.fitness+5,gene:i.gene})
  })
  this.creatureArr=[]
  console.log(this.fitnessArr)
}

normalizeCreatureArr(genePool){
  let data = genePool
  function sumArray(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }
    return sum;
  }

let min = Math.min(...data.map((i)=>i.fitness));
let max = Math.max(...data.map((i)=>i.fitness));

let normalizedData = data.map(function(num) {
  return (num.fitness - min) / (max - min);
});

const total=sumArray(normalizedData)
function getGene(){

  let count=0
  let geneIdx=0
  while(count<total){
    geneIdx=Math.floor(Math.random()*normalizedData.length)
    count+=normalizedData[geneIdx]
  }
  return genePool[geneIdx]
}

}
spawnNextGeneration(){
  if (this.count==25||this.creatureArr.length<2){
    this.processRemainingCreatures()
    this.normalizeCreatureArr(this.fitnessArr)
    this.count=0
    this.genFood()
    this.genCreature()
  }

}
mousePressed() {
  if (this.p5.mouseIsPressed&& this.p5.mouseButton===this.p5.LEFT) {
    this.foodArr.push({pos:[this.p5.mouseX,this.p5.mouseY]})
  }
}

update(){
  // this.genFood()
  this.spawnNextGeneration()
  this.renderVisionLines()
  this.renderCreature()
  this.renderFood()
  this.mousePressed()
  this.starvation()
  
  this.creatureArr.forEach((i)=>{
    i.randomMove()
      this.foodArr=i.eatFood(this.foodArr)
      const newArr=i.eatEntity(this.creatureArr)
      this.creatureArr=newArr[0]
      this.fitnessArr=[...this.fitnessArr,...newArr[1]]
    })
}
draw(envSize){
  new p5((p5) => {
    this.p5=p5
    this.p5.setup = () => {
      this.p5.createCanvas(envSize, envSize).parent("canvasParent")
      this.p5.background(0)
    }

    this.p5.draw = () => {
      // this.p5.background(0)
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