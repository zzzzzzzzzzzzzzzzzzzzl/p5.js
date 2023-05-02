import { useAppDispatch, useAppSelector } from '../../hooks'
function YoutubeEmbed({ videoId }) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}

function TempPage3() {
  let colour=[50+Math.random()*60,80+Math.random()*60,20+Math.random()*20]
  function incrementColour(){
    colour= colour.map((i)=>{
      return i+50+Math.random()*20
    })
    return colour
  }

 

  return (
    <div >
      <div id='vision' style={{ backgroundColor: `rgb(${colour})`, height: "810px", borderRadius: "10px", display: "inline-block", padding: "50px", margin: "5px" }}>
        <div style={{ color: "white", margin: "auto" ,fontSize:'31px'}}>
          <p> so I wanted to create a creature simulation for a while, so I made this thing. I got insperation from primers video, as well as this video I saw about soft robots.<br/>
            Idk i think its all pretty neat and quite a nice way to show natural selection in action.
          </p>

        <YoutubeEmbed videoId={'0ZGbIKd0XrM'}/>
        <YoutubeEmbed videoId={'EXuR_soDnFo'}/>

        </div>
       
      </div>
    </div>
  );
}

export default TempPage3;
