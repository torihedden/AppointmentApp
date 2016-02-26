$(document).ready(function(){
  'use strict';
  var apptArray = []
  var apptRetrieve
  var apptInfo
  localStorage.setItem('apptArray', JSON.stringify(apptArray));
//code from http://jstricks.com/detect-mobile-devices-javascript-jquery/ --all code should be within this function
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  // tasks to do if it is a Mobile Device
  console.log("Mobile Detected");
  //this section creates appt information from the new appt screen.
  $(".save-appt-btn").on("click", function(){

    apptArray = JSON.parse(localStorage["apptArray"]);//bring array out of localStorage

    function pushAppt(appt){
    apptArray.push(appt);
  }//func to push appt info to array

    var apptInfo = {title: $(".title-input").val(), street: $(".street-input").val(), city: $(".city-input").val(), date: $(".date-input").val(), time: $(".time-input").val()};//grab appt info

    pushAppt(apptInfo);//push appt info into array

     localStorage.setItem('apptArray', JSON.stringify(apptArray));
     apptArray = JSON.parse(localStorage["apptArray"]);//puts this back in local storage
     console.log(apptArray);
  });  ////this code made with help from http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage

//adding appts to your front page
apptArray = JSON.parse(localStorage["apptArray"]);//pulls array out of local storage

console.log(apptArray + "hi this is your javascript");

// for (var i = 0; i < 5; i++){
//   $(".appt-block").html(apptArray[i])
// }

var cityName = "Atlanta"
var stateName = "GA"

$.getJSON("http://api.wunderground.com/api/b80f8aa82340bfd9/conditions/q/" + stateName + "/" + cityName + ".json", function(json) {
  $(".weather-block").html(json.current_observation.weather);
});

<i class="fa fa-sun-o"></i>
<i class="fa fa-cloud"></i>
<i class="fa fa-umbrella"></i>

}//this closes mobile test if true




});//this closes the entire function
