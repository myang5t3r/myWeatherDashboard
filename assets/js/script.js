////////////////    Variable declarations   //////////////////
// Get Dom elements
var rootEL = $("#root");
var dateEl = $("#currentDay");
var searchInput = $("#weatherSearch");
var searchBtn = $("button")
var curWeatherData = $(".currentWeather")
var curIcon = $(".curWeatherIcon")
var forecastCard = $(".forecast")
var forecastIcon = $(".forecastIcon")

////////////////    Functions   /////////////////////////
// Function to display time
function time() {
    // call Date() method use options to display time
    var d = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',  minute:'numeric', second:'numeric'}
    timeNow = d.toLocaleDateString(undefined, options)
    dateEl.text(timeNow);
    // rootEL.append(dateEl)
}

// REST API call for current weather and forecast
function getWeather(str){
    // API Call for current weather
    var url1 = 'https://api.weatherbit.io/v2.0/current?city='+str+'&key=0e41fc349a61461fa2f60b6a3f8511d2'
    
    var url2 = 'https://api.weatherbit.io/v2.0/forecast/daily?city='+str+'&key=0e41fc349a61461fa2f60b6a3f8511d2' 

    // API Calls with catch block   
    $.get(url1, function(res){
        // console.log(data.data)
        popWeather(res.data)
      })
      .catch(e =>{
        console.log(e.status)
        alert(`API Error Status : ${e.status} - Try again`)
      })

      // API Calls with catch block   
    $.get(url2, function(res){
        popForecast(res.data)
      })
      .catch(e =>{
        console.log(e.status, "forcast call")
      })
}

// Function to display weather to html
function popWeather(data){
    // Convert C to F
    var tempF = (data[0].temp*9/5)+32;
    var date = data[0].datetime.slice(0,10);
    // Construct array of sting to insert into html
    var weatherArray = [
        `${data[0].city_name} ${date}`,
        `Temperature: ${tempF} F`,
        `Wind: ${data[0].wind_spd} m/s`,
        `Relative Humidity: ${data[0].rh} %`,
        `UV Index: ${data[0].uv}`
    ];

    // loop through array and insert into dom
    for (var i=0;i<weatherArray.length;i++){
        curWeatherData.eq(i).text(weatherArray[i]);
    }
    // Change image of weather icon
    var icon =`/assets/icons/${data[0].weather.icon}.png`
    curIcon.attr("src", icon)

    // Change uv index background color based on
    if(data[0].uv <=2){
      curWeatherData.eq(4).attr("style", "background-color: lightgreen");
    }else if(data[0].uv <=5){
      curWeatherData.eq(4).attr("style", "background-color: yellow");
    }else if(data[0].uv <=7){
      curWeatherData.eq(4).attr("style", "background-color: orange");
    }else if(data[0].uv <=7){
      curWeatherData.eq(4).attr("style", "background-color: red");
    } 
};

// Function to display forecast to html
function popForecast(data){
      // console.log(data);
      // Construct array of sting to insert into html
      var forecastArray = [
          `${data[0].datetime.slice(0,10)}`,
          `Temp: ${((data[0].temp*9/5)+32).toFixed(2)} F`,
          `Wind: ${data[0].wind_spd.toFixed(2)} m/s`,
          `Hum: ${data[0].rh} %`,
          `${data[1].datetime.slice(0,10)}`,
          `Temp: ${((data[1].temp*9/5)+32).toFixed(2)} F`,
          `Wind: ${data[1].wind_spd.toFixed(2)} m/s`,
          `Hum: ${data[1].rh} %`,
          `${data[2].datetime.slice(0,10)}`,
          `Temp: ${((data[2].temp*9/5)+32).toFixed(2)} F`,
          `Wind: ${data[2].wind_spd.toFixed(2)} m/s`,
          `Hum: ${data[2].rh} %`,
          `${data[3].datetime.slice(0,10)}`,
          `Temp: ${((data[3].temp*9/5)+32).toFixed(2)} F`,
          `Wind: ${data[3].wind_spd.toFixed(2)} m/s`,
          `Hum: ${data[3].rh} %`,
          `${data[4].datetime.slice(0,10)}`,
          `Temp: ${((data[4].temp*9/5)+32).toFixed(2)} F`,
          `Wind: ${data[4].wind_spd.toFixed(2)} m/s`,
          `Hum: ${data[4].rh} %`
      ];
  
      // loop through array and insert into dom
      // console.log(forecastCard)
      for (var i=0;i<forecastArray.length;i++){
        forecastCard.eq(i).text(forecastArray[i]);
      }
      // Change image of weather icon
      for (var i =0; i<5;i++){
        var icon =`assets/icons/${data[i].weather.icon}.png`
        forecastIcon.eq(i).attr("src", icon)
      }

}


//////////////// Event Handlers     /////////////////////////////////////
// Event handler for search button 
searchBtn.on("click", function(){
    var str = searchInput.val().trim();
    searchInput.val("")
    getWeather(str)
});

////////////////    Function Execute at launch   ///////////////////////////// 
// Call setInterval method to display the time- call back function!!
setInterval(time,100)
// getWeather()