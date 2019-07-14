import Tone from 'tone'

const defaults = {
  "type"  : "lowpass" ,
  "frequency"  : 40 ,
  "rolloff"  : -48 ,
  "Q"  : 1,
  "gain"  : 1
}

export const filter = (opt) => {
  const options = Tone.defaultArg(opt, defaults);
  const filter = new Tone.Filter(options)

  return {
      node: () => filter,
      keypressed: (note, time) => {
        filter.triggerAttack(time)
      },
      keyreleased: (time) => {
        filter.triggerRelease(time)
      }
  }

}
