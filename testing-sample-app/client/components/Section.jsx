import React, { useState, useEffect } from 'react';

function Section(props) {
    return (
        <div className="section" id={props.id} onClick={() => props.click(props.id)}>
            <div className="section-title">
                <h2>{props.content.header}</h2>
            </div>

            <div className="section-content">
                <div>
                    <button id="invokeFunction" onClick={() => props.content.function()}> Start the leak</button>
                </div>
                <p>{props.content.content}</p>

                <h4>Solution</h4>
                <p>{props.content.solution}</p>

            </div>

        </div>
    )

}

export default Section;