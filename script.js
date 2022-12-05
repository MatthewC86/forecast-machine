var city = "";

var now = dayjs();
var currentDate = (now.format("MM/DD/YYYY"));
var todayDate = document.getElementById("today-date");
var citySearch = document.getElementById("search-input");
var cityName = document.getElementById("city-name")
var searchButton = document.getElementById("searched-city");
var searchHistory = document.getElementById("search-history");
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
    city = citySearch.value;
    displayWeather(city);
    setCityHistory(city);
})


    function setCityHistory(city) {
      let cities = []
      let oldCities = localStorage.getItem("weather-app") 
        if (oldCities == null) {
            cities.push(city)
            }
        else {
            oldCities = JSON.parse(oldCities)
            oldCities.push(city)
            cities = oldCities
        }
        localStorage.setItem("weather-app" ,JSON.stringify(cities))
        showCityHistory()
    }


    function showCityHistory() {
        let cities = localStorage.getItem("weather-app")
            if (cities != null) {
                cities = JSON.parse(cities)
                cities = cities.reverse()
            if (cities.length > 3) {
                cities = cities.slice(0, 3)
            }
        let layOut = ""
                cities.forEach(function(value){
                    layOut+= `<p onclick = "displayWeather('${value}')">${value}</p>`
                })
             searchHistory.innerHTML = layOut   
            }
    }

    showCityHistory()

function forecast(lat, long) {

    var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&APPID=" + apiKey + "&units=imperial";
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(data) {
        forecastEl.innerHTML = ""

console.log(forecastEl)
       for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("15:00:00") > 0) {
            console.log(data.list[i]);
            var day = document.createElement("div");
            
            
            
            day.classList.add("row")
            
            
            var weatherIcon = document.createElement("img");
            var date = document.createElement("h3");
            var temp = document.createElement("p");
            var wind = document.createElement("p");
            var hum = document.createElement("p");

            weatherIcon.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
            date.textContent = formatDate(data.list[i].dt_txt)
            temp.textContent = "Temperature: " + data.list[i].main.temp + " °F"
            wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH"
            hum.textContent = "Humidity: " + data.list[i].main.humidity + " %"
            
            day.append(date, weatherIcon, temp, hum, wind);
            
            forecastEl.append(day);
            

        }
       } 
    })
}
            function formatDate(date) {
                let alterDate = date.split(" ")
                let newDate = alterDate[0]
                let finalDate = newDate.split("-")
                
                return finalDate[1] + "/" + finalDate[2] + "/" + finalDate[0]

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
        // todayDate.innerHTML = finalDate
        cityName.textContent = city
        currentCondition.innerHTML = `<img src = "http://openweathermap.org/img/wn/${data.weather[0].icon}.png" />`
        currentTemp.textContent = "Temperature: " + data.main.temp + " °F"
        currentHumidity.textContent = "Humidity: " + data.main.humidity + " %"
        windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH"
        forecast(data.coord.lat, data.coord.lon)
    })
    
        // fetch('https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&exclude=current,minutely,hourly,alerts &lon={longitude}&&appid=${apiKey}').then(res => res.json()).then(data => {

        //     console.log(data)
        // })
    
    
    
}