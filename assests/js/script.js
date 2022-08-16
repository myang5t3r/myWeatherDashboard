////////////////    Variable declarations   //////////////////
// Get Dom elements
var rootEL = $("#root");
var dateEl = $("#currentDay");
var searchInput = $("#weatherSearch");
var searchBtn = $("button")


////////////////    Functions   /////////////////////////
// Function to display time
function time() {
    // call Date() method use options to display time
    var d = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',  minute:'numeric', second:'numeric'}
    timeNow = d.toLocaleDateString(undefined, options)
    dateEl.text(timeNow);
    rootEL.append(dateEl)
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
        // popForecast(res.data)
      })
      .catch(e =>{
        console.log(e.status)
        alert(`API Error Status : ${e.status} - Try again`)
      })
}


// Function to display weather to html
function popWeather(data){
    console.log(data[0].city_name)
}

// Function to display forecast to html
function popForcast(data){

}

//////////////// Event Handlers     /////////////////////////////////////
// Event handler for search button 
searchBtn.on("click", function(){
    var str = searchInput.val().trim();
    getWeather(str)
});

////////////////    Function Execute at launch   ///////////////////////////// 
// Call setInterval method to display the time- call back function!!
setInterval(time,100)
// getWeather()