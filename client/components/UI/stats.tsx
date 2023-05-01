import { useAppDispatch, useAppSelector } from '../../hooks'

function Stats() {
  const state = useAppSelector((state) => state.game);

  return (
    <div style={{  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 3fr))", gridGap: "10px",display:'inline-block' }}>
      {state[0] && state.map((i,idx)=>{


        const color=[i.aggresion*225,i.greed*255,50]
        return (
          <div key={idx} style={{ backgroundColor: `rgba(${color})`, height: "200px", borderRadius:'10px' ,display:'inline-block',padding:'20px',margin:'5px'}}>
            <div style={{ color: "white", margin: "auto" ,fontSize:'21px'}}>vision: {i.vision.toFixed(0)} </div>
            <div style={{ color: "white", margin: "auto",fontSize:'21px' }}>greed: {i.greed.toFixed(2)} </div>
            <div style={{ color: "white", margin: "auto" ,fontSize:'21px'}}>aggresion: {i.aggresion.toFixed(2)} </div>
            <div style={{ color: "white", margin: "auto" ,fontSize:'21px'}}>size: {i.size.toFixed(0)} </div>
            <div style={{ color: "white", margin: "auto" ,fontSize:'21px'}}>speed: {i.speed.toFixed(2)} </div>
          </div>
        )
      })}
    </div>
  );
}

export default Stats