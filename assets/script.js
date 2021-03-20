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

let day2Date = document.getElementById('day2Date');
let day2Icon = document.getElementById('day2Weather-icon');
let day2Temp = document.getElementById('day2Temp');
let day2Humidity = document.getElementById('day2Humidity');

let day3Date = document.getElementById('day3Date');
let day3Icon = document.getElementById('day3Weather-icon');
let day3Temp = document.getElementById('day3Temp');
let day3Humidity = document.getElementById('day3Humidity');

let day4Date = document.getElementById('day4Date');
let day4Icon = document.getElementById('day4Weather-icon');
let day4Temp = document.getElementById('day4Temp');
let day4Humidity = document.getElementById('day4Humidity');

let day5Date = document.getElementById('day5Date');
let day5Icon = document.getElementById('day5Weather-icon');
let day5Temp = document.getElementById('day5Temp');
let day5Humidity = document.getElementById('day5Humidity');

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

    let fiveDays = data.daily.slice(0, 5);

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
    let dayTwoIcon = fiveDays[1].weather[0].icon;
    let dayTwoTemp = fiveDays[1].temp.day;
    let dayTwoHumidity = Math.round(fiveDays[1].humidity);
    let day2IconUrl = "http://openweathermap.org/img/w/" + dayTwoIcon + ".png";
    day2Date.textContent = headingDate2;
    day2Icon.setAttribute('src', day2IconUrl);
    day2Temp.textContent = ("Temp: " + dayTwoTemp + "°F");
    day2Humidity.textContent = ('Humidity: ' + dayTwoHumidity + '%');

    // // DAY THREE
    let dayThreeIcon = fiveDays[2].weather[0].icon;
    let dayThreeTemp = fiveDays[2].temp.day;
    let dayThreeHumidity = Math.round(fiveDays[2].humidity);
    let day3IconUrl = "http://openweathermap.org/img/w/" + dayThreeIcon + ".png";
    day3Date.textContent = headingDate3;
    day3Icon.setAttribute('src', day3IconUrl);
    day3Temp.textContent = ("Temp: " + dayThreeTemp + "°F");
    day3Humidity.textContent = ('Humidity: ' + dayThreeHumidity + '%');

    // // DAY FOUR
    let dayFourIcon = fiveDays[3].weather[0].icon;
    let dayFourTemp = fiveDays[3].temp.day;
    let dayFourHumidity = Math.round(fiveDays[3].humidity);
    let day4IconUrl = "http://openweathermap.org/img/w/" + dayFourIcon + ".png";
    day4Date.textContent = headingDate4;
    day4Icon.setAttribute('src', day4IconUrl);
    day4Temp.textContent = ("Temp: " + dayFourTemp + "°F");
    day4Humidity.textContent = ('Humidity: ' + dayFourHumidity + '%');

    // // DAY FIVE 
    let dayFiveIcon = fiveDays[4].weather[0].icon;
    let dayFiveTemp = fiveDays[4].temp.day;
    let dayFiveHumidity = Math.round(fiveDays[4].humidity);
    let day5IconUrl = "http://openweathermap.org/img/w/" + dayFiveIcon + ".png";
    day5Date.textContent = headingDate5;
    day5Icon.setAttribute('src', day5IconUrl);
    day5Temp.textContent = ("Temp: " + dayFiveTemp + "°F");
    day5Humidity.textContent = ('Humidity: ' + dayFiveHumidity + '%');

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



function renderSearchHistory() {
    historyEl.empty()
    for (let i = 0; i < searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function () {
            getCityName(historyItem.value);
            getFiveDay(historyItem.value);

        });
        historyEl.append(historyItem);
    }
}






var searchHistory = JSON.parse(localStorage.getItem("cities")) || [];
console.log(searchHistory);

// var cities = JSON.parse(localStorage.getItem("cities")) || [];
// searchHistory.push(city);
// localStorage.setItem("cities", JSON.stringify(searchHistory));
// renderSearchHistory();

// var formSubmitHandler = function (event) {
//     event.preventDefault();

//     var city = cityInputEl.val().trim();

//     if (city) {
//         getCityName(city);
//         getFiveDay(city);
//         cityInputEl.text("");
//         cityInputEl.val("");

//         var cities = JSON.parse(localStorage.getItem("cities")) || [];
//         searchHistory.push(city);
//         localStorage.setItem("cities", JSON.stringify(searchHistory));
//         renderSearchHistory();
//     } else {
//         alert("Please Enter a Valid City Name");
//     }
// };