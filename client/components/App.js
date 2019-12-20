import React, { useState, useEffect } from 'react';
import Header from './header.jsx';

function App() {
  const [pageDisplay, setDisplay] = useState(<p>LOADING</p>);



  return (
    <div>
      <Header />
      {pageDisplay}
    </div>
  )
}

export default App;