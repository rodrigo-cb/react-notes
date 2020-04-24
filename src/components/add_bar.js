import React, { Component } from 'react';


// eslint-disable-next-line react/prefer-stateless-function
class AddBar extends Component {
  constructor(props) {
    super(props);

    this.state = { note_title: '' };
  }

  // eslint-disable-next-line class-methods-use-this
  onInputChange = (event) => {
    this.setState({ note_title: event.target.value });
    // this.props.onSearchChange(event.target.value);
    // console.log(event.target.value);
  }

  onButtonPress = () => {
    this.props.onNoteAdd(this.state.note_title);
  }


  render() {
    return (
      <div id="add-bar">
        <input onChange={this.onInputChange}
          value={this.state.note_title}
          placeholder="New Note Title"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.onButtonPress();
            }
          }}
        />
        <button id="add-button" type="submit" onClick={this.onButtonPress}> Submit </button>
      </div>
    );
  }
}

export default AddBar;
