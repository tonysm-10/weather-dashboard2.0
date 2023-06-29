//date
var today = $('#date')
date = dayjs()
today.text(date.format('MM/DD/YYYY'))

// City input and search button 
var cityInput = $('#cityInput')
var searchBtn = $('#searchBtn')


searchBtn.on('click', function() {
  var cityName = cityInput.val();

  cityhistoryLocalStorage(cityName)
  getCurrentWeather(cityName, function(data) {
    // Do something with the weather data
  });
});

  function displayCityInfo(cityName, data) {
    city.text(cityName.toUpperCase());
    updateWeatherData(data);
  }



// grid container Two City (temp, wind, humidty)
var city = $('#city')
var temperature = $('#temp')
var wind = $('#wind')
var humidity = $('#humidity')

// City History 
var cityHistory = $('#cityHistory')
var historyBtn = $('#historyBtn')

var searchCities = []

function cityhistoryLocalStorage(history) {
  searchCities.push(history)
localStorage.setItem('UserInput', JSON.stringify(searchCities)) 
}

historyBtn.on('click', displayCityHistory)

function displayCityHistory() {
 var savedStorage = JSON.parse(localStorage.getItem('UserInput'))
for (let index = 0; index < savedStorage.length; index++) {
  const element = savedStorage[index];
  cityHistory.append("<button>" + element + "</button>")
}


}



         //////// Five Day forecast ////////////
var fiveForecast = $('#fiveDayForecast')

function getFiveDayForecast(longitude, latitude) {
  var apiKey = '4c83d66135f28f1b211c3a2e9338ac0e'
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey;
  
    $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
         var temperatureOne = data.list[1].main.temp
         var humidityOne = data.list[1].main.humidity
         var windSpeedOne = data.list[1].wind.speed
         
        
  console.log(data)
      getDayOne(temperatureOne, humidityOne, windSpeedOne)
      getDayTwo(data)
      getDayThree(data)
      getDayFour(data)
      getDayFive(data)
      displayDates(data)
      console.log(data.list[1].dt_txt)
      // getDayFive(data)
        // process the returned forecast data here
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus + ': ' + errorThrown);
      }
    });
  }

  function getDayOne(temperature, humidity, windSpeed) {
    var tempOne = $('#tempOne')
    var humidOne = $('#humidOne')
    var windOne = $('#windOne')
    temper = Math.round(temperature - 273.15)
    tempOne.text('🌡️ Temperature: ' + temper + ' °C')
    humidOne.text('💦 Humidity: ' + humidity + "%")
    windOne.text('🌬️ Wind Speed: ' + windSpeed + " m/s")
  }
  function getDayTwo(data) {
        var temperature = data.list[9].main.temp
         var humidity = data.list[9].main.humidity
         var windSpeed = data.list[9].wind.speed
         var tempTwo = $('#tempTwo')
         var humidTwo= $('#humidTwo')
         var windTwo = $('#windTwo')
         temperature = Math.round(temperature - 273.15)
         tempTwo.text('🌡️ Temperature: ' + temperature + ' °C')
         humidTwo.text('💦 Humidity: ' + humidity + "%")
         windTwo.text('🌬️ Wind Speed: ' + windSpeed + " m/s")
  }
  
  function getDayThree(data) {
    var temperature = data.list[17].main.temp
    var humidity = data.list[17].main.humidity
    var windSpeed = data.list[17].wind.speed
    var tempThree = $('#tempThree')
    var humidThree= $('#humidThree')
    var windThree = $('#windThree')
    temperature = Math.round(temperature - 273.15)
    tempThree.text('🌡️ Temperature: ' + temperature + ' °C')
    humidThree.text('💦 Humidity: ' + humidity + "%")
    windThree.text('🌬️ Wind Speed: ' + windSpeed + " m/s")
  }
  
  
  function getDayFour(data) {
    var temperature = data.list[25].main.temp
    var humidity = data.list[25].main.humidity
    var windSpeed = data.list[25].wind.speed
    var tempFour = $('#tempFour')
    var humidFour= $('#humidFour')
    var windFour = $('#windFour')
    temperature = Math.round(temperature - 273.15)
    tempFour.text('🌡️ Temperature: ' + temperature + ' °C')
    humidFour.text('💦 Humidity: ' + humidity + "%")
    windFour.text('🌬️ Wind Speed: ' + windSpeed + " m/s")
  }
  
  function getDayFive(data) {
    var temperature = data.list[33].main.temp
    var humidity = data.list[33].main.humidity
    var windSpeed = data.list[33].wind.speed
    var tempFive = $('#tempFive')
    var humidFive= $('#humidFive')
    var windFive = $('#windFive')
    temperature = Math.round(temperature - 273.15)
    tempFive.text('🌡️ Temperature: ' + temperature + ' °C')
    humidFive.text('💦 Humidity: ' + humidity + "%")
    windFive.text('🌬️ Wind Speed: ' + windSpeed + " m/s")
  }


// API key for OpenWeatherMap
var apiKey = '4c83d66135f28f1b211c3a2e9338ac0e'

function getCurrentWeather(cityName, callback) {
  // API call URL for current weather data
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey;

  // Make API call to OpenWeatherMap
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function(data) {
      console.log(data);
     
      callback(data);

  var lon = data.coord.lon
  var lat = data.coord.lat
  

    getFiveDayForecast(lon, lat)
    displayCityInfo(cityName, data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + ": " + errorThrown);
    }
  });
  
}
//////// Display weather For first day ///////
  function updateWeatherData(data) {
    // Get and display temperature
    var temp = data.main.temp;
    temp = Math.round(temp)
    temperature.text("🌡️ Temperature: " + temp + " °C");
  
    // Get and display humidity
    var humid = data.main.humidity;
    humidity.text("💦 Humidity: " + humid + "%");
  
    // Get and display wind speed
    var windSpeed = data.wind.speed;
    wind.text("🌬️ Wind Speed: " + windSpeed + " m/s");

    
  }

  //display dates section 
  function displayDates(data) {
    var dateOne = $('#dateOne')
    var dateTwo = $('#dateTwo')
    var dateThree = $('#dateThree')
    var dateFour = $('#dateFour')
    var dateFive = $('#dateFive')

    dateOne.text(data.list[1].dt_txt)
    dateTwo.text(data.list[9].dt_txt)
    dateThree.text(data.list[17].dt_txt)
    dateFour.text(data.list[25].dt_txt)
    dateFive.text(data.list[33].dt_txt)
    
  }
