import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import debounce from 'lodash.debounce';
import { Map } from 'immutable';
// import Draggable from 'react-draggable'; // The default
import AddBar from './components/add_bar';
import Note from './components/note';

// import youtubeSearch from './youtube-api';
// import VideoList from './components/video_list';
// import VideoDetail from './components/video_detail';

let idx = 1;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(
        {
          0: {
            title: 'testing',
            text: '![](http://i.giphy.com/gyRWkLSQVqlPi.gif)',
            x: 400,
            y: 12,
            zIndex: 10,
          },
          // 0: {
          //   title: 'Note Title',
          //   text: 'This is some text that should go in the note. This is some more text that could go inside the note',
          //   x: 0,
          //   y: 0,
          //   zIndex: 0,
          // },
          // 2: {
          //   title: 'Alternative Note Title',
          //   text: 'This is some text that should go in the note',
          //   x: 0,
          //   y: 0,
          //   zIndex: 0,
          // },
        },
      ),
    };
  }

  addNote = (text) => {
    console.log(`Added note with title: ${text}`);
    this.setState((prevState) => ({
      notes: prevState.notes.set(idx, {
        title: text,
        text: 'This is some text that should go in the note',
        x: 0,
        y: 0,
        zIndex: 0,
      }),
    }));
    idx += 1;
  };

  deleteNote = (noteID) => {
    this.setState((prevState) => ({
      notes: prevState.notes.delete(noteID),
    }));
  };

  onNoteEdit = (noteID, newText) => {
    this.setState((prevState) => ({
      notes: prevState.notes.updateIn([noteID, 'text'], (n) => { return newText; }),
    }));
  };


  render() {
    // eslint-disable-next-line no-unused-vars
    const noteItems = this.state.notes.entrySeq().map(([id, note]) => {
      return <Note key={id} id={id} notes={this.state.notes} onDelete={this.deleteNote} onEdit={this.onNoteEdit} />;
    });

    return (
      <div>
        <AddBar onNoteAdd={this.addNote} />
        <div id="notes-section">
          {noteItems}
          {/* <Draggable><div id="test" /></Draggable> */}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
// $('#main').html('Here we go!');

// let num = 0;
// setInterval(() => {
//   $('#main').html(`You've been on this page for ${num} seconds`);
//   num += 1;
// }, 1000);
