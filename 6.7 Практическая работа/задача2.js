let allUsers=[
    {name: 'Валя', age: 11},
    {name: 'Таня',age: 24},
    {name: 'Рома',age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
];

function getOlderUserArray(users){
    let maxAge = 0;
    let result = '';
    for(let user of users){
        if(user.age > maxAge){
            maxAge = user.age;
            result = user.name;
        }
    }
    return result;
} 

console.log(getOlderUserArray(allUsers));
   
   