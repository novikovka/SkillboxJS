let array = [2,5,1,3,4];
let n = 8;

let index = -1;

for(let i = 0; i< array.length; ++i){
    if(array[i] === n){
        index = i;
        break;
    }
}

if(index !== -1){
    console.log('индекс элемента = ' + index);
}else{
    console.log('элемент не найден');
}

