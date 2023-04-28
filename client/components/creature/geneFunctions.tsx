
//this works, returns the input array except normalized.
//meaning it will only take the top end of the distrubution
 export function normalizeArray(arr) {
    const max = Math.max(...arr.map((i)=>{return i.fitness}));
    const min = Math.min(...arr.map((i)=>{return i.fitness}));
    const range = max - min;

    const normalized=arr.map((num) =>{ //normalized is an array of probobilities
        return (num.fitness - min) / range});

    let newArr=[]
    let count=0
    while(arr.length>newArr.length){
        if (count ===1000){
            break
        }
        count++
        const ran=Math.floor(Math.random()*arr.length)
        if(Math.random()<normalized[ran]){
            newArr.push(arr[ran])
        }
    }
    return newArr
  }
  export function mutateGene(gene){//change all of the values by 5%
    function mutate(gene){
        return gene+(Math.random()*gene*.1-Math.random()*gene*.1)
    }
    for (const key in gene) {
        gene[key]=mutate(gene[key])
      }
    return gene
  }
