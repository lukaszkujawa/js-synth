
import Tone from 'tone'

const defaults = {
    "volume" : -3
};


export const output = (opt) => {
  const options = Tone.defaultArg(opt, defaults)
  const output = new Tone.Volume(options).toMaster()

  return {
    node: () => output,
    keypressed: (note, time) => {},
    keyreleased: (time) => {}
  }
}
