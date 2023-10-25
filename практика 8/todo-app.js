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


        //button.disabled= true;
        
        // if(input === 'Введите название нового дела'){
            // button.classList.add('btn', 'btn-primary', 'disabled');
        // }

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

    /*
    function createArray(){
        let array = [];
        return array;

    }
    */

    function createTodoItem(name, done){ //создаст элемент списка дел
        let todoItem = {name, done}
        let item = document.createElement('li');
        //кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');  //отметить дело как сделанное
        let deleteButton = document.createElement('button'); //удалить дело из списка
        //создали кнопки и поместили в див
    
        //устанавливаем стили для элемента списка, а также для размещения кнопок
        //в его первой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'); //стилизуем сам элемент
        item.textContent = todoItem.name; //в li добавляем текст, который передаем функции
    
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить';
        
        //вкладываем кнопки в отдельный элемент. чтобы они объединились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup); //складываем кнопки в li

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        let id = getRandomArbitrary(0, 100);

        
        //приложению нужен доступ к самому элкменту и кнопкам, чтобы обрабатывать события нажатия
        return{
            item, 
            doneButton,
            deleteButton,
            id,
            name,
        };
    }

    function createTodoApp(container, title = 'Список дел'){
        //let container = document.getElementById('todo-app');

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        let array = [];

        //let todoItems = [createTodoItem('Сходить за молоком'), createTodoItem('купить хлеб')];

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        //todoList.append(todoItems[0].item);
        //todoList.append(todoItems[1].item);


        //браузер создает событие submit на форме по нажатию Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e){
            //эта строчка необходима, чтобы предотвратить стандартное действие браузера
            //в данном случае, мы не хоти, чтобы страница перезагружалась при отправке формы
            e.preventDefault();
            //todoItemForm.button.disabled= false;

            //игнорируем создание элемента, если пользователь ничего не ввел в поле
            if(!todoItemForm.input.value){
                //todoItemForm.button.disabled= false;
                return;
            }
            
            //создаем и добавляем в список новое дело с названием из поля для ввода
            //todoList.append(createTodoItem(todoItemForm.input.value).item);

            let todoItem = createTodoItem(todoItemForm.input.value);

            

            //добавляем обработчики на кнопки
            todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('list-group-item-success');
            });

            todoItem.deleteButton.addEventListener('click', function(){
                if(confirm('Вы уверены')) {
                    todoItem.item.remove();
                }

                for(let i = 0; i<array.length; i++){
                    if(todoItem.id === array[i].id){
                        //array.splice(i, 1);
                        delete array[i];
                    }
                }
                  
            });

            // создаем и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);

            //обнуляем значение в поле, что не пришлось стирать ег вручную
            todoItemForm.input.value = '';

        
            //todoItemForm.button.disabled= true;

            
            //let array = [];
            
            
            function ArrayAdd(name,done){
                array.push({
                    name: name,
                    id: todoItem.id,
                    done: done,
                });               
            }
            ArrayAdd(todoItem.name,false);           
            console.log(array);
            
                  
        });
    }
    window.createTodoApp = createTodoApp;
})();

