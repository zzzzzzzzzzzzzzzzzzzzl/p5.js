

class creature{
    constructor(envSize,gene={vision:50+500*Math.random(),size:Math.random()*5+20,greed:Math.random(),aggresion:(Math.random()-.25),
        largeAggresion:(Math.random()-.75),smallAggresion:(Math.random()-.25)}){
        this.pos=[(Math.random()*(envSize-100)+50),(Math.random()*(envSize-100)+50)]
        
        this.fitness=0

        this.vision=50+500*Math.random()
        this.size=Math.random()*5+20
        this.speed=.5+Math.random()
        this.greed=Math.random()
        this.aggresion=(Math.random()-.25)
        this.largeAggresion=(Math.random()-.75)
        this.smallAggresion=(Math.random()-.25)
        this.color=[this.aggresion*225,this.greed*255,55]
        this.energy=10

        this.snake=Array(5).fill([...this.pos])
        this.gene={vision:this.vision,size:this.size,greed:this.greed,aggresion:this.aggresion,largeAggresion:this.largeAggresion,smallAggresion:this.smallAggresion}
        

        
    }
    randomMove(){
        this.energy-=.005

        const scaled_value = 1 - (1 / (1 + .01 * this.size))
        if(Math.random()>scaled_value){    this.snake.unshift([...this.pos])
            this.snake.pop()}
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
            if (this.nearestEntity.size<this.size){
                if(this.k[0]){
                    m[0]+=this.largeAggresion
                    m[0]+=this.largeAggresion
                }else{
                    m[0]+=-this.largeAggresion
                    m[0]+=-this.largeAggresion
                }
                if(this.k[1]){
                    m[1]+=-this.largeAggresion
                    m[1]+=-this.largeAggresion
                }
                else{
                    m[1]+=this.largeAggresion
                    m[1]+=this.largeAggresion
                }
            }
            if (this.nearestEntity.size>this.size){

                if(this.k[0]){
                    m[0]+= this.smallAggresion
                    m[0]+=this.smallAggresion
                }else{
                    m[0]+=-this.smallAggresion
                    m[0]+=-this.smallAggresion
                }
                if(this.k[1]){
                    m[1]+=-this.smallAggresion
                    m[1]+=-this.smallAggresion
                }
                else{
                    m[1]+=this.smallAggresion
                    m[1]+=this.smallAggresion
                }
            }
            if(this.k[0]){
                m[0]+=this.aggresion
                m[0]+=this.aggresion
            }else{
                m[0]+=-this.aggresion
                m[0]+=-this.aggresion
            }
            if(this.k[1]){
                m[1]+=-this.aggresion
                m[1]+=-this.aggresion
            }
            else{
                m[1]+=this.aggresion
                m[1]+=this.aggresion
            }
        }


        
        

        this.pos[0]+=(Math.random()-.5+m[0])*this.speed
        this.pos[1]+=(Math.random()-.5+m[1])*this.speed
    }
    entityTracking(env){
        const creaturesInVision=[]
        env.forEach((i)=>{
            if(((this.pos[0]-(i.pos[0]+(i.size)))<this.vision&&(this.pos[0]-(i.pos[0]+(i.size)))>-this.vision)&&((this.pos[1]-(i.pos[1]+(i.size)))<this.vision&&(this.pos[1]-(i.pos[1]+(i.size)))>-this.vision)){
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
    increaseFitness(){
        this.fitness++
    }
}


export default creature