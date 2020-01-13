import React, { useState, useEffect} from 'react';

function Section(props) {
    console.log(props)
    return (
        <div className="section" id={props.id} onClick={() => props.click(props.id)}>
            <div className="section-title">
                <h2>{props.content.header}</h2>
            </div>
            <div className="section-content">
                <p>{props.content.content}</p>
            </div>
        </div>
    )

}

export default Section;