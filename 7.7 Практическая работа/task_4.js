let students=[
    {name: 'Валя', age: 11},
    {name: 'Таня',age: 24},
    {name: 'Рома',age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
];

function createStudentsList(){        
    let ul = document.createElement('ul');
    for(let student of students){
        let li = document.createElement('li');
        let h2 = document.createElement('h2');
        let span = document.createElement('span');
        h2.textContent = student.name;
        span.textContent = "Возраст: " + student.age + " лет";
        li.append(h2);
        li.append(span);
        ul.append(li);      
    }
    document.body.append(ul);
}

let button = document.querySelector('.bth');
button.addEventListener('click', createStudentsList);