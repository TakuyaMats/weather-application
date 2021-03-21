let searchButton = document.getElementById('search-button');
let clearHistory = document.getElementById('clear-history');
let historyEl = document.querySelector('#search-history');
let cityInput = document.querySelector('#city-input');
let formElement = document.querySelector('#form-element');
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

let headingDate = moment().format('L');
let headingDate1 = moment().add(1, 'days').format('l');
let headingDate2 = moment().add(2, 'days').format('l');
let headingDate3 = moment().add(3, 'days').format('l');
let headingDate4 = moment().add(4, 'days').format('l');
let headingDate5 = moment().add(5, 'days').format('l');