import p5 from 'p5';
import creature from './creatureClass';
import {normalizeArray,mutateGene} from './geneFunctions'
import store from '../../store'
import { test } from '../../slices/Slice'


class enviroment {
  constructor(envSize,creatureCount,foodCount,parentElement) {
    this.parentElement=parentElement
    this.count=0

    this.foodCount=foodCount
    this.envSize=envSize
    this.creatureCount=creatureCount
    this.creatureArr=Array(creatureCount).fill().map(()=>{return new creature(envSize,{vision:50+500*Math.random(),size:Math.random()*5+20,greed:Math.random(),speed:.5+Math.random(),aggresion:(Math.random()-.75),
      largeAggresion:(Math.random()-.75),smallAggresion:(Math.random()-.25)})})


    this.genFood()
    //this.foodArr=Array(foodCount).fill().map(()=>{return {pos:[(Math.random()*(envSize-100)+50),(Math.random()*(envSize-100)+50)]}})
    

    this.fitnessArr=[]
    this.genePool=this.creatureArr.map((i)=>{
      return i.gene})
    store.dispatch(test(this.genePool))
    this.draw(envSize)
    

    let timer = setInterval(() => {
      this.creatureArr.map((i,idx)=>{
        i.fitness++
      })
      this.count++;
    }, 1000);

}

genCreature(){
  if(!this.fitnessArr[0]){
    
    
    this.creatureArr=Array(this.creatureCount).fill().map(()=>{return new creature(this.envSize)})
  }else{

 
    this.fitnessArr=this.fitnessArr.map((i)=>{   // mutate the gene
      return mutateGene(i)
    })
    store.dispatch(test(this.fitnessArr.map((i)=>i)))

    this.creatureArr=this.fitnessArr.map((i)=>{return new creature(this.envSize,i)})//we need to map over the fitness arr
    this.fitnessArr=[]
  }
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
    i.targetEntity(creaturesInVision)
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
  })
}

processRemainingCreatures(){
  this.creatureArr.map((i)=>{
    this.fitnessArr.push({fitness:i.fitness,gene:i.gene})
  })
  this.creatureArr=[]
}


spawnNextGeneration(){
  if (this.count>25||this.creatureArr.length<2){
    this.processRemainingCreatures()
    this.count=0
    
    this.fitnessArr=normalizeArray(this.fitnessArr)
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
      this.p5.createCanvas(envSize, envSize).parent(this.parentElement)
      this.p5.background(0)
    }

    this.p5.draw = () => {
      this.p5.background(0)
      this.update(this.creatureArr)      
    }
  })
}

  }


export default enviroment;