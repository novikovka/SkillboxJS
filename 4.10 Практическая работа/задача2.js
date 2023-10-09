let count = 7;
let arr = [];

for(let i =1; i<count+1; ++i){
    arr.push(i);
}

for(let i =0; i<count; ++i){
    let j = Math.floor(Math.random() * count);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

console.log(arr);