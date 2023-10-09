let n = -3;
let m = -10;
let count = 42;

let min = Math.min(n, m);
let max = Math.max(n, m);

let arr = [];

while(arr.length< count){
    arr.push(Math.round(Math.random()* (max-min) + min));
}

console.log(arr);