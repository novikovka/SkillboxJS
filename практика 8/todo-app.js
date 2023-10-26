(function(){
    //создаем и возвращаем заголовок приложения
    function createAppTitle(title){
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    //создаем и возвращаем форму для создания дела
    function createTodoItemForm(){
        let form = document.createElement('form'); //создаем сам элемент формы
        let input = document.createElement('input'); //создаем поле для ввода
        let buttonWrapper = document.createElement('div'); //вспомогательный элемент чтобы правильно стилизовать кнопку
        let button = document.createElement('button'); //создали саму кнопку

        //расставляем атрибуты для стилей
        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела'; //этот текст отображается всегда, когда в поле ничего не введено
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);
        
        return{
            form,
            input,
            button,
        };
    }

    //создаем и возвращаем список элементов
    function createTodoList(){
        let list = document.createElement('ul');
        list.classList.add('list-group'); //по сути просто пустой список со стилизацией
        return list;
    }

    function createTodoItem(name, done, id){ //создаст элемент списка дел
        let item = document.createElement('li');
        //кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');  //отметить дело как сделанное
        let deleteButton = document.createElement('button'); //удалить дело из списка
        //создали кнопки и поместили в див
    
        //устанавливаем стили для элемента списка, а также для размещения кнопок
        //в его первой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'); //стилизуем сам элемент
        item.textContent = name; //в li добавляем текст, который передаем функции
    
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить';
        
        //вкладываем кнопки в отдельный элемент. чтобы они объединились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup); //складываем кнопки в li

        //приложению нужен доступ к самому элкменту и кнопкам, чтобы обрабатывать события нажатия
        return{
            item, 
            doneButton,
            deleteButton,
            id,
            name,
            done,
        };
    }

    function createTodoApp(container, title = 'Список дел', listName){
        //let container = document.getElementById('todo-app');

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        let array = [];

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        //container.append(todoList);

        function SetData(key,data){ //запись массива дел в хранилище            
            let jsonData = JSON.stringify(data);
            return localStorage.setItem(key, jsonData);          
        }

        function GetData(key){ //получение массива дел из хранилища
            let data = localStorage.getItem(key);
            return JSON.parse(data);
        }


        function addEvent(todoItem){
            todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('list-group-item-success');
                array = array.map(el => el.id === todoItem.id ? {...el, done: !el.done}: el);
                SetData(listName,array);
            });

            todoItem.deleteButton.addEventListener('click', function(){
                if(confirm('Вы уверены')) {
                    todoItem.item.remove();
                }

                array = array.filter(el => el.id !== todoItem.id)
                SetData(listName,array);             
            });
        }

        //выводим значения из localStorage
        let existingData = GetData(listName);
        if(existingData){
            for(i in existingData){
                array.push(existingData[i]);
                let newItem = createTodoItem(existingData[i].name, false, existingData[i].id);
                todoList.append(newItem.item); 
                addEvent(newItem);               
            }
        }
        container.append(todoList);

        //браузер создает событие submit на форме по нажатию Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault();
            if(!todoItemForm.input.value){
                todoItemForm.button.disabled= false;
                return;
            }

            todoItemForm.button.disabled = true;
            todoItemForm.input.addEventListener('input', () => {
                todoItemForm.button.disabled = !todoItemForm.input.value.length;
            })
            
            let todoItem = createTodoItem(todoItemForm.input.value, false, Math.random() * 100);
            addEvent(todoItem);
            array.push({name:todoItem.name, id:todoItem.id, done:todoItem.done});
            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
            SetData(listName,array);                                  
        });
    }
    window.createTodoApp = createTodoApp;
})();

