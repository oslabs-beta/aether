import React, { useState, useEffect } from 'react';
import Header from './header.jsx';
import LineChart from './linechart.jsx';

function App() {
  // const [pageDisplay, setDisplay] = useState(<p>LOADING</p>);



  return (
    <div>
      <Header />
      <LineChart />
    </div>
  )
}

export default App;