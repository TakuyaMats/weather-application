let formSubmitHandler = function (event) {

    event.preventDefault();

    console.log(event.target)

    let city = cityInput.value.trim();

    if (city) {
        getApi(city);

        cityName.textContent = '';
        cityInput.value = '';

    };

    historyButton(city)
    let userInputLocalStorage = localStorage.getItem('cities') || [];

    if (userInputLocalStorage.length > 0) {
        userInputLocalStorage = JSON.parse(userInputLocalStorage)
    }
    userInputLocalStorage.push(city)
    let stringifyCity = JSON.stringify(userInputLocalStorage)
    localStorage.setItem("cities", stringifyCity)
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

function historyButton(city) {

    if (userInputLocalStorage.length === 6) {
        userInputLocalStorage.shift();
    }

    let cityButton = document.createElement('button');
    cityButton.textContent = city;
    cityButton.setAttribute('class', "city-btn")
    cityButton.setAttribute('class', "form-control bg-primary text-white");
    historyEl.appendChild(cityButton);
    cityButton.addEventListener('click', function (e) {
        let newButton = this.textContent
        getApi(newButton)
        e.stopPropagation();
        e.preventDefault();
    })
}

let userInputLocalStorage = localStorage.getItem('cities');
userInputLocalStorage = JSON.parse(userInputLocalStorage) || [];

for (i = 0; i < userInputLocalStorage.length; i++) {
    historyButton(userInputLocalStorage[i])
}

function removeItem (event) {
    this.parentNode.childNodes[7].remove(event)
    localStorage.clear()
    location.reload()
}


clearHistory.addEventListener('click', removeItem);
formElement.addEventListener('submit', formSubmitHandler);