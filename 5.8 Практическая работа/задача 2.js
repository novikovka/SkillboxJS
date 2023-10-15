// Массив с почтовыми адресами:
let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru',  'goodday@day.ru', 
'annavkmail@vk.ru', 'fullname@skill.ru', ];
// Массив с почтовыми адресами в чёрном списке:
let blackList = ['jsfunc@mail.ru','goodday@day.ru'];
// Вызов созданной функции:
let result = filter(whiteList, blackList);

function filter (whiteList, blackList){
    let newList = [];
    for(let i = 0; i< whiteList.length; ++i){
        if(!(blackList.includes(whiteList[i]))){
            newList.push(whiteList[i]);
        }             
    }
    return newList;
}

console.log(result);