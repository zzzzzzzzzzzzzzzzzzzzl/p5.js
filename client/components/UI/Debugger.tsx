import { useAppSelector, useAppDispatch } from '../../hooks'

let colour = [
  50 + Math.random() * 60,
  80 + Math.random() * 60,
  20 + Math.random() * 20,
]
function Debugger() {
  const state = useAppSelector((state) => state.CanvasToUI)
  return (
    <div
      id="stats"
      style={{
        backgroundColor: `rgb(${colour})`,
        borderRadius: '10px',
        display: 'inline-block',
        padding: '20px',
        margin: '15px',
        textAlign: 'left',
      }}
    >
      <p style={{ margin: '-5px' }}>Frame Count: {Math.round(state.fps)}</p>
      <p style={{ margin: '-5px' }}>
        scale:{Number(state.camera.scale.toFixed(2))}
      </p>
      <p style={{ margin: '-5px' }}>
        camera:{state.camera.x.toFixed(0)},{state.camera.y.toFixed(0)}
      </p>
    </div>
  )
}

export default Debugger
