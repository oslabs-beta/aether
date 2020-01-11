import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, Link, Redirect,
} from 'react-router-dom';
import Header from './header.jsx';
import LineChart from './linechart.jsx';
import BubbleChartBlock from './bubblechart.jsx';

function App() {
  const [bubbleData, setBubbleData] = useState();
  // SET THE INITIAL STATE FOR TOTALDATA TO BE AN EMPTY ARRAY THAT WE PUSH INTO
  const [totalData, setTotalData] = useState([]);


  function getData() {
    fetch('/getdata')
      .then((res) => res.json())
      .then((res) => {
        setBubbleData(res.bubbles);

        setTotalData([...totalData, res.total]);
      // console.log("THE INITIAL LINE CHART DATA IS", res.total)
      // console.log("THE INITIAL LINE CHART DATA IS", res.bubbles)
      });
  }

  // RUNS THE SET INTERVAL ONCE EVERYTIME THE SNAPSHOT IS UPDATED
  // EVERYTIME YOU UPDATE HEAPDATA IT TRIGGERS THE USE EFFECT, LIKE COMPONENT DID MOUNT
  // THEN IT REMOVES THE SET INTERVAL RIGHT AFTER IT RUNS, AND APPLIES IT ALL OVER AGAIN
  // RATIONALE IS DUE TO IT OTHERWISE STACKING ITSELF, FIRST IT WILL RUN ONE VERSION OF THE FUNCTION
  // SECOND TIME IT WILL RUN TWO VERSIONS OF SET INTERVAL AND NO LONGER WORKS THE WAY YOU INTENDED
  useEffect(() => {
    const heapLoop = setInterval(() => { getData(); }, 5000);
    return function cleanup() {
      clearInterval(heapLoop);
    };
  }, [totalData]);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Link to="/lineChart">Memory Usage Over Time</Link>
        <Link to="/bubbleChart">Nodes by Size</Link>
        <Switch>
          <Route exact path="/"><Redirect to="/lineChart" /></Route>
          <Route path="/lineChart"><LineChart heapData={totalData} /></Route>
          <Route path="/bubbleChart"><BubbleChartBlock heapData={bubbleData} /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
