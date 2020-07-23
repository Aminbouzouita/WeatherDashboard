$(document).ready(function(){
  //get data from localstorage

  var savedcities = localStorage.getItem("savedcities");
  if(savedcities){
    savedcities = JSON.parse(savedcities);
  }
  else{
    savedcities=[];
    localStorage.setItem("savedcities",JSON.stringify(savedcities));
  }
    for(var  i = 0 ; i < savedcities.length; i++){
    var savedcity = savedcities[i];
    if(savedcity != ""){
    $(".history").append($("<button></button>").text(savedcity).addClass("newcity"));
  }}
   $("#searchbtn").on("click",function(event){
    event.preventDefault();
   var city = $("input").val().trim();
   var apikey = "e11b9a4682c5d6b835b8d20b205b4530";
   var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apikey;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function weather(response) {
      console.log(response);
    var currentday = $("#currentday").text(`(`+(response.list[0].dt_txt).slice(0,10).replace(`-`,`/`).replace(`-`,`/`) + `)`);
    $("#currentday").append(currentday);
    var cityname = $("#cityname").text(response.city.name);
    $("#cityname").append(cityname);
    var imgcode =$("#imgweather").attr("src",`http://openweathermap.org/img/wn/` + response.list[0].weather[0].icon + `@2x.png`);
    $("#imgweather").append(imgcode);
    var temperature = Math.round(((response.list[0].main.temp - 273.15) * 1.8) + 32) + '°F';
    temperature = $("#temperature").text(temperature);
    $("#temperature").append(temperature);
    var humidity = $("#humidity").text((response.list[0].main.humidity)+`%`);
    $("#humidity").append(humidity);
    var windspeed = $("#windspeed").text((response.list[0].wind.speed)+` mph`);
    $("#windspeed").append(windspeed);  
//5 days forecast 
    var forecasthour = 7;
    $(".forecast").each(function forecast(){
    var date=$(this).find(".date").text((response.list[forecasthour].dt_txt).slice(0,10).replace(`-`,`/`).replace(`-`,`/`))
    $(this).find(".date").append(date); 
    var img=$(this).find(".img").attr("src",`http://openweathermap.org/img/wn/` + response.list[forecasthour].weather[0].icon + `@2x.png`);
    $(this).find(".img").append(img);
    var temp=$(this).find(".temp").text(Math.round(((response.list[7].main.temp - 273.15) * 1.8) + 32) + '°F');
    $(this).find(".temp").append(temp);
    var humid=$(this).find(".humid").text((response.list[7].main.humidity)+`%`);
    $(this).find(".humid").append(humid);
    forecasthour = forecasthour + 8;
})

    //save data in localstorage
  var newcity=$(".history").append($("<button></button>").addClass("newcity").text(response.city.name));
  $(".newcity").each(function(){
  var savedcities = JSON.parse(localStorage.getItem("savedcities"));
  savedcities.push(city); 
  localStorage.setItem("savedcities",JSON.stringify(savedcities)); 
  })   })  
  /// buttons
  $(".newcity").on("click",function(){
    weather();
    
   
})
})
})
  