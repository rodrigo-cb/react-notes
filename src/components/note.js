import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import { dragNote } from '../services/datastore';


// eslint-disable-next-line react/prefer-stateless-function
class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
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

  // eslint-disable-next-line class-methods-use-this
  handleDrag = (e, data) => {
    dragNote(this.props.id, data.x, data.y);
  }

  onTitleChange = (event) => {
    this.props.onTitleEdit(this.props.id, event.target.value);
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

  renderEditIcon() {
    if (this.state.isEditing) {
      return <i className="fas fa-check" role="button" aria-label="Edit Note" onClick={this.toggleEdit} tabIndex={0} />;
    } else {
      return <i className="fas fa-edit" role="button" aria-label="Edit Note" onClick={this.toggleEdit} tabIndex={0} />;
    }
  }

  renderTitleSection() {
    if (this.state.isEditing) {
      return (
        <input className="title-input"
          value={this.props.notes.getIn([this.props.id, 'title'])}
          onChange={this.onTitleChange}
        />
      );
    } else {
      return (
        <p className="note-title">
          {this.props.notes.getIn([this.props.id, 'title'])}
        </p>
      );
    }
  }


  render() {
    return (
      <Draggable handle=".fa-arrows-alt"
        position={{
          x: this.props.notes.getIn([this.props.id, 'x']), y: this.props.notes.getIn([this.props.id, 'y']),
        }}
        onDrag={this.handleDrag}
      >
        <div className="note">
          <div className="note-header">
            {this.renderTitleSection()}
            <p className="note-icons">
              <i className="fas fa-trash-alt" role="button" aria-label="Delete Note" onClick={this.noteDelete} tabIndex={0} />
              {this.renderEditIcon()}
              <i className="fas fa-arrows-alt" />
            </p>
          </div>
          <div className="note-content">
            {this.renderTextSection()}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
