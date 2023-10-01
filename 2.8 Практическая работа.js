//задача 1:
let x1 = 2;
let y1 = 3;

let x2 = 10;
let y2 = 5;

let square1 = (Math.abs(x2-x1))*(Math.abs(y2-y1));

console.log(square1)

let x3 = 10;
let y3 = 5;

let x4 = 2;
let y4 = 3;

let square2 = (Math.abs(x4-x3))*(Math.abs(y4-y3));

console.log(square2)

//задача2:

let a = 13.123456789;
let b = 2.123;
let n = 5;

let fractionA = Math.floor(a%1 * Math.pow(10,n));
let fractionB = Math.floor(b%1 * Math.pow(10,n));

console.log(fractionA);
console.log(fractionB);

console.log(fractionA > fractionB)
console.log(fractionA < fractionB)
console.log(fractionA >= fractionB)
console.log(fractionA <= fractionB)
console.log(fractionA === fractionB)
console.log(fractionA !== fractionB)

//задача3:

let n1 = 2;
let m1 = 5;

let min = Math.min(n1, m1);
let max = Math.max(n1, m1);

let rnd = Math.round(Math.random() * (max-min)/2)*2 + 1;
console.log(rnd);
