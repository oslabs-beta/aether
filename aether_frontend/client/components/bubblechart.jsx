import React from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';
//This child component accesses it's data via heapData on props, which contains it's bubbleData.
function BubbleChartBlock(props) {
  return (
    <BubbleChart
      graph={{
        zoom: 1.0,
      }}
      width={1000}
      height={800}
      padding={0} // optional value, number that set the padding between bubbles
      showLegend // optional value, pass false to disable the legend.
      legendPercentage={20} // number that represent the % of with that legend going to use.
      legendFont={{
        family: 'Arial',
        size: 12,
        color: '#000',
        weight: 'bold',
      }}
      valueFont={{
        family: 'Arial',
        size: 12,
        color: '#fff',
        weight: 'bold',
      }}
      labelFont={{
        family: 'Arial',
        size: 16,
        color: '#fff',
        weight: 'bold',
      }}
      data={props.heapData}    
      />
  );
}
export default BubbleChartBlock;
