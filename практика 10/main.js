document.addEventListener('DOMContentLoaded', () => {
    /*
    let arr = [
        {
            surname: '',
            name: '',
            middle_name: '',
            bornded: '',
            start_study: '',
            fac: ''
        }    
    ];
    */

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
        if (e.target && e.target.id) {
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

    const header = document.getElementsByTagName('th');
    for (let i = 0; i < header.length; i++) {
        header[i].addEventListener('click', order);
    }

    var now = new Date(); //Текущя дата
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени

    function getAge(bornded) {

        var dob = new Date(bornded);
        var dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
        var age; 

        age = today.getFullYear() - dob.getFullYear();
        if (today < dobnow) {
            age = age - 1;
        }
        return age
    }

    let nameInput = document.querySelector('.nameInput');
    let surnameInput = document.querySelector('.surnameInput');
    let fatherNameInput = document.querySelector('.fatherNameInput');
    let dateBirthInput = document.querySelector('.dateBirthInput');
    let yearCommencementStudyInput = document.querySelector('.yearCommencementStudyInput');
    let facultyInput = document.querySelector('.facultyInput');

    function validator(){
        let errorName = document.querySelector('.errorName');
        let errorSurname = document.querySelector('.errorSurname');
        let errorFatherName = document.querySelector('.errorFatherName');
        let errorDateBirth = document.querySelector('.errorDateBirth');
        let errorYearCommencementStudy = document.querySelector('.errorYearCommencementStudy');
        let errorFaculty = document.querySelector('.errorFaculty');

        if(!(surnameInput.value).trim()){
            errorSurname.textContent = '\"фамилия\" - обязательное поле!';
        } else{
            errorSurname.textContent = '';
            validSurname = true;
        } 
        
        if(!(nameInput.value).trim()){
            errorName.textContent = '\"имя\" - обязательное поле!';
        } else{
            errorName.textContent = '';
            validName = true;
        }
        
        if(!(fatherNameInput.value).trim()){
            errorFatherName.textContent = '\"отчество\" - обязательное поле!';
        } else{
            errorFatherName.textContent = '';
            validFatherName = true;
        } 

        if(!(dateBirthInput.value).trim()){
            errorDateBirth.textContent = '\"дата рождения\" - обязательное поле!';
        } else if(Number(dateBirthInput.value.slice(0, 4)) < 1900){
            errorDateBirth.textContent = 'дата рождения находится в диапазоне от 01.01.1900 до текущей даты!';       
        } else{
            errorDateBirth.textContent = '';
            validDateBirth = true;
        }

        if(!(yearCommencementStudyInput.value).trim()){
            errorYearCommencementStudy.textContent = '\"год начала обучения\" - обязательное поле!';
        }else if(!isFinite(yearCommencementStudyInput.value)){
            errorYearCommencementStudy.textContent = 'год начала обучения - число!';
        }else if(Number(yearCommencementStudyInput.value) <= 2000){
            errorYearCommencementStudy.textContent = 'год начала обучения находится в диапазоне от 2000-го до текущего года!';    
        } else{
            errorYearCommencementStudy.textContent = '';
            validYearCommencementStudy = true;
        }

        if(!(facultyInput.value).trim()){
            errorFaculty.textContent = '\"факультет\" - обязательное поле!';
        } else{
            errorFaculty.textContent = '';
            validFaculty = true;
        } 
    }

    function RefactorBornded(bornded){
        return bornded.split('-').reverse().join('.');
    }

    function AddStudent() {
        validator();
        if (validName && validSurname && validFatherName && validDateBirth && validYearCommencementStudy && validFaculty){
            let newStudent = { surname: surnameInput.value, name: nameInput.value,
                middle_name: fatherNameInput.value,
                bornded: RefactorBornded(dateBirthInput.value),
                start_study: yearCommencementStudyInput.value,
                fac: facultyInput.value
            }
            arr.push(newStudent);
            console.log(arr);
            buildTable(arr);
        }

        nameInput.value = '';
        surnameInput.value = '';
        fatherNameInput.value = '';
        dateBirthInput.value = '';
        yearCommencementStudyInput.value = '';
        facultyInput.value = '';

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
            if(Number(todayYear) - Number(data[i].start_study) > 4){
                end_study =  Number(data[i].start_study) + 4;
                course = '(Закончил)';
            } else{
                end_study = Number(todayYear);
                course = `(${Number(todayYear) - Number(data[i].start_study)} курс)`;           
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
                if ((String(item['name']).includes(value) == true) || 
                (String(item['surname']).includes(value) == true) || 
                (String(item['middle_name']).includes(value) == true)) result.push(item)
            }else if(prop === 'end_study'){
                if(String(Number(item['start_study'])+4).includes(value) == true) result.push(item)
            }else{
                if(String(item[prop]).includes(value) == true) result.push(item)
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
        if(filterFIO != ''){
            newArr = filter(newArr, 'fio', filterFIO) 
        }
        if(filterFac != ''){
            newArr = filter(newArr, 'fac', filterFac) 
        }
        if(filterStart_study != ''){
            newArr = filter(newArr, 'start_study', filterStart_study) 
        }
        if(filterEnd_study != ''){
            newArr = filter(newArr, 'end_study', filterEnd_study) 
        } 

        for (let user of newArr){  
            let today = new Date()
            let todayYear = today.getFullYear()
            let fioObj = getFullName(user);
            let old = getAge(user.bornded);
            let end_study;
            let course;
            if(Number(todayYear) - Number(user.start_study) > 4){
                end_study =  Number(user.start_study) + 4;
                course = '(Закончил)';
            } else{
                end_study = Number(todayYear);
                course = `(${Number(todayYear) - Number(user.start_study)} курс)`;           
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
    addButton.addEventListener('click', AddStudent);

    let filterButton = document.querySelector('.filter-btn');
    filterButton.addEventListener('click', help);

});
