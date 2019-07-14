import React from 'react';
//import './Keyboard.css';
import { Knob } from "react-rotary-knob"
import * as skins from 'react-rotary-knob-skin-pack'

class RKnob extends React.Component {

  constructor(props) {
    super(props)
    this.onChange = props.onChange
  }


  render() {
    const val = this.props.value
    return (<Knob skin={skins.s10} defaultValue={val} min={0} max={100} onChange={this.onChange} unlockDistance={0} preciseMode={false} />)
  }



}

export default RKnob
