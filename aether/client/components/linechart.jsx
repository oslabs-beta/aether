import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function LineChart(props) {

  /* The Chart.js library uses two things -- the timeLabel, defaulting to 0 and 5000 milliseconds. 
     This is how the chart builts out it's first time render. The date label is dynamically set and reflects the current time the user is accessing the app.
  */

  const [timeLabel, setTimeLabel] = useState([0, 5000])
  const [dateLabel, setDateLabel] = useState()

  /* Captures the current time and set's the data label to currentData, takes in two parameters like before, an anonymous function and an empty array, which is a non-semantic way of stating that only render the component once. Otherwise it will keep making an attempt to keep changing state. */

  useEffect(() => {
    let currentDate = String(new Date(Date.now()))
    currentDate = currentDate.slice(4, 25)
    console.log("THE CURRENT DATA IS", currentDate)
    setDateLabel(currentDate)
  }, [])

  /* The second useEffect updates the label's time to add 5 more seconds to reflect the new data coming in. 
   We grab the last time in our array. We call setTimeLabel, we passed back in all previous labels, containing our time and then we added one more, which is 5 seconds greater than the last one. We gave it a second parameter, where it updates itself anytime props.heapData is updated.  
  */

  useEffect(() => {
    const lastTime = timeLabel[timeLabel.length - 1]
    const allLabels = timeLabel
    setTimeLabel([...allLabels, lastTime + 5000])
  }, [props.heapData])

  /* <DropDowns /> 
  TODO DropDowns is not currently functional, slated for future release. */
  
  return (
    <div>
      <div id="linechart">
        <Line
          data={{
            labels: [...timeLabel],
            datasets: [{
              label: [dateLabel],
              data: [...props.heapData],
              borderColor: '#689E44',
              backgroundColor: '#689E44',
              fill: false,
            },
          ],
          }}
          options={{
            legend: { position: 'bottom' },
          }}
        />
      </div>
    </div>
  );
}

export default LineChart;