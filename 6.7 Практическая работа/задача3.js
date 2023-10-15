let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' },
    { name: 'Иван', surname: 'Сидоров'}
];

function filter(objects, inputKey, value){
    let newArray = [];
    for(let obj of objects){
        let keys = Object.keys(obj);
        for(let key of keys){
            if(key === inputKey){
                if(obj[key] === value){
                    newArray.push(obj);
                }
            }
        }
    }
    return newArray;
}

let result = filter(objects, 'name', 'Иван');
console.log(result);