// export function closureFunction() {

//     var theThing = null;
//     var replaceThing = function () {
//         var originalThing = theThing;
//         var unused = function () {
//              if (originalThing)
//              console.log("hi");
//         };
//             theThing = {
//               longStr: new Array(1000000).join('*'),
//                 someMethod: function () {
//                     console.log(someMessage);
//                 }
//             };
//     };
//     // return replaceThing ()
//    setInterval(replaceThing, 1000);
// }

//the closure function in works:
// console.log('closurefunc')
// var theThing = null;
// var replaceThing = function () {
//     var originalThing = theThing;
//     console.log("originalThing:", originalThing)
//     console.log("theThing:", theThing)
//     var unused = function () {
//          if (originalThing)
//          console.log("hi");
//     };
//     theThing = {
//         longStr: new Array(10).join('*'),
//         someMethod: function () {
//             console.log('from theThing.someMethod');
//         }
//     };
// };

// //    setInterval(replaceThing, 1000);