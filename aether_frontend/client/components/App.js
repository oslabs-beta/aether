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

  //RUNS THE SET INTERVAL ONCE EVERYTIME THE SNAPSHOT IS UPDATED
  //EVERYTIME YOU UPDATE HEAPDATA IT TRIGGERS THE USE EFFECT, LIKE COMPONENT DID MOUNT
  //THEN IT REMOVES THE SET INTERVAL RIGHT AFTER IT RUNS, AND APPLIES IT ALL OVER AGAIN
  // RATIONALE IS DUE TO IT OTHERWISE STACKING ITSELF, FIRST IT WILL RUN ONE VERSION OF THE FUNCTION
  // SECOND TIME IT WILL RUN TWO VERSIONS OF SET INTERVAL AND NO LONGER WORKS THE WAY YOU INTENDED
  useEffect(() => {
    const heapLoop = setInterval(() => {getData()}, 5000);
    return function cleanup() {
      clearInterval(heapLoop);
    }
    getData()
  }, [getTotalData])

  return (
    <div>
      <Header />
      <LineChart heapData={getTotalData}/>
      <BubbleChartBlock heapData={getHeapData}/>
    </div>
  )
}

export default App;