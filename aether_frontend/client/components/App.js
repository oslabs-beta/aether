import React, { useState, useEffect } from 'react';
import Header from './header.jsx';
import LineChart from './linechart.jsx';
import BubbleChartBlock from './bubblechart.jsx';

function App() {
  // const [pageDisplay, setDisplay] = useState(<p>LOADING</p>);
  const [getHeapData, setHeapData] = useState();

  function getData() {
    fetch('/getdata')
    // .then(res => {
    //   console.log
    // }
    //   // res.json())
    .then(res => {
      setHeapData(res);
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <Header />
      <LineChart heapData={getHeapData}/>
      <BubbleChartBlock heapData={getHeapData}/>
    </div>
  )
}

export default App;