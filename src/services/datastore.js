import firebase from 'firebase';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDdcuWOs3Ytwtm5Eu8hSN5zNCb08B06bWA',
  authDomain: 'react-notes-5aac2.firebaseapp.com',
  databaseURL: 'https://react-notes-5aac2.firebaseio.com',
  projectId: 'react-notes-5aac2',
  storageBucket: 'react-notes-5aac2.appspot.com',
  messagingSenderId: '758740670725',
  appId: '1:758740670725:web:16d68eb4fbab6965a57f6c',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function updateNote(id, newText) {
  firebase.database().ref('notes').child(id).update({ text: newText });
}

export function updateNoteTitle(id, newTitle) {
  firebase.database().ref('notes').child(id).update({ title: newTitle });
}

export function deleteNote(id) {
  firebase.database().ref('notes').child(id).remove();
}

export function addNote(note) {
  const id = firebase.database().ref('notes').push();
  id.set(note);
}

export function dragNote(id, xPos, yPos) {
  firebase.database().ref('notes').child(id).update({ x: xPos, y: yPos });
}
