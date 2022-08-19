////////////////    Variable declarations   //////////////////
// Get Dom elements
var rootEL = $("#root");
var dateEl = $("#currentDay");
var searchInput = $("#weatherSearch");
var searchBtn = $("#search")
var curWeatherData = $(".currentWeather")
var curIcon = $(".curWeatherIcon")
var forecastCard = $(".forecast")
var forecastIcon = $(".forecastIcon")
var newBtnParent = $(".search-history")



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
    var icon =`assets/icons/${data[0].weather.icon}.png`
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

  // Run function save city here to use name from api call
  saveCity(data[0].city_name);   
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

// Function for local storage
function saveCity(city){
  // console.log(city)
  // Save City name to local storage
  if(localStorage.getItem("city")===null){
    // create array to store objects
    var events=[];
    // get the text value inside of textarea
    var str = city;
    // create object of event data and index 
    // push city name into array
    events.push(str);
    // Save events array to local storage
    localStorage.setItem("city", JSON.stringify(events));
}else{
    // Pull array from local storage
    events = JSON.parse(localStorage.getItem("city"));
    // get the text value inside of textarea
    var str = city;
    // Check if city is already in array
    if(events.includes(city)){
      return;
    }else{
    // push city name into array
      events.push(str);
      // Save events array to local storage
      localStorage.setItem("city", JSON.stringify(events));
    }
}
// to display city in search history
  searchHistory()
}

// Function to create button element of cities that have been searched
function searchHistory(){
  if(localStorage.getItem("city")===null){
    return
  }
  else{
    // Pull array from local storage
    cityNames = JSON.parse(localStorage.getItem("city"));
    // Remove buttons from dom
    newBtnParent.empty();
    if (cityNames != null) {
      for (var i = 0; i < 5; i++) {
        if(cityNames[i] != null ){
          var newBtn = $("<button>")
          newBtn.attr("class", "btn btn-secondary fs-4 w-100 mt-3")
          newBtn.attr("id", i )
          newBtn.text(cityNames[i])
          newBtnParent.append(newBtn) 
        }
      }
    }
  }
}  

//////////////// Event Handlers     /////////////////////////////////////
// Event handler for search button 
searchBtn.on("click", function(){
    var str = searchInput.val().trim();
    getWeather(str);
    searchInput.val("");
});

// Event handler for history buttons
newBtnParent.on("click", function(e){
  if(e.target && e.target.matches("button.btn")){
    console.log("Button", e.target, "was pressed")
  }
})

////////////////    Function Execute at launch   ///////////////////////////// 
// Call setInterval method to display the time- call back function!!
setInterval(time,100)
// Call searchHistory function
searchHistory()
