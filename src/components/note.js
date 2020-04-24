import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
// import { isMap } from 'immutable';
// import { Map } from 'immutable';


// eslint-disable-next-line react/prefer-stateless-function
class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      // eslint-disable-next-line react/no-unused-state
      // title: 'o',
      // content: 'odf',
    };
  }

  noteDelete = () => {
    this.props.onDelete(this.props.id);
  }

  toggleEdit= () => {
    if (!this.state.isEditing) {
      this.setState({ isEditing: true });
    } else {
      this.setState({ isEditing: false });
    }
  }

  onEditChange = (event) => {
    // this.props.onDelete(this.props.id);
    console.log(event.target.value);
    this.props.onEdit(this.props.id, event.target.value);
  }


  renderTextSection() {
    if (this.state.isEditing) {
      return (
        <textarea onChange={this.onEditChange}
          className="NoteInput"
          value={this.props.notes.getIn([this.props.id, 'text'])}
        />
      );
    } else {
    // eslint-disable-next-line react/no-danger
      return <p className="note-text" dangerouslySetInnerHTML={{ __html: marked(this.props.notes.getIn([this.props.id, 'text']) || '') }} />;
    }
  }


  // // eslint-disable-next-line class-methods-use-this
  // onInputChange = (event) => {
  //   this.setState({ title: event.target.value });
  //   // this.props.onSearchChange(event.target.value);
  //   // console.log(event.target.value);
  // }


  render() {
    const title = this.props.notes.getIn([this.props.id, 'title']);
    // const text = this.props.notes.getIn([this.props.id, 'text']);
    return (
      <Draggable>
        <div className="note">
          <div className="note-header">
            <p className="note-title">{title}</p>
            <p className="note-icons">
              <i className="fas fa-trash-alt" role="button" aria-label="Delete Note" onClick={this.noteDelete} tabIndex={0} />
              <i className="fas fa-edit" role="button" aria-label="Edit Note" onClick={this.toggleEdit} tabIndex={0} />
              <i className="fas fa-arrows-alt" />
            </p>
          </div>
          <div className="note-content">
            {/* eslint-disable-next-line react/no-danger */}
            {/* <p className="note-text" dangerouslySetInnerHTML={{ __html: marked(text || '') }} /> */}
            {this.renderTextSection()}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
