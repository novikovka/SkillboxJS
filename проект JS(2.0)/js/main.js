const swiper = new Swiper( //создаем новый слайдер
    '.swiper-container',
    {
        loop: true, //делаем "бесконечную" прокрутку
        navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev' 
        }
    }
);

function dataToJson(data){ //конвертируем в JSON
    return JSON.stringify(data);
};

function jsonToData(data){ // из JSON в JS
    return JSON.parse(data);
};

function getCartData(){ // из localStorage
    return localStorage.getItem('cartData');
};

function setCartData(data){ // в localStorage
    localStorage.setItem('cartData', data);
};

function getMyCart(){
    let cart = localStorage.getItem('cartData'); //получаем текущее состояние корзины
    cart = cart ? jsonToData(cart) : [];
    return cart;
}

let allGoods = [];

function getGoods(){
    fetch('db/base.json').then(res => res.json()).then(result => {allGoods = result;})
}

const cart = { //заведем объект корзины
    cartGoods: getMyCart(),

    addCartId(id){
        const goodItem = this.cartGoods.find(good => good.id === id);
        if (goodItem){
            this.plusGood(id)
        }else{
            const {id: idx,name,price} = allGoods.find(good => good.id === id);
            this.cartGoods.push({id: idx,name,price, count: 1});
            this.cartRender();
        } 
        setCartData(dataToJson(this.cartGoods));

    },
    cartRender(){
        cartTableGoods.textContent = '';
        this.cartGoods.forEach(({name, id, price, count}) => {
            const trGood = document.createElement('tr');
            trGood.className = 'cart-item';
            trGood.dataset.id = id;
            trGood.innerHTML = `
            <td>${name}</td>
            <td>${price}\ ₽</td>
            <td><button class = "cart-btn-minus" data-id = ${id}>-</button></td>
            <td>${count}</td>
            <td><button class = "cart-btn-plus" data-id = ${id}>+</button></td>
            <td>${count * price}</td>
            <td><button class = "cart-btn-delete" data-id = ${id}>x</button></td>
            `
            cartTableGoods.append(trGood);
        })
        const totalPrice = this.cartGoods.reduce((sum, item) => sum + item.price * item.count, 0);
        cartTableTotal.textContent = `${totalPrice}₽`;
        cartCount.textContent = this.cartGoods.reduce((sum, item) => sum + item.count, 0); // 0 - это начальное значение
    },
    plusGood(id){
        const elem = this.cartGoods.find(el => el.id === id);
        if(elem){
            elem.count++;
        }
        setCartData(dataToJson(this.cartGoods));
        this.cartRender(); //перерисовка
    },

    minusGood(id){
        const elem = this.cartGoods.find(el => el.id === id);
        if (elem.count === 1) {
            this.deleteGood(id);
        }else{
            elem.count--;
        }
        setCartData(dataToJson(this.cartGoods));
        this.cartRender();
    },

    deleteGood(id){
        this.cartGoods = this.cartGoods.filter(el => el.id !== id);
        setCartData(dataToJson(this.cartGoods));
        this.cartRender();
    }

}

const buttonCart = document.querySelector('.button-cart');  //получаем кнопку корзины
const modalCart = document.querySelector('#modal-cart')
const cartTableGoods = document.querySelector('.cart-table__goods');
const cartTableTotal = document.querySelector('.card-table__total');
const cartCount = document.querySelector('.cart-count');
const navigationItems = document.querySelectorAll('.navigation-link'); //получаем все ссылки на разделы
const longGoodList = document.querySelector('.long-goods-list');
const longGoods = document.querySelector('.long-goods'); //секция с менюшкой
const specialOffers = document.querySelector('.special-offers'); //секция с карточками
const slider = document.querySelector('.slider'); //секция со слайдером
const logoLink = document.querySelector('.logo-link');
const categoryTitle = document.querySelector('.category-title');
const cardMenu = document.querySelector('.card-menu') //карточка для открытия менюшки
const parents = document.querySelectorAll('.navigation-item');

cardMenu.addEventListener('click', () => {
    longGoods.classList.remove('blokirovka');
    slider.classList.add('blokirovka');
    specialOffers.classList.add('blokirovka');
})

function scrollTop(){ //пишем логику для плавности якорных ссылок
    const scrollLinks = document.querySelectorAll('a.scroll-link');  //хотим получить все теги a с классом scroll-link
    for (let i = 0; i < scrollLinks.length; i++){
        scrollLinks[i].addEventListener('click', (e) => {
            e.preventDefault(); //убираем поведение по умолчанию
            const id = scrollLinks[i].getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth', //плавность
                block: 'start'
            })
        })
    }
}

scrollTop();

cartTableGoods.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'BUTTON'){
        const className = target.className;
        const id = target.dataset.id;
        switch(className) {
            case 'cart-btn-delete':
                cart.deleteGood(id);
                break;
            case 'cart-btn-minus':
                cart.minusGood(id);
                break;
            case 'cart-btn-plus':
                cart.plusGood(id);
                break;
        }
    }
})

function renderCards(data){
    longGoodList.textContent = ''; //очищаем от стартовых данных
    const cards = data.map(good => createCard(good));
    longGoodList.append(...cards); //сред-оператор "..."
    document.body.classList.add('show-goods');
}

logoLink.addEventListener('click', () => {
    if(document.body.classList.contains('show-goods')){
        document.body.classList.remove('show-goods');
        longGoods.classList.add('blokirovka');
        slider.classList.remove('blokirovka');
        specialOffers.classList.remove('blokirovka');
    }
})

function createCard(objCard){
    const card = document.createElement('div');
    card.className = "col-lg-3 col-sm-6";
    card.innerHTML = `
    <div class = "goods-card">
    <img src="db/${objCard.img}" alt="${objCard.name}" class="good-image">
    <h3 class="goods-title">${objCard.name}</h3>
    <button class="button goods-card-btn add-to-card" data-id= "${objCard.id}">
    <span class="button-price">${objCard.price} ₽</span></button>
    </div>`;
    card.addEventListener('click', () =>{
        cart.addCartId(objCard.id);
    })
    return card;
}



function filterCard(field, value){ //фильтрация
    renderCards(allGoods.filter(good => good[field] === value))

}

navigationItems.forEach((link) => {
    link.addEventListener('click', (e) => {
        parents.forEach((p) => p.classList.remove('navigation-item-active'));
        const field = link.dataset.field;
        const parent = link.closest(".navigation-item");
        parent.classList.add('navigation-item-active');
        if (field){ //если филд вообще существует
            const value = link.textContent; //получаем его значение       
            categoryTitle.textContent = `${value}`;         
            filterCard(field, value); //фильтруем по филду
            return;
        }
        else{
            categoryTitle.textContent = 'все меню';
        }
        renderCards(allGoods);
        
    })
})

buttonCart.addEventListener('click', () => {
    modalCart.classList.add('show');
})

document.addEventListener('mouseup', (e) => {
    const target = e.target;
    if (!target.closest('.modal') || target.classList.contains('modal-close')) {
        if(modalCart.classList.contains('show')){
            modalCart.classList.remove('show');
        }
    }
})

document.body.addEventListener('click', (e) => {  //делегирование (делаем слушатель не на сам элемент, а на его родительский)
    const target = e.target.closest('.add-to-cart');
    if(target) {
        cart.addCartId(target.dataset.id)
    }
})

getGoods();
cart.cartRender();

