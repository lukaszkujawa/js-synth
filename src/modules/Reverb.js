
import Tone from 'tone'

const defaults = {
  "decay": 4 ,
  "preDelay": 0.01,
  "wet": 1.0
};


export const reverb = (opt) => {
  const options = Tone.defaultArg(opt, defaults)
  const reverb = new Tone.Reverb(options)
  reverb.generate().then(() => {})

  return {
    node: () => reverb,
    keypressed: (note, time) => {},
    keyreleased: (time) => {}
  }
}
