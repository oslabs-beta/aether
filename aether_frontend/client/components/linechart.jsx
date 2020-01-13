import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DropDowns from './siegeoptions.jsx';

function LineChart(props) {
  const [timeLabel, setTimeLabel] = useState([0, 5000])
  const [dateLabel, setDateLabel] = useState()

  useEffect(() => {
    let currentDate = String(new Date(Date.now()))
    currentDate = currentDate.slice(4, 25)
    console.log("THE CURRENT DATA IS", currentDate)
    setDateLabel(currentDate)
  }, [])

  useEffect(() => {
    const lastTime = timeLabel[timeLabel.length - 1]
    const allLabels = timeLabel
    setTimeLabel([...allLabels, lastTime + 5000])
  }, [props.heapData])


  return (
    <div>
      <DropDowns />
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
