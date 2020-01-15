const Content = {
    section0: {
        header: "Closure",
        content: "A key aspect of JavaScript development are closures: anonymous functions that capture variables from parent scopes. This particular case due to implementation details of the JavaScript runtime, it is possible to leak memory in a subtle way:",
        solution: "If you have a large object that is used by some closures, but not by any closures that you need to keep using, just make sure that the local variable no longer points to it once you’re done with it.",

        function: function closureLeak() {
            const foo = [];
            let someVariable = null;
            let runnedTimes = 0

            while (runnedTimes < 1000) {
                grow()
            }

            function grow() {
                console.log('grow is running');
                let someSecondVariable = someVariable;
                const unusedFunc = function () {
                    if (someSecondVariable) console.log('Hey');
                };

                someVariable = {
                    longString: new Array(100000).join('*'),
                    someMethod() {
                        console.log("what's your closure");
                    },
                };
                runnedTimes++

            }

        },
    },


    section1: {
        header: "Detached Dom Tree",
        content: `Detached DOM or Out of DOM reference implies that the nodes which have been removed from the DOM but are still retained in memory through JavaScript. It means that as long as there’s still a reference to a variable or an object anywhere, that object isn’t garbage collected even after being removed from the DOM. A DOM node can only be garbage collected when there are no references to it from either the page's DOM tree or JavaScript code. A node is said to be "detached" when it's removed from the DOM tree but some JavaScript still references it. Detached DOM nodes are a common cause of memory leaks.`,
        solution: "As a javascript best practice, a common way is to put the var detachedNodes inside the listener, which makes it a local variable. When a detachedNodes is deleted, the path for the object is cut off. The garbage collector can deallocate this memory.",

        function: function detachedDomTree() {
            let detachedNodes;
            // creates 1000 <li /> elements and attaches to <ul />
            // because it is is still referenced by a variable while GC() the list of 1000 'li' continues to live in memory as deatached tree potentially causing a memory leak

            (function create() {
                const ul = document.createElement('ul');
                for (let i = 0; i < 1000; i++) {
                    const li = document.createElement('li');
                    ul.appendChild(li);
                }
                detachedNodes = ul;
                console.log('DetachedDomTree invoked')
            })()
        }

    },
    section2: {
        header: "Forgotten Timmers",
        content: "There are 2 timing events in Javascript namely – setTimeout and setInterval. ‘setTimeout()’ executes a function, after waiting a specified number of milliseconds while ‘setInterval()’ does the some but repeats the execution of the function continuously. The setTimeout() and setInterval() are both methods of the HTML DOM Window object. Javascript timers are the most frequent cause of memory leaks as their use is quite common. Timer callback and its tied object, buggyObject will not be relaesed until the timeout happens. In this case timer resets itself and runs forever and therefore its memory space will never be collected even if there is no reference to the original object..",
        solution: "To avoid this scenario, stick to javascript best practice by providing references inside a setTimeout/setInterval call, such as functions are needed to be executed and completed before they can be garbage collected. Make an explicit call to remove them once you no longer need them. Except for old browsers like Internet Explorers, majority of modern browsers like chrome and firefox will not face this problem. Also libraries like jQuery handle it internally to makes sure that no javascript memory leaks are produced.",

        function: function forgottenSetTimeout() {

            for (var i = 0; i < 100000; i++) {
                var buggyObject = {
                    callAgain: function () {
                        var ref = this;
                        var val = setTimeout(function () {
                            ref.callAgain();
                        }, 1000000);
                    }
                }
                buggyObject.callAgain();
                buggyObject = null;
            }
            console.log('setTimout function invoked')
        }
    }


}

export default Content;