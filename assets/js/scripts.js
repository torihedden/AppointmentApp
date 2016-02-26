$(document).ready(function(){
  'use strict';

//code from http://jstricks.com/detect-mobile-devices-javascript-jquery/ --all code should be within this function
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  // tasks to do if it is a Mobile Device
  console.log("Mobile Detected");

}
var submitClick = 0;
$(".save-appt-btn").on("click", function(){
  submitClick += 1;
  // var title = $(".title-input").val();
  // var street = $(".street-input").val();
  // var city = $(".city-input").val();
  // var date = $(".date-input").val();
  // var time = $(".time-input").val();
  // var submit + submitClick = {title: $(".title-input").val(), street: $(".street-input").val(), city: $(".city-input").val(), date: $(".date-input").val(), time: $(".time-input").val()}
  // eval("submit" + sumbitClick )
  var apptInfo = {title: $(".title-input").val(), street: $(".street-input").val(), city: $(".city-input").val(), date: $(".date-input").val(), time: $(".time-input").val(), id: submitClick};
  console.log(apptInfo);
});

////this code sets an object into localStorage as a string and brings it back out and parses it as an object.  From http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
// Storage.prototype.setObject = function(key, value) {
//     this.setItem(key, JSON.stringify(value));
// }
//
// Storage.prototype.getObject = function(key) {
//     var value = this.getItem(key);
//     return value && JSON.parse(value);
// }
//
// var testObject1 = { 'one': 1, 'two': 2, 'three': 3 };
// var testObject2 = { 'one': 12, 'two': 22, 'three': 32 };
//
// localStorage.setItem('testObject1', JSON.stringify(testObject1));
// localStorage.setItem('testObject2', JSON.stringify(testObject2));
//
//
// var retrievedObject1 = localStorage.getItem('testObject1');
// var retrievedObject2 = localStorage.getItem('testObject2');
//
// console.log('retrievedObject: ', JSON.parse(retrievedObject1));
// console.log('retrievedObject: ', JSON.parse(retrievedObject2));
});//this closes the entire function
