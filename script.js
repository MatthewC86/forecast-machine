var city = "";

var currentDay = $('#current-day');
// $('#currentDay').text(dayjs().format('MMM DD, YYYY'));

var citySearch = document.getElementById("search-input");
var searchButton = document.getElementById("searched-city");
var currentCondition = document.getElementById("current-condition");
var currentTemp = document.getElementById("current-temp");
var currentHumidity = document.getElementById("current-hum");
var windSpeed = document.getElementById("current-wind");
var weatherConditionIcon = "";
var weatherConditionIconUrl = "";
var forecastEl = document.getElementById("forecast");

var apiKey = 'cf0b351b076cc017939d291aafeb2ff5';
var units = 'metric';
var input;

//this is beginning on load city info on button press
searchButton.addEventListener("click", function(e) {
    var city = citySearch.value;
    displayWeather(city);
})

function forecast(lat, long) {

    var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&APPID=" + apiKey + "&units=imperial";
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(data) {
        forecastEl.innerHtml = ""
       for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("15:00:00") > 0) {
            console.log(data.list[i]);
            var day = document.createElement("div")
            day.classList.add("row-2")

            var date = document.createElement("p")
            date.textContent = "" + data.list[i].dt_txt
            date.textContent = "" + data.list[i].dt_txt
            date.textContent = "" + data.list[i].dt_txt
            date.textContent = "" + data.list[i].dt_txt


            var temp = document.createElement("p")
            temp.textContent = "Temperature: " + data.list[i].main.temp
            temp.textContent = "Temperature: " + data.list[i].main.temp
            temp.textContent = "Temperature: " + data.list[i].main.temp
            temp.textContent = "Temperature: " + data.list[i].main.temp

            var wind = document.createElement("p")
            wind.textContent = "Wind: " + data.list[i].wind.speed
            wind.textContent = "Wind: " + data.list[i].wind.speed
            wind.textContent = "Wind: " + data.list[i].wind.speed
            wind.textContent = "Wind: " + data.list[i].wind.speed

            var hum = document.createElement("p")
            hum.textContent = "Humidity: " + data.list[i].main.humidity
            hum.textContent = "Humidity: " + data.list[i].main.humidity
            hum.textContent = "Humidity: " + data.list[i].main.humidity
            hum.textContent = "Humidity: " + data.list[i].main.humidity


            day.append(temp, hum, wind, date)
            forecastEl.append(day)

        }
       } 
    })
}



//alter API to display searched city info
function displayWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey + "&units=imperial";
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        currentTemp.textContent = "Temperature: " + data.main.temp
        currentHumidity.textContent = "Humidity: " + data.main.humidity
        windSpeed.textContent = "Wind Speed: " + data.wind.speed
        forecast(data.coord.lat, data.coord.lon)
    })
    
        // fetch('https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&exclude=current,minutely,hourly,alerts &lon={longitude}&&appid=${apiKey}').then(res => res.json()).then(data => {

        //     console.log(data)
        // })
    
    
    
}