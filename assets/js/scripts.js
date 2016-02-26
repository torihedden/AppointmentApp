$(document).ready(function(){
  'use strict';
  var apptArray = []
  var apptRetrieve
  var apptInfo
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
     apptArray = JSON.parse(localStorage["apptArray"]);
     console.log(apptArray);
  });  ////this code made with help from http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
}




});//this closes the entire function
