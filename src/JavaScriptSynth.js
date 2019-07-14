import React from 'react';

import Keyboard from './ui/Keyboard'
import RKnob from './ui/RKnob'

import Tone from 'tone'

import * as Osc from './modules/Oscillator'
import * as Env from './modules/Envelope'
import * as Out from './modules/Output'
import * as Rev from './modules/Reverb'
import * as Del from './modules/Delay'
import * as Fil from './modules/Filter'
import * as Vol from './modules/Volume'
import * as N from './modules/Node'

const noteMap = {
  1: "C",2: "C#",3: "D", 4: "D#", 5: "E",6: "F",7: "F#",8: "G",9: "G#",10: "A",11: "A#",12: "B",
}
const val2note = (key, octave) => noteMap[key] + octave

class JavaScriptSynth extends React.Component {

  constructor(props) {
    super(props)

    this.amplifier = Env.amplitudeEnvelope({"decay": 2, "sustain": 0.5})
    this.frequencyEnv = Env.frequencyEnvelope({"baseFrequency": 40, "attack": 0.005, "decay": 0.8, "sustain": 0.0})
    this.filter = Fil.filter({"Q": 2, "gain": 1.2})
    this.oscillator = Osc.oscillator(this.amplifier, {"type": "triangle"})
    this.subOscillator = Osc.oscillator(this.amplifier, {"detune": -1200})

    this.reverb = Rev.reverb()
    this.delay = Del.feedbackDelay({"delayTime": 0.15})
    this.output = Out.output()

    this.reverbVolume = Vol.volume({"volume": -9})
    this.delayVolume = Vol.volume({"volume": -16})

    N.chain(this.oscillator, this.filter, this.amplifier, this.output)
    N.chain(this.subOscillator, this.amplifier, this.output)

    N.connect(this.amplifier, this.reverb)
    N.connect(this.reverb, this.delay)

    N.chain(this.reverb, this.reverbVolume, this.output)
    N.chain(this.delay, this.delayVolume, this.output)

    this.frequencyEnv.node().connect(this.filter.node().frequency)
    this.onKey = [this.amplifier, this.frequencyEnv, this.oscillator, this.subOscillator]
  }

  keypressed(key, octave) {
    const note = val2note(key, octave)
    const time = Tone.context.now();
    this.onKey.map(node => node.keypressed(note, time))
  }

  keyreleased(key, octave) {
    const time = Tone.context.now();
    this.onKey.map(node => node.keyreleased(time))
  }

  updateDelayTime(val) {
    this.delay.node().delayTime.value = val / 100
  }

  render() {

      return (
        <div className="synth">
          <div className="panel">
            <table>
              <tr>
                <td><RKnob value={this.delay.node().delayTime.value * 100} onChange={this.updateDelayTime.bind(this)}/></td>
                <td><RKnob value={0} /></td>
                <td><RKnob value={0} /></td>
                <td><RKnob value={0} /></td>
              </tr>
            </table>
          </div>
          <Keyboard pressed={this.keypressed.bind(this)} released={this.keyreleased.bind(this)} />

        </div>
      )

  }

}

export default JavaScriptSynth
