import './style'
import { Component } from 'preact'
import makeParse from 'parse-function'
let babylon = require('babylon')

let { parse } = makeParse({ parse: babylon.parse })

let increment = key => state => ({
  [key]: state[key] + 1
})

let action = reducer => state => {
  let [ key ] = parse(reducer).args
  return { [key]: reducer(state[key]) }
}

export default class extends Component {
  state = { count: 0 }

  increment = () => {
    this.setState(increment('count'))
  }

  decrement = () => {
    this.setState(action(count => count - 1))
    // action(count => count - 1)(this.state)
  }

	render() {
		return (
			<div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
			</div>
		)
	}
}
