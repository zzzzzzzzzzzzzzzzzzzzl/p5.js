

class creature{
    constructor(envSize){
        this.pos=[Math.random()*envSize,Math.random()*envSize]//x,y, pos
        
        this.vision=100
        this.size=Math.random()*100
        this.speed=5*Math.random()
        this.greed=Math.random()
        this.aggresion=Math.random()-.5
        // this.fear=(Math.random()-.5)*2
        this.laziness=Math.random()-.5
        this.color=[this.aggresion*500,this.greed*255,this.laziness*500]
        this.energy=100
        

        
    }
    randomMove(){
        
        let m=[0,0]
        if(this.nearestFood){

            if(this.n[0]){
                m[0]+=this.greed
            }else{
                m[0]+=-this.greed
            }
            if(this.n[1]){
                m[1]+=-this.greed
            }
            else{
                m[1]+=this.greed
            }
        }
        if(this.nearestEntity){
 
            // console.log(this.fear,"fear")
            // console.log(this.fearMulti,"fearmulti")
            // console.log(fear,"vanilla fear")

            if(this.k[0]){
                m[0]+=this.aggresion
            }else{
                m[0]+=-this.aggresion
            }
            if(this.k[1]){
                m[1]+=-this.aggresion
            }
            else{
                m[1]+=this.aggresion
            }

        }
        this.energy-=(Math.abs(m[0])+Math.abs(m[1]))*.01

        
        

        this.pos[0]+=(Math.random()-.5+m[0])*this.speed
        this.pos[1]+=(Math.random()-.5+m[1])*this.speed
    }
    entityTracking(env){
        const creaturesInVision=[]
        env.forEach((i)=>{
            if(((this.pos[0]-i.pos[0])<this.vision&&(this.pos[0]-i.pos[0])>-this.vision)&&((this.pos[1]-i.pos[1])<this.vision&&(this.pos[1]-i.pos[1])>-this.vision)){
                creaturesInVision.push({spread:[this.pos[0],this.pos[1],i.pos[0],i.pos[1]],size:i.size})
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
            if(!(i.pos==this.pos)){

                if(((i.pos[0])-(this.pos[0])<this.size*.5)&&(i.pos[0])-(this.pos[0])>-this.size*.5){
                    if(((i.pos[1])-(this.pos[1])<this.size*.5)&&(i.pos[1])-(this.pos[1])>-this.size*.5){
    
                        this.energy+=1
                        this.vision+=1
                        
                        return false
                    }
                }
            }
            return true
        })
    }
    eatEntity(env){
        
        return env.filter((i)=>{
            if(!(i.pos==this.pos)){

                if(((i.pos[0])-(this.pos[0])<this.size*.5)&&(i.pos[0])-(this.pos[0])>-this.size*.5){
                    if(((i.pos[1])-(this.pos[1])<this.size*.5)&&(i.pos[1])-(this.pos[1])>-this.size*.5){
    
                        this.energy+=i.size/2
                        this.vision+=1
                        
                        return false
                    }
                }
            }
            return true
        })
    }
    targetEntity(vision){
        this.nearestEntity=null
        this.nearestEntityDistance=500
        vision.forEach((i)=>{

            const dis=(Math.abs(i.spread[0]-i.spread[2])+Math.abs(i.spread[1]-i.spread[3]))
            if (dis<this.nearestEntityDistance&&dis>0){
                this.nearestEntityDistance=dis
                this.nearestEntity=i
                
            }
        })
        if(this.nearestEntity){
            this.k=[(this.nearestEntity.spread[2]>this.pos[0]),(this.nearestEntity.spread[3]<this.pos[1])]
        }

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
            this.n=[(this.nearestFood[2]>this.pos[0]),(this.nearestFood[3]<this.pos[1])]
        }
    }
    foodResponse(){
    }
}


export default creature