// import $ from 'jquery';
import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div className="test">All the REACT are belong to us!</div>;

ReactDOM.render(<App />, document.getElementById('main'));


// $('#main').html('Here we go!');

// let num = 0;
// setInterval(() => {
//   $('#main').html(`You've been on this page for ${num} seconds`);
//   num += 1;
// }, 1000);
