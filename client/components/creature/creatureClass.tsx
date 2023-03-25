

class creature{
    constructor(envSize){
        this.pos=[Math.random()*envSize,Math.random()*envSize]//x,y, pos
        this.color=[Math.random()*255,Math.random()*160,Math.random()*10]
        this.vision=100
        this.size=100
        this.speed=5*Math.random()

        
    }
    randomMove(){
        this.pos[0]+=(Math.random()-.5)*this.speed
        this.pos[1]+=(Math.random()-.5)*this.speed
    }
    entityTracking(env){
        const creaturesInVision=[]
        env.forEach((i)=>{
            if(((this.pos[0]-i.pos[0])<this.vision&&(this.pos[0]-i.pos[0])>-this.vision)&&((this.pos[1]-i.pos[1])<this.vision&&(this.pos[1]-i.pos[1])>-this.vision)){
                creaturesInVision.push([this.pos[0],this.pos[1],i.pos[0],i.pos[1]])
            }
        })
        return creaturesInVision
    }
    foodTracking(env){
        const foodInVision=[]
        env.forEach((i)=>{
            if(((this.pos[0]-i.pos[0])<this.vision&&(this.pos[0]-i.pos[0])>-this.vision)&&((this.pos[1]-i.pos[1])<this.vision&&(this.pos[1]-i.pos[1])>-this.vision)){
                foodInVision.push([this.pos[0],this.pos[1],i.pos[0],i.pos[1]])
            }
        })
        return foodInVision
    }
    eatFood(env){
        
        return env.filter((i)=>{
            if(((i.pos[0])-(this.pos[0])<this.size*.5)&&(i.pos[0])-(this.pos[0])>-this.size*.5){
                if(((i.pos[1])-(this.pos[1])<this.size*.5)&&(i.pos[1])-(this.pos[1])>-this.size*.5){

                    this.size+=1
                    this.speed+=1
                    return false
                }
            }
            return true
        })
    }
}


export default creature