import { useAppDispatch } from '../../hooks'
import { Link } from 'react-router-dom'
import { changeDisplay } from '../../slices/canvasDisplay'
import React, { Component } from 'react'
import Enviroment from './enviroment'

class FrameUpdateComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      frameCount: 0,
    }
  }

  componentDidMount() {
    this.startAnimation()
  }

  componentWillUnmount() {
    this.stopAnimation()
  }

  updateFrame = () => {
    // Update your component state or perform any other operations here
    this.setState((prevState) => ({
      frameCount: prevState.frameCount + 1,
    }))

    // Schedule the next frame update
    this.animationFrameId = requestAnimationFrame(this.updateFrame)
  }

  startAnimation = () => {
    // Start the animation loop
    this.animationFrameId = requestAnimationFrame(this.updateFrame)
  }

  stopAnimation = () => {
    // Stop the animation loop when the component is unmounted
    cancelAnimationFrame(this.animationFrameId)
  }

  render() {
    return (
      <div>
        <p>Frame Count: {123}</p>
        {/* Add your content here */}
      </div>
    )
  }
}

export default FrameUpdateComponent
