
//this works, returns the input array except normalized.
//meaning it will only take the top end of the distrubution
export function normalizeArray(arr) {
    const max = Math.max(...arr.map((i)=>{return i.fitness}));
    const min = Math.min(...arr.map((i)=>{return i.fitness}));
    const range = max - min;

    const normalized=arr.map((num) =>{ 
        return (num.fitness - min) / range});

    let newArr=[]
    let sum = 0
    normalized.forEach(number => {
    if (typeof number === 'number') {
        sum += number
    }})

    while(arr.length>newArr.length){
        const ran=Math.floor(Math.random()*arr.length)
        if(Math.random()<normalized[ran]){
            newArr.push(arr[ran])
        }
    }
    console.log(arr,newArr)
    return normalized
  }
  export default normalizeArray
