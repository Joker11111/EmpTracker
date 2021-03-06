﻿var empTracker = angular.module('empTracker', ['ionic', 'ngCordova', 'ui.router', 'flexcalendar', 'pascalprecht.translate']);

empTracker.run(function ($ionicPlatform, $rootScope, $state, InternetConnection, CurrentLocation, CallPerodicalUpdate) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    // set default value of internetStatus checkConnection
    $rootScope.internetStatus = 'disconnected';
    $rootScope.checkInternet = function () {
        setInterval(function () {
            InternetConnection.checkConnection();
        }, 1000);
    };
    $rootScope.checkInternet();

    // get current location lat lng
    $rootScope.locationService = 'inactive';
    $rootScope.getCurrentLocation = function () {
        CurrentLocation.getLatLng();
    };
    // call get location when needed 
    $rootScope.getCurrentLocation();

    // challenge called every 10 minutes if UserIsInShift : 600000 ms
    $rootScope.UserIsInShift = false;
    $rootScope.wakeupChallange = function () {
        setInterval(function () {
            if ($rootScope.UserIsInShift == true) {
                $state.go('app.challenge');
            }
        }, 600000);
    };
    $rootScope.wakeupChallange();

    // perodical update called every 10 minutes if UserIsInShift = 600000 ms
    $rootScope.perodicalUpdate = function () {
        setInterval(function () {
            if ($rootScope.UserIsInShift == true) {
                CallPerodicalUpdate.sendUpdate();
            }
        }, 600000);
    };
    $rootScope.perodicalUpdate();

});

empTracker.config(['$ionicConfigProvider', function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
}]);

empTracker.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    .state('login', {
        cache: false,
        url: '/login',
        controller: "LoginController",
        templateUrl: 'templates/login.html'
    })

    .state('forget', {
        cache: false,
        url: '/forget',
        controller: "forgetController",
        templateUrl: 'templates/forget.html'
    })

    .state('tempdevicelogin', {
        cache: false,
        url: '/tempdevicelogin',
        controller: "tempdeviceloginController",
        templateUrl: 'templates/tempdevicelogin.html'
    })

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuController'
    })

    .state('app.home', {
        cache: false,
        url: '/home',
        views: {
            'menuContent': {
                controller: "homeController",
                templateUrl: 'templates/home.html'
            }
        }
    })

    .state('app.submenu', {
        url: '/submenu',
        views: {
            'menuContent': {
                controller: "MenuController",
                templateUrl: 'templates/submenu.html'
            }
        }
    })

    .state('app.shiftview', {
        url: '/shiftView/:shiftid?',
        views: {
            'menuContent': {
                controller: "shiftviewController",
                templateUrl: 'templates/shiftview.html'
            }
        }
    })

    .state('app.attendance', {
        url: '/attendance',
        views: {
            'menuContent': {
                controller: "attendanceController",
                templateUrl: 'templates/attendance.html'
            }
        }
    })

    .state('app.notifications', {
        url: '/notifications',
        views: {
            'menuContent': {
                controller: "notificationsController",
                templateUrl: 'templates/notifications.html'
            }
        }
    })

    .state('app.challenge', {
        url: '/challenge',
        views: {
            'menuContent': {
                controller: "challengeController",
                templateUrl: 'templates/challenge.html'
            }
        }
    })

    .state('app.changepassword', {
        url: '/changepassword',
        views: {
            'menuContent': {
                controller: "changepasswordController",
                templateUrl: 'templates/changepassword.html'
            }
        }
    })

    .state('app.myaccount', {
        cache: false,
        url: '/myaccount',
        views: {
            'menuContent': {
                controller: "myaccountController",
                templateUrl: 'templates/myaccount.html'
            }
        }
    })

    .state('app.dashboard', {
        url: '/dashboard',
        views: {
            'menuContent': {
                controller: "dashboardController",
                templateUrl: 'templates/dashboard.html'
            }
        }
    })

    .state('app.viewmap', {
        cache: false,
        url: '/viewmap/:Latitude/:Longitude',
        views: {
            'menuContent': {
                controller: "viewmapController",
                templateUrl: 'templates/viewmap.html'
            }
        }
    })

    .state('app.unscheduledshift', {
        url: '/unscheduledshift',
        views: {
            'menuContent': {
                controller: "unscheduledshiftController",
                templateUrl: 'templates/unscheduledshift.html'
            }
        }
    })


    .state('supervisormenu', {
        url: '/supervisormenu',
        abstract: true,
        templateUrl: 'templates/supervisormenu.html',
        controller: 'supervisormenuController'
    })


    .state('supervisormenu.supervisingemployees', {
        url: '/supervisingemployees',
        views: {
            'menuContent': {
                controller: "supervisingemployeesController",
                templateUrl: 'templates/supervisingemployees.html'
            }
        }
    })

    .state('supervisormenu.supervisoraccount', {
        cache: false,
        url: '/supervisoraccount',
        views: {
            'menuContent': {
                controller: "supervisoraccountController",
                templateUrl: 'templates/supervisoraccount.html'
            }
        }
    })

    .state('supervisormenu.supervisorchangepassword', {
        url: '/supervisorchangepassword',
        views: {
            'menuContent': {
                controller: "supervisorchangepasswordController",
                templateUrl: 'templates/supervisorchangepassword.html'
            }
        }
    })

    .state('supervisormenu.empmap', {
        cache: false,
        url: '/empmap/:Name/:EmpNo/:Latitude/:Longitude',
        views: {
            'menuContent': {
                controller: "empmapController",
                templateUrl: 'templates/empmap.html'
            }
        }
    })

     .state('supervisormenu.supervisornotifications', {
         url: '/supervisornotifications',
         views: {
             'menuContent': {
                 controller: "supervisornotificationsController",
                 templateUrl: 'templates/supervisornotifications.html'
             }
         }
     });


    // Flex Calendar Language Options
    $translateProvider.translations('en', {
        JANUARY: 'January',
        FEBRUARY: 'February',
        MARCH: 'March',
        APRIL: 'April',
        MAI: 'May',
        JUNE: 'June',
        JULY: 'July',
        AUGUST: 'August',
        SEPTEMBER: 'September',
        OCTOBER: 'October',
        NOVEMBER: 'November',
        DECEMBER: 'December',

        SUNDAY: 'Sunday',
        MONDAY: 'Monday',
        TUESDAY: 'Tuesday',
        WEDNESDAY: 'Wednesday',
        THURSDAY: 'Thurday',
        FRIDAY: 'Friday',
        SATURDAY: 'Saturday'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
});