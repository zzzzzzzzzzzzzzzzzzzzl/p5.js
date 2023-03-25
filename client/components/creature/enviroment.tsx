import p5 from 'p5';
import creature from './creatureClass';

class enviroment {
  constructor(envSize,creatureCount) {
    
   this.creatureArr=Array(creatureCount).fill().map(()=>{return new creature(envSize)})

   this.draw(envSize)

}
renderCreatures(creature){
  this.p5.fill(creature.color)
  this.p5.stroke(creature.color)
  this.p5.ellipse(creature.pos[0], creature.pos[1], creature.size, creature.size)
}
drawLines(arr=this.creatureArr){

  arr.map((i)=>{
    arr.map((j,idx)=>{
      try{
  
        this.p5.line(i.pos[0],i.pos[1],j.pos[0],j.pos[1])
      }
      catch{}

  })

  })
}

update(arr){
  // this.p5=p5
  arr.forEach((i)=>{
      i.randomMove()
      this.drawLines()
      this.renderCreatures(i)

  })
}
draw(envSize){
  new p5((p5) => {
    this.p5=p5
    this.p5.setup = () => {
      this.p5.createCanvas(envSize, envSize)
      this.p5.background(0);
    }

    this.p5.draw = () => {
      this.p5.background(0);
      this.update(this.creatureArr)      
    }
  })
}
  }


export default enviroment;