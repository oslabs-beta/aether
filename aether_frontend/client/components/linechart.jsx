import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import SiegeOpts from './siegeoptions.jsx'

function LineChart() {



    return (
        <div>
            <SiegeOpts />
            <div id="linechart">
                <Line 
                    data={{
                        labels: ['5000ms', '10000ms', '15000ms'],
                        datasets: [{
                            label: ["12/21 11:39am"],
                            data: [300, 500, 700],
                            borderColor: '#689E44',
                            backgroundColor: '#689E44',
                            fill: false, 
                        },
                        {
                            label: ["12/21 11:45am"],
                            data: [300, 350, 450],
                            borderColor: '#F26622',
                            backgroundColor: '#F26622',
                            borderDash: [3,3],
                            fill: false, 
                        }],
                    }}
                    options={{
                        legend: {
                            position: 'bottom'},

                    }}           
                />
            </div>
        </div>
    )
}

export default LineChart;