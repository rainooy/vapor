import React, { Component } from 'react'
import { get_path } from '_conf'

export default class About extends Component {
  render() {
    return (
      <div>
        About.{get_path('blocks')}
      </div>
    )
  }
}
