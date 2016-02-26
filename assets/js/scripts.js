$(document).ready(function(){
  'use strict';

  var apptRetrieve;
  var apptInfo;
  var currentApptIndex;
//code from http://jstricks.com/detect-mobile-devices-javascript-jquery/ --all code should be within this function
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  // tasks to do if it is a Mobile Device
  console.log("Mobile Detected");

  //this section creates appt information from the new appt screen.
  $(".save-appt-btn").on("click", function(){

  var apptInfo = {title: $(".title-input").val(), street: $(".street-input").val(), city: $(".city-input").val(), date: $(".date-input").val(), time: $(".time-input").val()};//grab appt info

  function SaveDataToLocalStorage(data){
    var apptArray;
    //is anything in localstorage?
    if (localStorage.getItem('storage') === null) {
        apptArray = [];
    } else {
         // Parse the serialized data back into an array of objects
         apptArray = JSON.parse(localStorage.getItem('storage'));
     }
     // Push the new data (whether it be an object or anything else) onto the array
     apptArray.push(data);
     // Alert the array value
     console.log(apptArray);  // Should be something like [Object array]
     // Re-serialize the array back into a string and store it in localStorage
     localStorage.setItem('storage', JSON.stringify(apptArray));

    }

    SaveDataToLocalStorage(apptInfo);

  });  ////this code made with help from http://stackoverflow.com/questions/19174525/how-to-store-array-in-localstorage-object-in-html5 & http://stackoverflow.com/questions/20936466/cannot-push-objects-in-array-in-localstorage

  var storage = JSON.parse(localStorage["storage"]);//bring array out of localStorage

  console.log(storage[0].title);


for (var i = 0; i < storage.length; i++){
  $(".appt-info-block-wrapper").append(
    '<div class="appt-info-wrapper"><div class="weather-block"><div class="appt-time">' + storage[i].time + '</div></div><div class="appt-block"><div class="appt-title">' + storage[i].title + '</div><div class="appt-street">' + storage[i].street + '</div><div class="appt-city">' + storage[i].city + '</div><div class="appt-date">' + storage[i].date + '</div></div></div>'
  )
};
  // // this section deletes appt objects from the appt array
  // $(".delete-appt-btn").on("click", function(){
  //   apptArray = JSON.parse(localStorage["apptArray"]);//bring array out of localStorage
  //
  //
  // });//end of delete func
    //  localStorage.clear()

    // var splitCityState = storage[i].city.split(", ");
    //
    // var cityName = splitCityState[0];
    // var stateName = splitCityState[1];

    var cityName = "Durham"
    var stateName = "NC"

    $.getJSON("http://api.wunderground.com/api/b80f8aa82340bfd9/conditions/q/" + stateName + "/" + cityName + ".json", function(json) {

      switch(json.current_observation.weather) {
          case "Clear":
              $(".weather-block").append('<i class="fa fa-sun-o"></i>');
              break;
          case "Cloudy":
              $(".weather-block").append('<i class="fa fa-cloud-o"></i>');
              break;
          case "Partly Cloudy":
              $(".weather-block").append('<i class="fa fa-cloud-o"></i>');
              break;
          case "Rain":
              $(".weather-block").append('<i class="fa fa-umbrella-o"></i>');
          default:
              $(".weather-block").append(json.current_observation.weather);//default case is print string
      }
    });

}

});//this closes the entire function
