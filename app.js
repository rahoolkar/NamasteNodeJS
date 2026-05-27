console.log("namaste-node");

console.log(global); // this is a global object which is provided by node

console.log(this); //incase of node js- this keyword doesnot points to global object. it points to an empty object

console.log(globalThis); //globalThis points to global-object in every javascript runtime

console.log(globalThis === global);

require("./xyz");

const { sum } = require("./abc");

const a = 90;
const b = 10;
sum(a, b);
