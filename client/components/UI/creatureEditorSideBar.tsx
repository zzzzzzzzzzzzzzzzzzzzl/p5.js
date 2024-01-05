import { useAppSelector, useAppDispatch } from '../../hooks'
import { Button } from './button'

function CreatureEditorSideBar() {
  const state = useAppSelector((state) => state.CanvasToUI)
  return (
    <div>
      <Button name="sideBar" fn="heck" />
    </div>
  )
}
export default CreatureEditorSideBar
