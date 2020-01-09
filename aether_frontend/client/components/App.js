import React, { useState, useEffect } from 'react';
import Header from './header.jsx';
import LineChart from './linechart.jsx';
import BubbleChartBlock from './bubblechart.jsx';

function App() {
  const [getHeapData, setHeapData] = useState();
  const [getTotalData, setTotalData] = useState();


   function getData() {
     fetch('/getdata')
    .then(res => res.json())
    .then(res => {
      setHeapData(res.bubbles);
      setTotalData(res.total)
      console.log("THE INITIAL LINE CHART DATA IS", res.total)
      console.log("THE INITIAL LINE CHART DATA IS", res.bubbles)
      })


  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <Header />
      <LineChart heapData={getTotalData}/>
      <BubbleChartBlock heapData={getHeapData}/>
    </div>
  )
}

export default App;