import React from 'react';
// import { closureFunction } from './closureFunction'
// import {closureSnippet} from '../assets/closureSnippet.jpg'

// function LeakingClass() {
// }

// var leaks = [];
// setInterval(function() {
//   for (var i = 0; i < 100; i++) {
//     leaks.push(new LeakingClass);
//   }

//   console.error('Leaks: %d', leaks.length);
// }, 1000);


const Closure = (props) => {

   
    // var myObj = {
    //     callMeMaybe: function () {
    //         var myRef = this;
    //         var val = setTimeout(function () {
    //             console.log('Time is running out!');
    //             myRef.callMeMaybe();
    //         }, 1000);
    //     }
    // };

    // var trigger = document.getElementById('trigger');
    // var elem = document.getElementById('elementToDelete');
    // trigger.addEventListener("click", function() {
    //     elem.remove();
    // })

    var foo = [];
       function grow() {
           console.log('grow is running')
           foo.push(new Array(1000000).join('foo'));
           if (running)
               setTimeout(grow, 1000);
       }
       var running = true;
    

    return(
        <div>
        <button id="invokeFunction" onClick={() => grow()}> Invoke the Closure</button>
        <button id="stopFunction" onClick={() => running = false}> Stop the Closure</button>
            <h4>What causes this leak?</h4>
            <p>A key aspect of JavaScript development are closures: anonymous functions that capture variables from parent scopes. This particular case due to implementation details of the JavaScript runtime, it is possible to leak memory in a subtle way: </p>

            <img src='../assets/closureSnippet.png' width="500px" />

            
        </div>
    )
}

export default Closure;