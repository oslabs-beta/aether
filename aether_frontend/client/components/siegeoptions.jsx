import React, { useState, useEffect } from 'react';

function SeigeOpts() {

    return (
        <div class="options">
            <div>
                <label for="NumOfUsers">No. of Users</label>
                <select name="NumOfUsers">
                    <option value="500" selected>500</option>
                    <option value="1000">1,000</option>
                    <option value="1000">2,000</option>
                    <option value="1000">5,000</option>
                </select>
            </div>
            <div>
                <label for="snapInterval">Snapshot Intervals</label>
                <select name="snapIntervals">
                    <option value="1000">1,000 ms</option>
                    <option value="5000" selected>5,000 ms</option>
                    <option value="10000">10,000 ms</option>
                    <option value="30000">30,000 ms</option>
                </select>
            </div>
            <div>
                <label for="totLength">Total Length</label>
                <select name="totLength">
                    <option value="30000" selected>30,000 ms</option>
                    <option value="60000">60,000 ms</option>
                    <option value="120000">12,000 ms</option>
                    <option value="18000">18,000 ms</option>
                </select>
            </div>
        </div>
    )
}

export default SeigeOpts;