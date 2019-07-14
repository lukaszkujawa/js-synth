import React from 'react';
import './Keyboard.css';
import KeyboardOctave from './KeyboardOctave.js'


class Keyboard extends React.Component {

  constructor(props) {
    super(props);

    this.callback_pressed = props.pressed
    this.callback_depressed = props.released
  }

  keypressed(key, octave) {
    this.callback_pressed(key, octave)
  }

  keyreleased(key, octave) {
    this.callback_depressed(key, octave)
  }

  render() {
      return (
        <div className="keyboard">
          <KeyboardOctave oct="1" pressed={this.keypressed.bind(this)} released={this.keyreleased.bind(this)} />
          <KeyboardOctave oct="2" pressed={this.keypressed.bind(this)} released={this.keyreleased.bind(this)} />
          <KeyboardOctave oct="3" pressed={this.keypressed.bind(this)} released={this.keyreleased.bind(this)} />
          <KeyboardOctave oct="4" pressed={this.keypressed.bind(this)} released={this.keyreleased.bind(this)} />
        </div>
      )

  }

}

export default Keyboard
