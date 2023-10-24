function createStudentCard(student){
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let span = document.createElement('span');
    h2.textContent = student.name;
    span.textContent = "Возраст: " + student.age + " лет";
    div.append(h2);
    div.append(span);
    document.body.append(div);
}

let studentObj={
    name: 'Игорь',
    age: 17
}

createStudentCard(studentObj);
