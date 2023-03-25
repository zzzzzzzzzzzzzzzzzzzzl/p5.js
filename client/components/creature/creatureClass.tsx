

class creature{
    constructor(envSize){
        this.pos=[Math.random()*envSize,Math.random()*envSize]//x,y, pos
        this.color=[Math.random()*200,Math.random()*200+55,Math.random()*20]
      
        this.size=15
        this.speed=5*Math.random()

        
    }
    randomMove(){
        this.pos[0]+=(Math.random()-.5)*this.speed
        this.pos[1]+=(Math.random()-.5)*this.speed
    }
    creatureVision(env,p5){
        env.map((i)=>{
            
        })

    }

}


export default creature