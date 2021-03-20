let searchButton = document.getElementById('search-button');
let clearHistory = document.getElementById('clear-history');
let cityInput = document.querySelector('#city-input');
let formElement = document.getElementById('form-element');
let cityName = document.getElementById('city-name');
let weatherIcon = document.getElementById('weather-icon');
let temperature = document.getElementById('temperature');
let humidity = document.getElementById('humidity');
let windSpeed = document.getElementById('wind-speed');
let uvIndex = document.getElementById('UV-index');
let forecast = document.getElementsByClassName('forecast');
let imgEl = document.querySelector('img');
let day1Date = document.getElementById('day1Date');
let day1Icon = document.getElementById('day1Weather-icon');
let day1Temp = document.getElementById('day1Temp');
let day1Humidity = document.getElementById('day1Humidity');
let weatherDay2 = document.getElementById('weather-2');
let weatherDay3 = document.getElementById('weather-3');
let weatherDay4 = document.getElementById('weather-4');
let weatherDay5 = document.getElementById('weather-5');

let headingDate = moment().subtract(10, 'days').calendar()
let headingDate1 = moment().add(1, 'days').format('l');
let headingDate2 = moment().add(2, 'days').format('l');
let headingDate3 = moment().add(3, 'days').format('l');
let headingDate4 = moment().add(4, 'days').format('l');
let headingDate5 = moment().add(5, 'days').format('l');


let formSubmitHandler = function (event) {
    event.preventDefault();

    let city = cityInput.value.trim();

    if (city) {
        getApi(city);

        cityName.textContent = '';
        cityInput.value = '';

    } else {
        alert('Please enter a city name');
    }
};

function getApi(city) {

    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=7d3afb4e42d64b1033626322feda44f4`;

    fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {
                    console.log(data)
                    displayWeather(data, city)
                    getFeatures(data.coord.lat, data.coord.lon)
                })
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert('Unable to connect to openweathermap');
        });
};


function displayWeather(data, searchCity) {

    let iconCode = data.weather[0].icon
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    weatherIcon.setAttribute('src', iconUrl);

    cityName.textContent = searchCity + ' ' + '(' + headingDate + ')';
    temperature.textContent = 'Temperature: ' + data.main.temp + ' °F';
    humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
    windSpeed.textContent = 'Wind Speed: ' + data.wind.speed + ' MPH';
}

function getFeatures(lat, lon) {

    let oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=7d3afb4e42d64b1033626322feda44f4`;

    fetch(oneCallUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {
                    console.log(data)
                    displayFeatures(data)
                })
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert('Unable to connect to openweathermap');
        });
}

function displayFeatures(data) {

    let fiveDays = data.daily.slice(0,5);

    // DAY ONE
    let dayOneIcon = fiveDays[0].weather[0].icon;
    let dayOneTemp = fiveDays[0].temp.day;
    let dayOneHumidity = Math.round(fiveDays[0].humidity);
    let day1IconUrl = "http://openweathermap.org/img/w/" + dayOneIcon + ".png";
    day1Date.textContent = headingDate1;
    day1Icon.setAttribute('src', day1IconUrl);
    day1Temp.textContent = ("Temp: " + dayOneTemp + "°F");
    day1Humidity.textContent = ('Humidity: ' + dayOneHumidity + '%');

    // // DAY TWO
    // let dayTwoTemp = Math.round(fiveDays[1].temp.day);
    // weatherDay2.textContent = ("Temperature: " + dayTwoTemp + "°F");

    // // DAY THREE
    // let dayThreeTemp = Math.round(fiveDays[2].temp.day);
    // weatherDay3.textContent = ("Temperature: " + dayThreeTemp + "°F");

    // // DAY FOUR
    // let dayFourTemp = Math.round(fiveDays[3].temp.day);
    // weatherDay4.textContent = ("Temperature: " + dayFourTemp + "°F");

    // // DAY FIVE 
    // let dayFiveTemp = Math.round(fiveDays[4].temp.day);
    // weatherDay5.textContent = ("Temperature: " + dayFiveTemp + "°F");

    // UV Index
    let currentUv = Math.round(data.current.uvi);
    uvIndex.textContent = 'Uv-Index: ' + currentUv;

    if (currentUv <= 2) {
        uvIndex.classList.add('favorable')
    } else if (currentUv >= 3 && currentUv <= 7) {
        uvIndex.classList.remove('favorable');
        uvIndex.classList.add('moderate');
    } else if (currentUv >= 8) {
        uvIndex.classList.remove('favorable');
        uvIndex.classList.remove('moderate');
        uvIndex.classList.add('severe');
    }
}


// Make a form element in html and make it the parent, then replace cityInput element.
formElement.addEventListener('submit', formSubmitHandler)