document.addEventListener('DOMContentLoaded', () => {
    arr = [];
    // Порядок сортировки
    let ordASC = 1;
    // Сортируемое поле
    let ordField = '';

    function getFullName(student) {
        return student.surname + "\n" + student.name + "\n" + student.middle_name;
    }

    function sorterName(a, b) {
        return getFullName(a).localeCompare(getFullName(b)) * ordASC;
    }

    function sortString(a, b) {
        return a[this.orderBy].localeCompare(b[this.orderBy]) * ordASC;
    }

    function selectOrd(id) {
        if (id === ordField) {
            ordASC *= -1;
        } else {
            ordField = id;
            ordASC = 1;
        }
    }
    
    function order(e) {
        if (e.target?.id) {
            switch (e.target.id) {
                case 'fio':
                    selectOrd(e.target.id);
                    arr = arr.sort(sorterName);
                    break;
                default:
                    selectOrd(e.target.id);
                    const sortBnd = sortString.bind({ orderBy: e.target.id });
                    arr = arr.sort(sortBnd);
            }
            buildTable(arr);
        }
    }

    const header = document.querySelectorAll('th');
    for (let i = 0; i < header.length; i++) {
        header[i].addEventListener('click', order);
    }

    let now = new Date(); //Текущя дата
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени

    function getAge(bornded) {

        let dob = new Date(bornded);
        let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
        let age; 

        age = today.getFullYear() - dob.getFullYear();
        if (today < dobnow) {
            age = age - 1;
        }
        return age
    }

    const form = {
        name:document.querySelector('.name'),
        surname:document.querySelector('.surname'),
        fatherName:document.querySelector('.fatherName'),
        dateBirth:document.querySelector('.dateBirth'),
        yearCommencementStudy:document.querySelector('.yearCommencementStudy'),
        faculty:document.querySelector('.faculty'),
    };

    function validator(){
        let errorName = document.querySelector('.errorName');
        let errorSurname = document.querySelector('.errorSurname');
        let errorFatherName = document.querySelector('.errorFatherName');
        let errorDateBirth = document.querySelector('.errorDateBirth');
        let errorYearCommencementStudy = document.querySelector('.errorYearCommencementStudy');
        let errorFaculty = document.querySelector('.errorFaculty');

        if(!(form.surname.value).trim()){
            errorSurname.textContent = '\"фамилия\" - обязательное поле!';
        } else{
            errorSurname.textContent = '';
            validSurname = true;
        } 
        
        if(!(form.name.value).trim()){
            errorName.textContent = '\"имя\" - обязательное поле!';
        } else{
            errorName.textContent = '';
            validName = true;
        }
        
        if(!(form.fatherName.value).trim()){
            errorFatherName.textContent = '\"отчество\" - обязательное поле!';
        } else{
            errorFatherName.textContent = '';
            validFatherName = true;
        } 

        if(!(form.dateBirth.value).trim()){
            errorDateBirth.textContent = '\"дата рождения\" - обязательное поле!';
        } else if(+(form.dateBirth.value.slice(0, 4)) < 1900){
            errorDateBirth.textContent = 'дата рождения находится в диапазоне от 01.01.1900 до текущей даты!';       
        } else{
            errorDateBirth.textContent = '';
            validDateBirth = true;
        }

        if(!(form.yearCommencementStudy.value).trim()){
            errorYearCommencementStudy.textContent = '\"год начала обучения\" - обязательное поле!';
        }else if(!isFinite(form.yearCommencementStudy.value)){
            errorYearCommencementStudy.textContent = 'год начала обучения - число!';
        }else if(+form.yearCommencementStudy.value <= 2000){
            errorYearCommencementStudy.textContent = 'год начала обучения находится в диапазоне от 2000-го до текущего года!';    
        } else{
            errorYearCommencementStudy.textContent = '';
            validYearCommencementStudy = true;
        }

        if(!(form.faculty.value).trim()){
            errorFaculty.textContent = '\"факультет\" - обязательное поле!';
        } else{
            errorFaculty.textContent = '';
            validFaculty = true;
        } 
    }

    function RefactorBornded(bornded){
        return bornded.split('-').reverse().join('.');
    }

    function addStudent() {
        validator();
        if (validName && validSurname && validFatherName && validDateBirth && validYearCommencementStudy && validFaculty){
            let newStudent = { surname: form.surname.value, name: form.name.value,
                middle_name: form.fatherName.value,
                bornded: RefactorBornded(form.dateBirth.value),
                start_study: form.yearCommencementStudy.value,
                fac: form.faculty.value
            }
            arr.push(newStudent);
            console.log(arr);
            buildTable(arr);
        }

        form.name.value = '';
        form.surname.value = '';
        form.fatherName.value = '';
        form.dateBirth.value = '';
        form.yearCommencementStudy.value = '';
        form.faculty.value = '';

        validName = false;
        validSurname = false;
        validFatherName = false;
        validDateBirth = false;
        validYearCommencementStudy = false;
        validFaculty = false;
    }

    let table = document.getElementById('table')

    function buildTable(data) {
        
        table.classList.add('table');
        table.innerHTML = '';
        let today = new Date()
        let todayYear = today.getFullYear()
        table.innerHTML = ''
        for (let i = 0; i < data.length; i++) {
            let fioObj = getFullName(data[i]);
            let old = getAge(data[i].bornded);
            let end_study;
            let course;
            if(+todayYear - +data[i].start_study > 4){
                end_study =  +data[i].start_study + 4;
                course = '(Закончил)';
            } else{
                end_study = +todayYear;
                course = `(${+todayYear - +data[i].start_study} курс)`;           
            }
            let row = `
            <tr>
                <td>${fioObj}</td>
                <td>${data[i].fac}</td>
                <td>${data[i].bornded} (${old} лет)</td>
                <td>${data[i].start_study}-${end_study} ${course}</td>
            <tr/>
            `;
            table.innerHTML += row;
        }
    }

    function filter(arr, prop, value){
        let result = [];
        let copy = [...arr];
        for(let item of copy){
            if(prop === 'fio'){
                if ((String(item['name']).includes(value)) || 
                (String(item['surname']).includes(value)) || 
                (String(item['middle_name']).includes(value))) result.push(item)
            }else if(prop === 'end_study'){
                if(String(+item['start_study']+4).includes(value)) result.push(item)
            }else{
                if(String(item[prop]).includes(value)) result.push(item)
            }             
        }
        return result     
    }

    function render(arr){
        table.classList.add('table');
        table.innerHTML = '';

        let filterFIO = document.querySelector('.filter-intut-fio').value; //получает значение фильтрации из инпута
        let filterFac = document.querySelector('.filter-intut-fac').value;
        let filterStart_study = document.querySelector('.filter-intut-begin-education').value;
        let filterEnd_study = document.querySelector('.filter-intut-end-education').value;
        let newArr = [...arr]; 
        if(filterFIO){
            newArr = filter(newArr, 'fio', filterFIO) 
        }
        if(filterFac){
            newArr = filter(newArr, 'fac', filterFac) 
        }
        if(filterStart_study){
            newArr = filter(newArr, 'start_study', filterStart_study) 
        }
        if(filterEnd_study){
            newArr = filter(newArr, 'end_study', filterEnd_study) 
        } 

        for (let user of newArr){  
            let today = new Date()
            let todayYear = today.getFullYear()
            let fioObj = getFullName(user);
            let old = getAge(user.bornded);
            let end_study;
            let course;
            if(+todayYear - +user.start_study > 4){
                end_study =  +user.start_study + 4;
                course = '(Закончил)';
            } else{
                end_study = +todayYear;
                course = `(${+todayYear - +user.start_study} курс)`;           
            }
            let row = `
            <tr>
                <td>${fioObj}</td>
                <td>${user.fac}</td>
                <td>${user.bornded} (${old} лет)</td>
                <td>${user.start_study}-${end_study} ${course}</td>
            <tr/>
            `;
            table.innerHTML += row;
            console.log('render');
        }   
    }

    function help(){
        render(arr)
    }
    
    let addButton = document.querySelector('.button');
    addButton.addEventListener('click', addStudent);

    let filterButton = document.querySelector('.filter-btn');
    filterButton.addEventListener('click', help);
});
