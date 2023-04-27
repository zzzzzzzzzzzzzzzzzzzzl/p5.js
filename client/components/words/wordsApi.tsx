import React, { useState, useEffect } from 'react';


async function getSimillarWords(word,recursion=0){
    const data=await fetch(`https://api.datamuse.com/words?ml=${word}`)
    const res=await data.json()
    word=(res[Math.floor(Math.random()*res.length)].word)
    // console.log(word,recursion)
    if(Math.random()<.5 && recursion<5||word.length<3){
       word= getSimillarWords(word,recursion+1)
    }
    
        return word
    }
 

function GetWord() {
  const [word, setWord] = useState([]);
  async function getNature(){
    console.log(
       await getSimillarWords('loveliness'),
        await getSimillarWords('beautiful'),
        await getSimillarWords('serenity')
      )
      return{
        aggresive:await getSimillarWords('aggresive'),
        greed:await getSimillarWords('greedy'),
        fear:await getSimillarWords('fearful')
      }
    }
    getNature()
    
  
  getSimillarWords('values')
  getSimillarWords('values')


    
//   useEffect(async() => {
    
//     fetch('https://api.datamuse.com/words?ml=aggresive')
//       .then(response => response.json())
//       .then(data => 
//       fetch(`https://api.datamuse.com/words?ml=${(data[Math.floor(Math.random()*data.length)].word)}`)
//       .then(response => response.json())
//       .then(data=>{
//         setWord(data.map((i)=>{return i.word}))
//       })
//       )
//       .catch(error => console.error(error));
//   }, []);

  return <div style={{ color: 'white' }}>
    {word.map((i)=>{
    return <div>{i}</div>
  })}
  </div>;
}

export default GetWord;