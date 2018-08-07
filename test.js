//   concurrentStart();
// stillSerial();
// parallel();
// sequentialStart();
// Promise.resolve().then(() => console.log(2));
// console.log(1); // 1, 2
// var promise3 = new Promise(function(resolve, reject) {
//     setTimeout(resolve, 2000, 'foo');
//   });
// promise3.then(value => console.log(value))
// // var p3 = Promise.all([1,2,3, Promise.reject(555)]);
// var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

// var p = Promise.all(resolvedPromisesArray);
// immediately logging the value of p
// console.log(p);
// p.then(() => console.log(p))
// setTimeout(() => console.log(p))
// var p1 = new Promise((resolve, reject) => { 
//     setTimeout(resolve, 1000, 'one'); 
//   }); 
//   var p2 = new Promise((resolve, reject) => { 
//     setTimeout(resolve, 2000, 'two'); 
//   });
//   var p3 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 3000, 'three');
//   });
//   var p4 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 4000, 'four');
//   });

// console.log(p5)

//   Promise.all([p1, p2, p3, p4, p5]).then(values => { 
//     console.log(values);
//   }, reason => {
//     console.log(reason)
//   });
// var promise1 = Promise.resolve(3)
// var mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];
// var p = Promise.all(mixedPromisesArray);
// console.log(p);
// setTimeout(function() {
//     console.log('the stack is now empty');
//     console.log(p);
// });
var p1 = Promise.reject("calling next");

p1.catch().then(function (value) {
    console.log("next promise's onFulfilled"); /* next promise's onFulfilled */
    console.log(value); /* calling next */
}, function (reason) {
    console.log("next promise's onRejected");
    console.log(reason);
});