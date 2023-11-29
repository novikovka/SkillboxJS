const api = {
    base:'https://api.openweathermap.org/data/2.5/',
    key: 'b51cce9bec75908a4a67e6c6842289d4'
}

const dateBuilder = (d) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',    
    ];
    const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

const input = document.querySelector('.searchbar');
const container = document.querySelector('.location-container');

let city = localStorage.getItem('city') || 'Ekaterinburg';
let store = {};

input.addEventListener('keyup', (e) => { //слушатель события при нажатии Enter
    const value = e.target.value;
    if (e.key == 'Enter' && value){ //почему тут == а не ===
        city = value;
        localStorage.setItem('city', city);
        fetchData();
        e.target.value = '';
    }
})

const fetchData = async () => {
    getLoader();
    const response = await fetch(`${api.base}weather?q=${city}&appid=${api.key}`).then((res) => res.json()); //что это?
    const {name, weather, main: {temp}, sys: {country}} = response;
    store = {
        name,
        weather: weather[0].main,
        temp,
        country
    };
    renderComponent();
};

const getLoader = () => {
    container.innerHTML = `<span class="loader"></span>`;
}

const renderComponent = () => {
    container.innerHTML = getContent();
}

const background = document.querySelector('.app');

const getContent = () => {
    const{name, weather, temp, country} = store;
    let newTemp = Math.round(temp - 273);
    if (newTemp >= 0){
        background.classList.add('warm');
    }else{
        background.classList.remove('warm');
    }

    return `<div class="location-box">
    <div class="location">
        ${name}, ${country}
    </div>
    <div class="date">${dateBuilder(new Date())}</div>
    </div>

    <div class="weather-box">
    <div class="temp">${newTemp} °C</div>
    <div class="weather">${weather}</div>
    </div>`
}

fetchData();