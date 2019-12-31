import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

render(
  <App />,
  document.getElementById('root'),
);


// Taken from accordion styling page-- need to make it functional
// // var section = document.getElementsByTagName('li');
// //substitute the JQuery syntax
// function toggleAccordion() {
//   document.getElementsByTagName("li").classList.remove('active')
//    // section.removeAt.remove("active");
//     document.getElementsByTagName("li").addClass('active');
//   }

//   document.getElementsByTagName("li").addEventListener('click', toggleAccordion());


// original code from codepen in jquery
// var section = $('li');

// function toggleAccordion() {
//   section.removeClass('active');
//   $(this).addClass('active');
// }

// section.on('click', toggleAccordion);
