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
let imgEl = document.querySelector('img')

let headingDate = moment().subtract(10, 'days').calendar()

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
                })
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert('Unable to connect to openweathermap');
        });
};

// function getUVApi(data, uvIndex) {

//     // how to get the coordinates from the getApi function API and apply it here to this one call API?
//     let latitude = data.coord.lat
//     let longitude = data.coord.lon

//     let oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=7d3afb4e42d64b1033626322feda44f4";
    
//     fetch(oneCallUrl)
//     .then(function (response) {
//         if (response.ok) {
//             console.log(response)
//             response.json().then(function (data) {
//                 console.log(data)
//                 displayWeather(data, uvIndex)
//             })
//         } else {
//             alert('Error: ' + response.statusText)
//         }
//     })
//     .catch(function (error) {
//         alert('Unable to connect to openweathermap');
//     });
// }


function displayWeather (data, searchCity) {

    let iconCode = data.weather[0].icon
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    weatherIcon.setAttribute('src', iconUrl);

    cityName.textContent = searchCity + ' ' + '(' + headingDate + ')';
    temperature.textContent = 'Temperature: ' + data.main.temp + ' °F';
    humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
    windSpeed.textContent = 'Wind Speed: ' + data.wind.speed + ' MPH';
    uvIndex.textContent = 'UV Index: ';
}


// Make a form element in html and make it the parent, then replace cityInput element.
formElement.addEventListener('submit', formSubmitHandler)