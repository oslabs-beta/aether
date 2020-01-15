import React, { useState, useEffect } from 'react';
import Section from './Section.jsx'
import Content from './content.js'

function App() {
  const [openPane, setPane] = useState('none')


  function openSection(section) {
    if (openPane === 'none') {
      setPane(section);
      let clicked = document.getElementById(section);
      clicked.classList.add("active")
    }
    //if active section is not clicked section
    else if (openPane !== section) {
      //remove active from old
      let old = document.getElementById(openPane);
      old.classList.remove("active")
      //add to new
      setPane(section);
      let clicked = document.getElementById(section);
      clicked.classList.add("active")
    }
  }

  // create 3 sections for the accordion to add to closure
  // TODO Need to also dynamically add data to each section 
  let sectionArr = []
  for (let i = 0; i < 3; i++) {
    let section = `section${i}`;
    sectionArr.push(<Section id={`Sec${i}`} click={openSection} content={Content[section]} />)
  }

  //left closure hard-coded in for now but it should be dynamically generated with the others
  return (
    <div id="accordion">
      {sectionArr}
    </div>
  )

}

export default App;