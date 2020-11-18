//////////////////////////////////////////// Select Dom Values For Inputs

var city = document.getElementById("city-input");
var inputBtn = document.getElementById("submit");

////////////////////////////////////////////Clear Field For City Input

function clearForms() {
  $(":input")
    .not(":button, :submit, :reset, :hidden, :checkbox, :radio")
    .val("");
  $(":checkbox, :radio").prop("checked", false);
}

//////////////////////////////////////////// Function for button, once clicked retreive information from api

inputBtn.onclick = function() {
  newValue = city.value;
  //console.log(newValue);

  var newLink = `http://api.openweathermap.org/data/2.5/weather?q=${newValue}&APPID=837725065f7eeeb46f53970402d74a7e&units=metric`;
  //console.log(newLink);

  //////////////////////////////////////////// Function to retreive the information from the API response

  $.getJSON(newLink, function(data) {
    //console.log(data);
    clearForms();

    var country = data.sys.country;
    var sunrise = data.sys.sunrise;
    var sunset = data.sys.sunset;
    var icon =
      "http://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var weatherDescription = data.weather[0].description;
    var temp = data.main.temp;
    var feelsTemp = data.main.feels_like;
    var tempMax = data.main.temp_max;
    var tempMin = data.main.temp_min;
    var humidity = data.main.humidity;
    var pressure = data.main.pressure;
    var windSpeed = data.wind.speed;
    var city = data.name;

    //////////////////////////////////////////// Add the information from the api to the DOM elements based on ID

    $(".country")
      .empty()
      .append("Country: " + country);
    $(".city")
      .empty()
      .append("City: " + city);
    $(".icon")
      .empty()
      .attr("src", icon);
    $(".description")
      .empty()
      .append(`Sky description: <br> ${weatherDescription}`);
    $(".sunrise")
      .empty()
      .append("Sun rises at: " + sunrise);
    $(".sunset")
      .empty()
      .append("Sun sets at: " + sunset);
    $(".temp")
      .empty()
      .append(`The temperature: ${temp}&#8451;`);
    $(".tempFeels")
      .empty()
      .append(`Feels like ${feelsTemp}&#8451;`);
    $(".tempMax")
      .empty()
      .append(`Maximum temperature will be ${tempMax}&#8451;`);
    $(".tempMin")
      .empty()
      .append(`Minimum temperature will be ${tempMin}&#8451;`);
    $(".windSpeed")
      .empty()
      .append(`The wind speed is ${windSpeed} m/s`);
    $(".pressure")
      .empty()
      .append(`Pressure is ${pressure} Pa`);
    $(".humidity")
      .empty()
      .append(`Humidity is ${humidity} RH`);
  });
};

//////////////////////////////////////////// Get Date (works only locally)

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newdate = year + "/" + month + "/" + day;

document.getElementById("date").innerHTML = newdate;

//////////////////////////////////////////// Change CSS styles for night and day (Improvement can be made by setting time
////////////////////////////////////////////interval to reload this function so it will be up to date)

function getStylesheet() {
  var currentTime = new Date().getHours();
  //var currentTime = 17;

  //console.log(currentTime);
  if (
    (currentTime > 18 && currentTime <= 23) ||
    (currentTime > 6 && currentTime <= 0)
  ) {
    //console.log("This is night");
    var night1 = document.getElementById("city-input");
    night1.classList.toggle("night1");
    var night2 = document.getElementById("submit");
    night2.classList.toggle("night1");
    var nightImg1 = document.getElementById("container");
    nightImg1.classList.toggle("night");
  }
  if (currentTime >= 6 && currentTime <= 17) {
    //console.log("This is day");
    var day1 = document.getElementById("city-input");
    day1.classList.toggle("day1");
    var day2 = document.getElementById("submit");
    day2.classList.toggle("day1");
    var dayImg1 = document.getElementById("container");
    dayImg1.classList.toggle("day");
  }
}
getStylesheet();
