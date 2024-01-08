// import { useAppSelector, useAppDispatch } from '../../hooks'
// import { randomColour } from './UIfunctions'
// import { Button } from './button'

// function CreatureEditorSideBar() {
//   const state = useAppSelector((state) => state.CanvasToUI)

//   const containerStyle = {}

//   const columnStyle = {
//     marginBottom: '20px',
//     padding: '10px',
//     float: 'right',
//     position: 'absolute',
//     // boxSizing: 'border-box',
//   }

//   return (
//     <div style={columnStyle}>
//       <Button name="save" fn="heck" />
//       <Button name="load" fn="heck" />
//       <Button name="load" fn="heck" />
//       <Button name="load" fn="heck" />
//       <Button name="load" fn="heck" />
//     </div>
//   )
// }
// export default CreatureEditorSideBar

import { useAppSelector, useAppDispatch } from '../../hooks'
import { randomColour } from './UIfunctions'
import { Button } from './button'

const buttonsArray = [
  { name: 'save', fn: 'heck', colour: randomColour() },
  { name: 'save', fn: 'heck', colour: randomColour() },
  { name: 'save', fn: 'heck', colour: randomColour() },
  { name: 'save', fn: 'heck', colour: randomColour() },
  { name: 'save', fn: 'heck', colour: randomColour() },
  { name: 'save', fn: 'heck', colour: randomColour() },
  { name: 'save', fn: 'heck', colour: randomColour() },
  { name: 'save', fn: 'heck', colour: randomColour() },
  { name: 'save', fn: 'heck', colour: randomColour() },
]
const r = randomColour()
function CreatureEditorSideBar() {
  const state = useAppSelector((state) => state.CanvasToUI)

  const containerStyle = {}

  const columnStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Creates 3 columns of equal width
    gap: '5px', // Adds gap between grid items
  }

  return (
    <div style={columnStyle}>
      {buttonsArray.map((i, idx) => (
        <Button name={i.name} fn={i.fn} colour={i.colour} />
      ))}
    </div>
  )
}
export default CreatureEditorSideBar
