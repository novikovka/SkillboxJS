//задача1

let password1 = '1234-'; //пример1
if(((password1.includes('-')) || (password1.includes('_'))) && (password1.length >= 4)){
    console.log('Пароль надежный');
} else{
    console.log('Пароль недостаточно надёжный');
}

let password2 = 'qaz-xsw'; //пример2
if(((password2.includes('-')) || (password2.includes('_'))) && (password2.length >= 4)){
    console.log('Пароль надежный');
} else{
    console.log('Пароль недостаточно надёжный');
}

let password3 = 'qaz'; //пример3
if(((password3.includes('-')) || (password3.includes('_'))) && (password3.length >= 4)){
    console.log('Пароль надежный');
} else{
    console.log('Пароль недостаточно надёжный');
}

let password4 = '_-3'; //пример4
if(((password4.includes('-')) || (password4.includes('_'))) && (password4.length >= 4)){
    console.log('Пароль надежный');
} else{
    console.log('Пароль недостаточно надёжный');
}

//задача 2

let userName = "ДаВИд";
let userSurname = "пРЕоБраЖЕнСкий";

let UpperStrName = userName[0].toUpperCase();
let UpperStrSurname = userSurname[0].toUpperCase();

let LowerStrName = userName.substring(1).toLowerCase();
let LowerStrSurname = userSurname.substring(1).toLowerCase();

let resultName = UpperStrName + LowerStrName;
let resultSurename = UpperStrSurname + LowerStrSurname;

console.log(resultName, resultSurename);
console.log(resultName === userName ? 'Имя осталось без изменений' : 'Имя было преобразовано');

//задача 3 

let number = 13;
console.log(number%2 === 0 ? 'Число чётное': 'Число нечётное');