var APIKey = "cf0b351b076cc017939d291aafeb2ff5"
var city = "";
var now = dayjs();
var currentDate = (now.format("MM/DD/YYYY"));
var citySearch = $("#search-input");
var searchButton = $("#searched-city");
var temp = "";
var humidityValue = "";
var windSpeed = "";
var weatherConditionIcon = "";
var weatherConditionIconUrl = "";

var url = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=cf0b351b076cc017939d291aafeb2ff5';
var apiKey = '&APPID=cf0b351b076cc017939d291aafeb2ff5';
var units = '&units=metric';
var input;

//this is beginning on load city info on button press

function setup() {
    var button = select('#submit');
        button.mousePressed(displayWeather);

        input = select('#searched-city');
}

//alter API to display searched city info
function displayWeather() {
    var url = api + input.value() + apiKey + units
    loadJSON(url, gotData);
}