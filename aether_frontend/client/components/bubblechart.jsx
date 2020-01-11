import React, { useState, useEffect } from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';

function BubbleChartBlock(props) {
  // bubbleClick = (label) =>{
  //     console.log("Custom bubble click func")
  //   }
  // legendClick = (label) =>{
  //     console.log("Customer legend click func")
  //   }
  // console.log('BUBBLE CHART DATA', props.heapData);

  return (
    <BubbleChart
      graph={{
        zoom: 1.0,
        // offsetX: -0.05,
        // offsetY: -0.01,
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
