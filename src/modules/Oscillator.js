import Tone from 'tone'

const defaults = {
  "type": "sine"
}

export const oscillator = (envelope, opt) => {
  const options = Tone.defaultArg(opt, defaults);
  const oscillator = new Tone.Oscillator(options)

  return {
      node: () => oscillator,
      keypressed: (note, time) => {
        oscillator.start(time);
        oscillator.frequency.setValueAtTime(note, time);
      },
      keyreleased: (time) => {
        oscillator.stop(time + envelope.release);
      }
  }

}
