var city = "";

//var currentDate = (now.format("MM/DD/YYYY"));
var citySearch = document.getElementById("#search-input");
var searchButton = document.getElementById("#searched-city");
var currentCondition = document.getElementById("current-condition");
var currentTemp = document.getElementById("current-temp");
var humidityValue = document.getElementById("current-hum");
var windSpeed = document.getElementById("current-wind");
var weatherConditionIcon = "";
var weatherConditionIconUrl = "";


var apiKey = 'cf0b351b076cc017939d291aafeb2ff5';
var units = 'metric';
var input;



//this is beginning on load city info on button press

function setup() {
    var button = select('#submit');
        button.mousePressed(displayWeather);

        input = select('#searched-city');
}
displayWeather()
//alter API to display searched city info
function displayWeather() {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey + "&units=imperial";
    navigator.geolocation.getCurrentPosition((getPosition) => {

        let {latitude, longitude } = getPosition.coords;
    
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&exclude=current,minutely,hourly,alerts &lon={longitude}&&appid=${apiKey}').then(res => res.json()).then(data => {

            console.log(data)
        })
    
    })
    var url = api + input.value() + apiKey + units
    loadJSON(url, gotData);
}