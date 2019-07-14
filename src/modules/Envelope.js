import Tone from 'tone'

const defaults = {
    "attack" : 0.005,
    "decay" : 0.1,
    "sustain" : 0.3,
    "release" : 1
};

export const amplitudeEnvelope = (opt) => envelope(opt, Tone.AmplitudeEnvelope)

export const frequencyEnvelope = (opt) => envelope(opt, Tone.FrequencyEnvelope)

const envelope = (opt, type) => {
  const options = Tone.defaultArg(opt, defaults);
  const envl = new type(options)

  return {
      node: () => envl,
      keypressed: (note, time) => {
        envl.triggerAttack(time)
      },
      keyreleased: (time) => {
        envl.triggerRelease(time)
      }
  }
}
