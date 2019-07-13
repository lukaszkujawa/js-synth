import React from 'react';

import Keyboard from './Keyboard.js'

import Tone from 'tone'


const noteMap = {
  1: "C",2: "C#",3: "D", 4: "D#", 5: "E",6: "F",7: "F#",8: "G",9: "G#",10: "A",11: "A#",12: "B",
}

const val2note = (key, octave) => noteMap[key] + octave

const defaults = {
  "oscillator" : {
    "type" : "sawtooth"
  },
  "envelope" : {
    "attack" : 0.005,
    "decay" : 0.1,
    "sustain" : 0.3,
    "release" : 1
  },
  "volume": -3
};

const debug = (v) => console.log(v)

const options = Tone.defaultArg({}, defaults);

class SynthCore extends React.Component {

  constructor(props) {
    super(props)

    this.oscillators = []
    this.oscillators.push(new Tone.OmniOscillator(options.oscillator))
    this.oscillators.push(new Tone.OmniOscillator(options.oscillator))
    this.oscillators.push(new Tone.OmniOscillator(options.oscillator))

    //this.oscillator = new Tone.OmniOscillator(options.oscillator)

    this.envelope = new Tone.AmplitudeEnvelope(options.envelope)

    //this.frequency = this.oscillator.frequency
    this.output = new Tone.Volume(options.volume)

    this.filterEnvelope = new Tone.FrequencyEnvelope({
      "attack" : 0.001,
      "decay": 0.5,
      "sustain": 0.7,
      "release": 0.01,
      "baseFrequency" : 60,
      "octaves" : 4
    })

    this.filter = new Tone.Filter ( {
        "type"  : "lowpass" ,
        "frequency"  : 100 ,
        "rolloff"  : -24 ,
        "Q"  : 1 ,
        "gain"  : 10
    })

    this.filterEnvelope.connect(this.filter.frequency)

    //this.filterEnvelope.connect(debug)

    this.reverb = new Tone.Reverb({
      "decay": 4,
      "preDelay": 0.01,
      "wet": 0.6
    })

    this.delay = new Tone.PingPongDelay({"wet": 0.6, "delayTime": 0.45, "feedback": 0.2})

    for (var i in this.oscillators) {
      const oscillator = this.oscillators[i]
      oscillator.chain(this.filter, this.envelope, this.output)
      oscillator.detune.value = 23*i - 23
    }

    this.envelope.connect(this.reverb)

    this.reverb.generate().then(()=>console.log("gen"))


    this.reverb.chain(this.delay)
    this.delay.toMaster()


    //this.oscillator.detune

    //this.lfo = new Tone.LFO(7,-0,100)


    this.output.toMaster()

    //this.lfo.connect(this.oscillator.detune)
    //this.lfo.start()
  }



  keypressed(key, octave) {
    const note = val2note(key, octave)
    const time = Tone.context.now();
    this.envelope.triggerAttack(time/*, velocity*/);
    this.filterEnvelope.triggerAttack(time)

    for (var i in this.oscillators) {
      const oscillator = this.oscillators[i]
      oscillator.start(time);
      oscillator.frequency.setValueAtTime(note, time);
    }

  }

  keyreleased(key, octave) {
    const time = Tone.context.now();

		this.envelope.triggerRelease(time);
    this.filterEnvelope.triggerRelease(0)

    for (var i in this.oscillators) {
      const oscillator = this.oscillators[i]
      oscillator.stop(time + this.envelope.release);
    }

  }

  render() {

      return (
        <div className="synth">
          <Keyboard pressed={this.keypressed.bind(this)} released={this.keyreleased.bind(this)} />
        </div>
      )

  }

}

export default SynthCore
