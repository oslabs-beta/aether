import React from 'react';
//! Not currently in use

function DropDown() {
    return (
        <div className="options">
            <div>
                <label htmlFor="NumOfUsers">No. of Users</label>
                <select name="NumOfUsers" defaultValue="500">
                    <option value="500">500</option>
                    <option value="1000">1,000</option>
                    <option value="1000">2,000</option>
                    <option value="1000">5,000</option>
                </select>
            </div>
            <div>
                <label htmlFor="snapInterval">Snapshot Intervals</label>
                <select name="snapIntervals" defaultValue="5000">
                    <option value="1000">1,000 ms</option>
                    <option value="5000">5,000 ms</option>
                    <option value="10000">10,000 ms</option>
                    <option value="30000">30,000 ms</option>
                </select>
            </div>
            <div>
                <label htmlFor="totLength">Total Length</label>
                <select name="totLength" defaultValue="30000">
                    <option value="30000">30,000 ms</option>
                    <option value="60000">60,000 ms</option>
                    <option value="120000">12,000 ms</option>
                    <option value="18000">18,000 ms</option>
                </select>
            </div>
        </div>
    )
}

export default DropDown;