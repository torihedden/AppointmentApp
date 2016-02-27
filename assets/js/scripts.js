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

  var apptInfo = {title: $(".title-input-na").val(), street: $(".street-input-na").val(), city: $(".city-input-na").val(), date: $(".date-input-na").val(), time: $(".time-input-na").val()};//grab appt info

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

  // console.log(storage[0].title);
  // localStorage.clear();

//this block'o'code populates index.html with appointments
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
  // $(".delete-appt-btn").on("click", function(){
  //   storage[clickedIndex].remove();


  // });//end of delete func

  //this section updates values edited on edit-appt.html
  // $(".save-appt-btn").on("click", function(){
  //   storage[clickedIndex] = {title: $(".title-input").val(), street: $(".street-input").val(), city: $(".city-input").val(), date: $(".date-input").val(), time: $(".time-input").val()};
  // })

  console.log(storage);

    var splitCityState = (storage[clickedIndex].city).split(", ");

    var cityName = splitCityState[0];
    var stateName = splitCityState[1];


    // $.getJSON("http://api.wunderground.com/api/b80f8aa82340bfd9/conditions/q/" + stateName + "/" + cityName + ".json", function(json) {
    //
    //   switch(json.current_observation.weather) {
    //     case "Clear":
    //         $(".weather-block").append(<i class="fa fa-sun-o"></i>);
    //         break;
    //     case "Overcast":
    //     case "Cloudy":
    //     case "Partly Cloudy":
    //     case "Mostly Cloudy":
    //     case "Scattered Clouds":
    //         $(".weather-block").append(<i class="fa fa-cloud-o"></i>);
    //         break;
    //     case "Rain":
    //     case "Light Rain":
    //     case "Heavy Rain":
    //     case "Light Rain Showers":
    //     case "Heavy Rain Showers":
    //     case "Rain Showers":
    //       $(".weather-block").append(<i class="fa fa-umbrella-o"></i>);
    //       break;
    //     case "Drizzle":
    //     case "Light Drizzle":
    //     case "Heavy Drizzle":
    //     case "Light Freezing Rain":
    //     case "Heavy Freezing Rain":
    //     case "Freezing Rain":
    //       $(".weather-block").append(<i class="fa fa-tint"></i>);//this looks like a raindrop
    //       break;
    //     case "Snow":
    //     case "Light Snow":
    //     case "Heavy Snow":
    //       $(".weather-block").append(<i class="fa fa-asterisk"></i>);
    //       break;
    //     case "Thunderstorm":
    //     case "Light Thunderstorm":
    //     case "Heavy Thunderstorm":
    //       $(".weather-block").append(<i class="fa fa-bolt"></i>);
    //       break;
    //     default:
    //         $(".weather-block").append(json.current_observation.weather);//default case is print string
    //   }
    // });

    //this adds the location map to the detailed view
    $(".maps").append(
      '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + cityName + ',' + stateName + '&zoom=14&size=400x200&key=AIzaSyB76RrlbvbkCXkPOgP8puUTvHDDFeZsIpA" alt="Appointment location" width="90%"></img>'
    )

}
});//this closes the entire function
