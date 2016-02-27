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

  //this section creates appt information from the new appt screen.
  $(".save-appt-btn").on("click", function(){

  var apptInfo = {title: $(".title-input-na").val(), street: $(".street-input-na").val(), city: $(".city-input-na").val(), date: $(".date-input-na").val(), time: $(".time-input-na").val()};//grab appt info

  SaveDataToLocalStorage(apptInfo);

  });  ////this code made with help from http://stackoverflow.com/questions/19174525/how-to-store-array-in-localstorage-object-in-html5 & http://stackoverflow.com/questions/20936466/cannot-push-objects-in-array-in-localstorage

//this brings appt info out of local storage
  var storage;
  if (localStorage.getItem('storage') === null) {
    storage = [];
  } else{
    storage = JSON.parse(localStorage["storage"]);
  }


//this block'o'code populates index.html with appointemnts
for (var i = 0; i < storage.length; i++){
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
     localStorage.removeItem('storage');
     editArray.splice(index, num, data);

    localStorage.setItem('storage', JSON.stringify(editArray));
  }
};
//this saves edited data and moves back to the appt info screen on click
  $(".save-appt-btn-e").on("click", function(){
    var edited = {title: $(".title-input").val(), street: $(".street-input").val(), city: $(".city-input").val(), date: $(".date-input").val(), time: $(".time-input").val()};

    EditArrayInLocalStorage(clickedIndex, 1, edited);
  });
  // console.log(storage);




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

      // localStorage.clear();

}
});//this closes the entire function
