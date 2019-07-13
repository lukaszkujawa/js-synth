
import Tone from 'tone'

const defaults = {
    "attack" : 0.005,
    "decay" : 0.1,
    "sustain" : 0.3,
    "release" : 1
};


export const amplifier = (opt) => {
  const options = Tone.defaultArg(opt, defaults);
  const amplifier = new Tone.AmplitudeEnvelope(options)

  return {
      node: () => amplifier,
      keypressed: (note, time) => {
        amplifier.triggerAttack(time)
      },
      keyreleased: (time) => {
        amplifier.triggerRelease(time)
      }
  }
}
