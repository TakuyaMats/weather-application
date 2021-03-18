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

    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`;

    fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {
                    console.log(data);
                })
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert('Unable to connect to openweathermap');
        });
};

getApi()

// convert Kelvin into fahrenheit.
// const kelvin = 293;
// //declaring and assigning celsius variable
// var celsius = kelvin - 273;
// console.log(celsius);
// var fahrenheit = Math.floor(celsius * (9/5) + 32);


// Make a form element in html and make it the parent, then replace cityInput element.
formElement.addEventListener('submit', formSubmitHandler)

for (var i = 0; i < data.length; i++) {
    var userName = document.createElement('h3');
    var issueTitle = document.createElement('h4');
    var issueBody = document.createElement('p');
    userName.textContent = data[i].user.login;
    issueTitle.textContent = data[i].title;
    issueBody.textContent = data[i].body;
    issueContainer.append(userName);
    issueContainer.append(issueTitle);
    issueContainer.append(issueBody);
}