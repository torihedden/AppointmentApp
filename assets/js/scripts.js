$(document).ready(function(){
  'use strict';

//code from http://jstricks.com/detect-mobile-devices-javascript-jquery/ --all code should be within this function
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  // tasks to do if it is a Mobile Device
  console.log("Mobile Detected");

}
var apptArray = []
var apptRetrieve
var apptInfo
$(".save-appt-btn").on("click", function(){
apptArray = JSON.parse(localStorage["apptArray"]);
function pushAppt(appt){
  apptArray.push(appt);
}
  var apptInfo = {title: $(".title-input").val(), street: $(".street-input").val(), city: $(".city-input").val(), date: $(".date-input").val(), time: $(".time-input").val()};

  pushAppt(apptInfo);
  console.log(apptArray);
    ////this code sets an object into localStorage as a string and brings it back out and parses it as an object.  From http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
   localStorage.setItem('apptArray', JSON.stringify(apptArray));
   apptArray = JSON.parse(localStorage["apptArray"]);
   console.log(apptArray);
});
// console.log(apptArray);


});//this closes the entire function
