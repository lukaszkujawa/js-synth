
import Tone from 'tone'

const defaults = {
    "volume" : -3
};


export const volume = (opt) => {
  const options = Tone.defaultArg(opt, defaults)
  const volume = new Tone.Volume(options)

  return {
    node: () => volume,
    keypressed: (note, time) => {},
    keyreleased: (time) => {}
  }
}
