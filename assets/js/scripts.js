$(document).ready(function(){
  'use strict';

//code from http://jstricks.com/detect-mobile-devices-javascript-jquery/ --all code should be within this function
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  // tasks to do if it is a Mobile Device
  console.log("Mobile Detected");

}
var submitClick = 0;
var apptRetrieve
$(".save-appt-btn").on("click", function(){
  submitClick += 1;
  ////this code sets an object into localStorage as a string and brings it back out and parses it as an object.  From http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
  var apptInfo = {title: $(".title-input").val(), street: $(".street-input").val(), city: $(".city-input").val(), date: $(".date-input").val(), time: $(".time-input").val(), id: submitClick};
  console.log(apptInfo);
   localStorage.setItem('apptInfo', JSON.stringify(apptInfo));
   var apptRetrieve = localStorage.getItem('apptInfo');

   console.log(apptRetrieve = localStorage.getItem('apptInfo'));
   console.log('apptRetrieve: ', JSON.parse(apptRetrieve));
});


});//this closes the entire function
