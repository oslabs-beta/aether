import React, { Component } from 'react';
import Closure from './Closure.jsx'
//import Bubble from './MemoryBubble'

class App extends Component {
    constructor() {
        super();
        this.state = {
           
        }   

     
    }


    

    //create local database with paragraphs and images for each section
    //fetch data from db to display in different components based on click

    render() {
        return(
        
               <ul>
            <li>
              <div className="section-title">
                <h2>Section 1</h2>
              </div>
              <div className="section-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptatum temporibus dicta reprehenderit tempore quisquam consequuntur porro omnis laboriosam praesentium at et sapiente, provident sit! Suscipit recusandae, ab ratione dignissimos.</p>
              </div>
            </li>
            <li className="active">
              <div className="section-title">
                <h2>Closure</h2>
              </div>
              <div className="section-content">
                  <Closure />
                
              </div>
            </li>
            <li>
              <div className="section-title">
                <h2>Section 3</h2>
              </div>
              <div className="section-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur saepe vel facilis quae nihil ad aspernatur ex delectus. Tenetur nulla voluptates similique quos, quia possimus, magnam esse natus quis ipsa.</p>
              </div>
            </li>
            <li>
              <div className="section-title">
                <h2>Section 4</h2>
              </div>
              <div className="section-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, optio illo, delectus deleniti animi accusamus. Laboriosam maiores totam provident aliquam. Unde, incidunt amet officia a obcaecati, ducimus at molestiae nemo.</p>
              </div>    
            </li>
        </ul> 

              

           
        )
    }
}

export default App;