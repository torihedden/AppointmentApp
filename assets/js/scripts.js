$(document).ready(function(){
  'use strict';

  var apptRetrieve;
  var apptInfo;
  var currentApptIndex;

//code from http://jstricks.com/detect-mobile-devices-javascript-jquery/ --all code should be within this function
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  // tasks to do if it is a Mobile Device
  console.log("Mobile Detected");
  //this function saves arrays of objects to localStorage
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
     localStorage.removeItem('storage');
     localStorage.setItem('storage', JSON.stringify(apptArray));

    }

  //this section sanitizes user input for city, state, date, and time.

  $(".city-input-na").blur(function splitCity(){
    var cityStateNA = $(".city-input-na").val()
    if(cityStateNA.indexOf(',') != -1){
      var splitCityStateNA =cityStateNA.split(", ")
      var cityNameNA = splitCityStateNA[0];
      var stateNameNA = splitCityStateNA[1];
    } else{
        alert("Please Input the city, followed by a comma, followed by a two-letter state abbreviation.  i.e. 'City, St' or 'Durham, NC' ");
    }

    var splitCityStateNA =cityStateNA.split(", ")

    if(stateNameNA.length != 2 ){
      alert("Please Input the city, followed by a comma, followed by a two-letter state abbreviation.  i.e. 'City, St' or 'Durham, NC' ");
    }
  });

  $(".city-input").blur(function splitCity(){
    var cityStateEA = $(".city-input").val()
    if(cityStateEA.indexOf(',') != -1){
      var splitCityStateEA =cityStateEA.split(", ")
      var cityNameEA = splitCityStateEA[0];
      var stateNameEA = splitCityStateEA[1];
    } else{
        alert("Please Input the city, followed by a comma, followed by a two-letter state abbreviation.  i.e. 'City, St' or 'Durham, NC' ");
    }

    if(stateNameEA.length != 2 ){
      alert("Please Input the city, followed by a comma, followed by a two-letter state abbreviation.  i.e. 'City, St' or 'Durham, NC' ");
    }
  });


  $('.date-input').pickadate({
  format: 'mm/dd/yyyy'});
  $(".time-input").pickatime({
  format: 'HH:i'});

  $(".date-input-na").pickadate({
  format: 'mm/dd/yyyy'});
  $(".time-input-na").pickatime({
  format: 'HH:i'});





  //this section creates appt information from the new appt screen.
  $(".save-appt-btn").on("click", function(){

  var apptInfo = {title: $(".title-input-na").val(), street: $(".street-input-na").val(), city: $(".city-input-na").val(), date: $(".date-input-na").val(), time: $(".time-input-na").val()};//grab appt info

  SaveDataToLocalStorage(apptInfo);

  });  ////this code made with help from http://stackoverflow.com/questions/19174525/how-to-store-array-in-localstorage-object-in-html5 & http://stackoverflow.com/questions/20936466/cannot-push-objects-in-array-in-localstorage

//this brings appt info out of local storage and sorts objects by date and time and then appends them and then puts the sorted array back in local storage
  var storage;
  if (localStorage.getItem('storage') === null) {
    storage = [];
  } else{
    storage = JSON.parse(localStorage.getItem('storage'));
    /*** Copyright 2013 Teun Duynstee Licensed under the Apache License, Version 2.0 ***/
    var firstBy=function(){function n(n,t){if("function"!=typeof n){var r=n;n=function(n,t){return n[r]<t[r]?-1:n[r]>t[r]?1:0}}return-1===t?function(t,r){return-n(t,r)}:n}function t(t,u){return t=n(t,u),t.thenBy=r,t}function r(r,u){var f=this;return r=n(r,u),t(function(n,t){return f(n,t)||r(n,t)})}return t}();


   var sort = firstBy(function(v1, v2){return v1.date < v2.date ? -1 : (v1.date > v2.date ? 1 : 0); }).thenBy(function(v1, v2){return v1.time < v2.time ? -1 : (v1.time > v2.time ? 1 : 0); });
   storage.sort(sort);
   localStorage.setItem('storage', JSON.stringify(storage));
   output();
  }





console.log(oneWeekAgo);


// .toLocaleDateString('en-US')
// console.log(todaysDate);

var currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit'});





//this block'o'code populates index.html with appointments, after deleting any appts older than 7 days,
function output(){
for (var i = 0; i < storage.length; i++){

  var oneWeekAgo = moment().subtract(7,'d').format('MM/DD/YYYY');
  var hourAgo = moment().subtract(1,'hour').format('h:mm');


  $(".appt-info-block-wrapper").append(
    '<a href="appt-detail.html"><div class="appt-info-wrapper" id='+[i]+'><div class="weather-block"><div class="appt-time">' + storage[i].time + '</div></div><div class="appt-block"><div class="appt-title">' + storage[i].title + '</div><div class="appt-street">' + storage[i].street + '</div><div class="appt-city">' + storage[i].city + '</div><div class="appt-date">' + storage[i].date + '</div></div></div></a>')


};

  //this finds which appt was clicked on index.html
  $(".appt-info-wrapper").click(function() {
     var clickedIndex = $(this).attr('id');
     localStorage.setItem('clickedIndex', clickedIndex);
  });

//this section migrates a clicked appt on index.html to appt-detail.html
  var clickedIndex = localStorage.getItem('clickedIndex');
  console.log(clickedIndex);
  $(".title-txt").append(storage[clickedIndex].title);
  $(".date-ad").append("Today at </br>"+ storage[clickedIndex].date);
  $(".time-ad").append(storage[clickedIndex].time);
  $(".location-ad").append("Located at </br>"+ storage[clickedIndex].street + ", "+storage[clickedIndex].city);

  var splitCity = (storage[clickedIndex].city).split(", ");
  console.log(splitCity);

  var detailCity = splitCity[0]
  var detailState = splitCity[1]

  $.getJSON("http://api.wunderground.com/api/b80f8aa82340bfd9/conditions/q/" + detailState + "/" + detailCity + ".json", function(json) {

    console.log(detailCity);
    console.log(detailState);

    switch(json.current_observation.weather) {
      case "Clear":
          $(".weather-summary").append('<i class="fa fa-sun-o"></i>');
          break;
      case "Scattered Clouds":
          $(".weather-summary").append('<i class="fa fa-cloud-o"></i>');
          break;
      case "Rain Showers":
        $(".weather-summary").append('<i class="fa fa-umbrella-o"></i>');
        break;
      case "Freezing Rain":
        $(".weather-summary").append('<i class="fa fa-tint"></i>');//this looks like a raindrop
        break;
      case "Heavy Snow":
        $(".weather-summary").append('<i class="fa fa-asterisk"></i>');
        break;
      case "Heavy Thunderstorm":
        $(".weather-summary").append('<i class="fa fa-bolt"></i>');
        break;
      default:
          $(".weather-summary").append(json.current_observation.weather);//default case is print string

    }
  });

//this section migrates a clicked appt on index.html to edit-appt.html
  $(".street-input").val($(".street-input").val()+storage[clickedIndex].street);
  $(".city-input").val($(".city-input").val()+storage[clickedIndex].city);
  $(".date-input").val($(".date-input").val()+storage[clickedIndex].date);
  $(".time-input").val($(".time-input").val()+storage[clickedIndex].time);
  $(".title-input").val($(".title-input").val()+storage[clickedIndex].title);


  // this section deletes appt objects from the appt array
  function DeleteDatatFromLocalStorage(index, num){
    var deleteArray;
    if (localStorage.getItem('storage') === null) {
        deleteArray = [];
    } else {
    deleteArray = JSON.parse(localStorage.getItem('storage'));
    deleteArray.splice(index, num);
    localStorage.removeItem('storage');
    localStorage.setItem('storage', JSON.stringify(deleteArray));
  }
};

  $(".delete-appt-btn").on("click", function(){
  DeleteDatatFromLocalStorage(clickedIndex, 1);
  });//end of delete func


  //this section updates values edited on edit-appt.html
  function EditArrayInLocalStorage(index, num, data){
    var editArray;
    if (localStorage.getItem('storage') === null) {
        editArray = [];
    } else {
     editArray = JSON.parse(localStorage.getItem('storage'));

     editArray.splice(index, num, data);
     localStorage.removeItem('storage');
    localStorage.setItem('storage', JSON.stringify(editArray));
  }
};
//this saves edited data and moves back to the appt info screen on click
  $(".save-appt-btn-e").on("click", function(){
    var edited = {title: $(".title-input").val(), street: $(".street-input").val(), city: $(".city-input").val(), date: $(".date-input").val(), time: $(".time-input").val()};

    EditArrayInLocalStorage(clickedIndex, 1, edited);
  });
  // console.log(storage);



    var splitCityState = (storage[clickedIndex].city).split(", ");

    var cityName = splitCityState[0];
    var stateName = splitCityState[1];


    $.getJSON("http://api.wunderground.com/api/b80f8aa82340bfd9/conditions/q/" + stateName + "/" + cityName + ".json", function(json) {

      switch(json.current_observation.weather) {
        case "Clear":
            $(".weather-block").append('<i class="fa fa-sun-o"></i>');
            break;
        // case "Overcast":
        // case "Cloudy":
        // case "Partly Cloudy":
        // case "Mostly Cloudy":
        case "Scattered Clouds":
            $(".weather-block").append('<i class="fa fa-cloud-o"></i>');
            break;
        // case "Rain":
        // case "Light Rain":
        // case "Heavy Rain":
        // case "Light Rain Showers":
        // case "Heavy Rain Showers":
        case "Rain Showers":
          $(".weather-block").append('<i class="fa fa-umbrella-o"></i>');
          break;
        // case "Drizzle":
        // case "Light Drizzle":
        // case "Heavy Drizzle":
        // case "Light Freezing Rain":
        // case "Heavy Freezing Rain":
        case "Freezing Rain":
          $(".weather-block").append('<i class="fa fa-tint"></i>');//this looks like a raindrop
          break;
        // case "Snow":
        // case "Light Snow":
        case "Heavy Snow":
          $(".weather-block").append('<i class="fa fa-asterisk"></i>');
          break;
        // case "Thunderstorm":
        // case "Light Thunderstorm":
        case "Heavy Thunderstorm":
          $(".weather-block").append('<i class="fa fa-bolt"></i>');
          break;
        default:
            $(".weather-block").append(json.current_observation.weather);//default case is print string

      }
    });

    //this adds the location map to the detailed view if location is in city, state format
    $(".maps").append(
      '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + cityName + ',' + stateName + '&zoom=14&size=400x200&key=AIzaSyB76RrlbvbkCXkPOgP8puUTvHDDFeZsIpA" alt="Appointment location" width="90%"></img>'
    )}
  //    else {
  // $("header").toggle();
  // $("input").toggle();
  // console.log("Please use your mobile device!!")
  // $("body").append('<div class = "no-mobile">Please use your mobile device to access this app.</div><img class = "mobile-phone" src = "assets/img/sadPhone.png"></img>')
}
});//this closes the entire function
