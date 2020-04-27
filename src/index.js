import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import AddBar from './components/add_bar';
import Note from './components/note';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map({}),
    };
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      // eslint-disable-next-line new-cap
      this.setState({ notes: Map(notes) });
    });
  }

  addNote = (text) => {
    console.log(`Added note with title: ${text}`);
    const note = {
      title: text,
      text: '',
      x: 8,
      y: 122,
      zIndex: 0,
    };
    db.addNote(note);
  };

  deleteNote = (noteID) => {
    db.deleteNote(noteID);
  };

  onNoteEdit = (noteID, newText) => {
    db.updateNote(noteID, newText);
  };

  onNoteTitleEdit = (noteID, newTitle) => {
    console.log(`New Title is : ${newTitle}`);
    db.updateNoteTitle(noteID, newTitle);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const noteItems = this.state.notes.entrySeq().map(([id, note]) => {
      return (
        <Note
          key={id}
          id={id}
          notes={this.state.notes}
          onDelete={this.deleteNote}
          onEdit={this.onNoteEdit}
          onTitleEdit={this.onNoteTitleEdit}
        />
      );
    });

    return (
      <div>
        <AddBar onNoteAdd={this.addNote} />
        <div id="notes-section">
          {noteItems}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
