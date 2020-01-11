import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DropDowns from './siegeoptions.jsx';

function LineChart(props) {
  const [timeLabel, setTimeLabel] = useState([0, 5000])
  console.log('LINE CHARTS DATA IS', props.heapData);

  useEffect(() => {
    const lastTime = timeLabel[1]
    const allLabels = timeLabel
    console.log("ALLLABELS", allLabels)
    console.log("LASTTIME", lastTime)
    setTimeLabel([...allLabels, lastTime + 5000])
    console.log("TIMELABEL IS", timeLabel)
  // setTimeLabel(timeLabel.push(timeLabel[timeLabel.length-1] + 5000))
  }, [props])

  return (
    <div>
      <DropDowns />
      <div id="linechart">
        <Line
          data={{
            labels: [...timeLabel],
            datasets: [{
              label: ['12/21 11:39am'],
              data: [props.heapData, 500, 700],
              borderColor: '#689E44',
              backgroundColor: '#689E44',
              fill: false,
            },
            {
              label: ['12/21 11:45am'],
              data: [300, 350, 450],
              borderColor: '#F26622',
              backgroundColor: '#F26622',
              borderDash: [3, 3],
              fill: false,
            }],
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
