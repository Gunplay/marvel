import { Component } from 'react'
import ErrorMessage from '../errorMessage/ErrorMessage'

class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  //   static GetDerivedStateFromError(error) {
  //     // update only state
  //     return { error: true }
  //   }

  // catch only in the components life style, render, cild Components, constructor
  // 1) no catch inside adEventListener 2) async code 3) inside ypurself no catch errors 4) server render
  componentDidCatch(error, errorInfo) {
    // console.log(error, errorInfo)
    this.setState({
      error: true,
    })
  }
  render() {
    if (this.state.error) {
      return <ErrorMessage />
    }
    return this.props.children
  }
}

export default ErrorBoundary
