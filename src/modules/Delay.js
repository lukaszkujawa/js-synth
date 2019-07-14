import Tone from 'tone'

const defaults = {
  "delayTime": 0.25 ,
  "maxDelay": 2
}

export const feedbackDelay = (opt) => delay(Tone.FeedbackDelay, opt)

const delay = (type, opt) => {
  const options = Tone.defaultArg(opt, defaults);
  const delay = new type(options)

  return {
      node: () => delay,
      keypressed: (note, time) => { },
      keyreleased: (time) => { }
  }

}
