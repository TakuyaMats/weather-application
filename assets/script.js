function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=40.850922&lon=-73.973412&exclude=hourly,daily&appid=7d3afb4e42d64b1033626322feda44f4';

    console.log(requestUrl)

    // fetch(requestUrl)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         for (var i = 0; i < data.length; i++) {
    //             var listItem = document.createElement('li');
    //             listItem.textContent = data[i].html_url;
    //             repoList.appendChild(listItem);
    //         }
    //     });
}

getApi()

// fetchButton.addEventListener('click', getApi);