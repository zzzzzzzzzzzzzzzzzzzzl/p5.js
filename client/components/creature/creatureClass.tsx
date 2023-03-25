

class creature{
    constructor(envSize){
        this.pos=[Math.random()*envSize,Math.random()*envSize]//x,y, pos
        this.color=[Math.random()*255,Math.random()*160,Math.random()*10]
        this.vision=100
        this.size=10
        this.speed=5*Math.random()
        this.hungry=[Math.random()-.5,Math.random()-.5]

        
    }
    randomMove(){
        let m=[-.1,-.1]
        if (this.n[0]){
            m[0]=.1
        }
        if(this.n[.1]){
            m[1]=.1
        }
        this.pos[0]+=(Math.random()-.5+m[0])*this.speed
        this.pos[1]+=(Math.random()-.5+m[1])*this.speed
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

                    this.size+=.1
                    this.speed+=.1
                    return false
                }
            }
            return true
        })
    }
    targetEntity(env){

    }
    targetFood(vision){
        this.nearestFood=null
        this.nearestFoodDistance=500
        vision.forEach((i)=>{
            const dis=(Math.abs(i[0]-i[2])+Math.abs(i[1]-i[3]))
            if (dis<this.nearestFoodDistance){
                this.nearestFoodDistance=dis
                this.nearestFood=i
            }
        })
        if(this.nearestFood){
            this.n=[(this.nearestFood[2]>this.pos[0]),(this.nearestFood[1]>this.pos[3])]
        }
    }
    foodResponse(){
    }
}


export default creature