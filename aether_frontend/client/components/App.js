import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import Header from './header.jsx';
import LineChart from './linechart.jsx';
import BubbleChartBlock from './bubblechart.jsx';

/* The constant variables create state. The first variable stores data for the bubbleChart and setBubbleData, 
updates state for bubbleData. The same state management logic applies to totalData and retainedSizeData. 
useState is pulled in from React to know that it's a piece of state.
*/

function App() {
  const [bubbleData, setBubbleData] = useState();
  const [totalData, setTotalData] = useState([]);
  const [retainedSizeData, setRetainedSizeData] = useState();



/* Makes a call to the getData endpoint. When we are creating the new total data array, we are destructuring our old totalData array, 
the reason we do it in this manner is that we can't directly manipulate state, we are just adding onto state.
*/

  function getData() {
    fetch('/getdata')
    .then((res) => res.json())
    .then((res) => {
      setBubbleData(res.bubbles);
      setTotalData([...totalData, res.total]);
      setRetainedSizeData(res.retainedSize)
    });
  }

  /* useEffect is the React Hook's replacement for component lifecycle aka componentDidMount. This takes in two argument, one is an anonymous function. It creates a variable called heapLoop, that triggers getData to run every 5 seconds. Upon that completing we are clearing the interval, this is the equivalent of setTimeOut. useEffect takes in a second parameter, called totalData, and it will only run when totalData changes. This could have been any one of our getData state management functions. 
  */

  useEffect(() => {
    const heapLoop = setInterval(() => { getData(); }, 5000);
    return function cleanup() {
      clearInterval(heapLoop);
    };
  }, [totalData]);

/* When using React-Router clicking on any specific endpoint, will link to inner state pages. Mainly relatred to page state management. We pass through data through props. 
TODOS -- fix endpoints.
*/

  return (
    <BrowserRouter>
      <Header/>
      <nav>
        <Link to ="/lineChart">Memory Usage Over Time</Link>
        <Link to ="/bubbleChart">Nodes by Self Size</Link>
        <Link to ="/retainedSizeChart">Nodes by Retained Size</Link>
      </nav>
        <Switch>
          <Route exact path="/"><Redirect to="/lineChart" /></Route>
          <Route path="/lineChart"><LineChart heapData={totalData} /></Route>
          <Route path="/bubbleChart"><BubbleChartBlock heapData={bubbleData} /></Route>
          <Route path="/retainedSizeChart"><BubbleChartBlock heapData={retainedSizeData} /></Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
