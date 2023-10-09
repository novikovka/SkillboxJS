let arr1 = [2, 2, 17, 21, 45, 12, 54, 31, 53];
let arr2 = [12, 44, 23, 5];
let length1 = arr1.length;
let length2 = arr2.length;

let arr = []

for(let i = 0; i< length1+length2; ++i){
    if(i < length1){
        arr.push(arr1[i])
    }else{
        arr.push(arr2[i-length1]);
    }
}

console.log(arr);
