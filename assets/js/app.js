// ;(function(){
//
// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function(){

  // create the module and name it apptApp
        // also include ngRoute for all our routing needs
        console.log('an angular app is you');

    var appAppt = angular.module("apptApp", ['ngRoute']);

     appAppt.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : '/pages/index.html',
                // controller  : 'mainController'
            })
            .when('/new', {
                templateUrl : '/pages/new-appt.html',
                // controller  : 'newController'
            })
            .when('/edit', {
                templateUrl : '/pages/edit-appt.html',
                // controller  : 'editController'
            })
            .when('/details', {
                templateUrl : '/pages/appt-detail.html',
                // controller  : 'detailsController'
            })
    });

    // // create the controller and inject Angular's $scope
    // apptApp.controller('mainController', function($scope) {
    //
    // });
    //
    // apptApp.controller('newController', function($scope) {
    //
    // });
    //
    // apptApp.controller('editController', function($scope) {
    //
    // });
    //
    // apptApp.controller('detailsController', function($scope) {
    //
    // });


// };

// })();
