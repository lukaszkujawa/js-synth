import React from 'react';


class KeyboardOctave extends React.Component {

  constructor(props) {
    super(props);
    this.callback_pressed = props.pressed
    this.callback_depressed = props.released
  }

  pressed(e) {
    const key = e.target.attributes.getNamedItem('data-val').value
    const octave = e.target.attributes.getNamedItem('data-oct').value
    this.callback_pressed(key, octave)
  }

  depressed(e) {
    const key = e.target.attributes.getNamedItem('data-val').value
    const octave = e.target.attributes.getNamedItem('data-oct').value
    this.callback_depressed(key, octave)
  }

  render() {
      const octave = this.props.oct
      return (
        <div className="octave">
          <div className="whites">
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kw" data-val="1" data-oct={octave}></div>
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kw" data-val="3" data-oct={octave}></div>
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kw" data-val="5" data-oct={octave}></div>
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kw" data-val="6" data-oct={octave}></div>
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kw" data-val="8" data-oct={octave}></div>
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kw" data-val="10" data-oct={octave}></div>
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kw" data-val="12" data-oct={octave}></div>
          </div>
          <div className="blacks">
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kb k1" data-val="2" data-oct={octave}></div>
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kb k2" data-val="4" data-oct={octave}></div>
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kb k3" data-val="7" data-oct={octave}></div>
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kb k4" data-val="9" data-oct={octave}></div>
            <div onMouseUp={this.depressed.bind(this)} onMouseDown={this.pressed.bind(this)} className="kb k5" data-val="11" data-oct={octave}></div>
          </div>
        </div>
      )

  }

}


export default KeyboardOctave
