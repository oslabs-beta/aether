import React, { useState, useEffect} from 'react';
import Closure from './Closure.jsx'
import Section from './Section.jsx'

function App() {


        return(
        
          <div id="accordion">
            <Section />
            <div className="active">
              <div className="section-title">
                <h2>Closure</h2>
              </div>
              <div className="section-content">
                  <Closure />
                
              </div>
            </div>
            <Section />
            <Section />
        </div> 

              

           
        )
    }

export default App;