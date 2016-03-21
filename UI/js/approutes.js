﻿//var empTracker = angular.module("empTracker", ['ionic']).run(function ($templateCache, $http) {

//    $http.get('templates/calendar.html', { cache: $templateCache });
//    $http.get('templates/dailyview.html', { cache: $templateCache });
//    $http.get('templates/empmap.html', { cache: $templateCache });
//    $http.get('templates/home.html', { cache: $templateCache });
//    $http.get('templates/myaccount.html', { cache: $templateCache });
//    $http.get('templates/submenu.html', { cache: $templateCache });
//    $http.get('templates/login.html', { cache: $templateCache });
//    $http.get('templates/tempdevicelogin.html', { cache: $templateCache });
//    $http.get('templates/menu.html', { cache: $templateCache });
//    $http.get('templates/supervisingemployees.html', { cache: $templateCache });

//});


var empTracker = angular.module('starter', ['ionic', 'flexcalendar', 'pascalprecht.translate'])

empTracker.run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

empTracker.run(function ($templateCache, $http) {

        $http.get('templates/calendar.html', { cache: $templateCache });
        $http.get('templates/dailyview.html', { cache: $templateCache });
        $http.get('templates/empmap.html', { cache: $templateCache });
        $http.get('templates/home.html', { cache: $templateCache });
        $http.get('templates/myaccount.html', { cache: $templateCache });
        $http.get('templates/submenu.html', { cache: $templateCache });
        $http.get('templates/login.html', { cache: $templateCache });
        $http.get('templates/tempdevicelogin.html', { cache: $templateCache });
        $http.get('templates/menu.html', { cache: $templateCache });
        $http.get('templates/supervisingemployees.html', { cache: $templateCache });
        $http.get('templates/supervisoraccount.html', { cache: $templateCache });
        $http.get('templates/thisweek.html', { cache: $templateCache });
        $http.get('templates/tracker.html', { cache: $templateCache });
        $http.get('templates/attendance.html', { cache: $templateCache });

    });

empTracker.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider

         .state('login', {
             cache: false,
             url: '/login',
             controller: "LoginController",
             templateUrl: 'templates/login.html'
         })

         .state('app', {
             url: '/app',
             abstract: true,
             templateUrl: 'templates/menu.html',
             controller: 'MenuController'
         })

        .state('app.tempdevicelogin', {
            url: '/tempdevicelogin',
            views: {
                'menuContent': {
                    controller: "tempdeviceloginController",
                    templateUrl: 'templates/tempdevicelogin.html'
                }
            }
        })

            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        controller: "homeController",
                        templateUrl: 'templates/home.html'
                    }
                }
            })
            .state('app.thisweek', {
                url: '/thisweek',
                views: {
                    'menuContent': {
                        controller: "thisweekController",
                        templateUrl: 'templates/thisweek.html'
                    }
                }
            })
            .state('app.submenu', {
                url: '/submenu',
                views: {
                    'menuContent': {
                        controller: "submenuController",
                        templateUrl: 'templates/submenu.html'
                    }
                }
            })

            .state('app.dailyview', {
                url: '/dailyview',
                views: {
                    'menuContent': {
                        controller: "dailyviewController",
                        templateUrl: 'templates/dailyview.html'
                    }
                }
            })

            .state('app.tracker', {
                url: '/tracker',
                views: {
                    'menuContent': {
                        controller: "trackerController",
                        templateUrl: 'templates/tracker.html'
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

            .state('app.calendar', {
                url: '/calendar',
                views: {
                    'menuContent': {
                        controller: "calendarController",
                        templateUrl: 'templates/calendar.html'
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


        .state('supervisingemployees', {
            url: '/supervisingemployees',
            controller: "supervisingemployeesController",
            templateUrl: 'templates/supervisingemployees.html'
        })
         .state('myaccount', {
             url: '/myaccount',
             controller: "myaccountController",
             templateUrl: 'templates/myaccount.html'

         })
        .state('empmap', {
            url: '/empmap',
            controller: "empmapController",
            templateUrl: 'templates/empmap.html'

        })
    .state('supervisoraccount', {
        url: '/supervisoraccount',
        controller: "supervisoraccountController",
        templateUrl: 'templates/supervisoraccount.html'

    })
        ;




    // Flex Calendar Language Options

    $translateProvider.translations('en', {
        JANUARY: 'January',
        FEBRUARY: 'February',
        MARCH: 'March',
        APRIL: 'April',
        MAI: 'Mai',
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
    $translateProvider.translations('fr', {
        JANUARY: 'Janvier',
        FEBRUARY: 'Févier',
        MARCH: 'Mars',
        APRIL: 'Avril',
        MAI: 'Mai',
        JUNE: 'Juin',
        JULY: 'Juillet',
        AUGUST: 'Août',
        SEPTEMBER: 'Septembre',
        OCTOBER: 'Octobre',
        NOVEMBER: 'Novembre',
        DECEMBER: 'Décembre',

        SUNDAY: 'Dimanche',
        MONDAY: 'Lundi',
        TUESDAY: 'Mardi',
        WEDNESDAY: 'Mercredi',
        THURSDAY: 'Jeudi',
        FRIDAY: 'Vendredi',
        SATURDAY: 'Samedi'
    });
    $translateProvider.translations('pt', {
        JANUARY: 'Janeiro',
        FEBRUARY: 'Fevereiro',
        MARCH: 'Março',
        APRIL: 'Abril',
        MAI: 'Maio',
        JUNE: 'Junho',
        JULY: 'Julho',
        AUGUST: 'Agosto',
        SEPTEMBER: 'Setembro',
        OCTOBER: 'Outubro',
        NOVEMBER: 'Novembro',
        DECEMBER: 'Dezembro',

        SUNDAY: 'Domingo',
        MONDAY: 'Segunda',
        TUESDAY: 'Terça',
        WEDNESDAY: 'Quarta',
        THURSDAY: 'Quinta',
        FRIDAY: 'Sexta',
        SATURDAY: 'Sábado'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
});