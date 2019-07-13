import React from 'react';

import Keyboard from './Keyboard'

import Tone from 'tone'

import * as Osc from './modules/Oscillator'
import * as Amp from './modules/Amplifier'
import * as Out from './modules/Output'

const noteMap = {
  1: "C",2: "C#",3: "D", 4: "D#", 5: "E",6: "F",7: "F#",8: "G",9: "G#",10: "A",11: "A#",12: "B",
}
const val2note = (key, octave) => noteMap[key] + octave

class JavaScriptSynth extends React.Component {

  constructor(props) {
    super(props)

    this.amplifier = Amp.amplifier()
    this.oscillator = Osc.oscillator(this.amplifier)
    this.output = Out.output()

    this.oscillator.node().chain(this.amplifier.node(), this.output.node())
  }


  keypressed(key, octave) {
    const note = val2note(key, octave)
    const time = Tone.context.now();
    [this.amplifier, this.oscillator].map(node => node.keypressed(note, time))
  }

  keyreleased(key, octave) {
    const time = Tone.context.now();
    [this.amplifier, this.oscillator].map(node => node.keyreleased(time))
  }

  render() {

      return (
        <div className="synth">
          <Keyboard pressed={this.keypressed.bind(this)} released={this.keyreleased.bind(this)} />
        </div>
      )

  }

}

export default JavaScriptSynth
