﻿empTracker.controller("supervisingemployeesController", function ($scope, $rootScope, $state, $ionicPopup, $timeout, $ionicLoading, API, $http, $window, $location) {
    $scope.defaultEmpPhoto = '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';
    $rootScope.allemployeesArray = [];
    $scope.selectedAll = false; // represent all check boxes selection
    $scope.selectedAllboxes = false; // represent selectall btn colors
    $scope.selectedEmployeesCounter = 0;

    $scope.$on('$ionicView.enter', function () {
        $rootScope.toggledrag = true;
        var req = {
            method: 'GET',
            url: '/api/Attendance/GetSites',
            data: {}
        }
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            template: '<i class="icon ion-loading-d"></i>'
        });
        // add true to use authentication token
        API.execute(req, true).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 200) {
                $scope.categories = _res.data.data;
                console.log($scope.categories);
                $rootScope.allemployeesArray = [];
                $scope.errorMSG = '';
                $ionicLoading.hide();
            }
        }, function (error) {
            API.showTokenError(error);
        });
    });

    angular.element(document.querySelector('#dvRoastered')).addClass('positive-bg');
    angular.element(document.querySelector('#dvFree')).removeClass('positive-bg');

    $scope.chooseRoastered = function (_status) {
        // remove data of checked emps
        for (var i = 0; i < $rootScope.allemployeesArray.length; i++) {
            $rootScope.allemployeesArray[i].selected = false;
        }
        $scope.selectedEmployeesCounter = 0;
        $scope.selectedAll = false;
        $scope.selectedAllboxes = false;

        // check _status change
        if (_status == 1) {
            console.log('1');
            angular.element(document.querySelector('#dvRoastered')).addClass('positive-bg');
            angular.element(document.querySelector('#dvFree')).removeClass('positive-bg');
            //show dv with roasterd data
            $rootScope.allemployeesArray = $rootScope.rosteredEmployeesArray;
        }
        else {
            console.log('0');
            angular.element(document.querySelector('#dvRoastered')).removeClass('positive-bg');
            angular.element(document.querySelector('#dvFree')).addClass('positive-bg');
            // show dv with other data
            $rootScope.allemployeesArray = $rootScope.otherEmployeesArray;
        }
    }

    $scope.getByListEmpBySite = function (_siteID) {
        $scope.today = new Date();
        var formatedTodayDate = $scope.today.getFullYear() + '-' + ($scope.today.getMonth() + 1) + '-' + $scope.today.getDate();
        console.log(formatedTodayDate);
        console.log(_siteID);
        $scope.siteId = _siteID;
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            template: '<i class="icon ion-loading-d"></i>'
        });
        // use today date & use card to let user select location
        var req = {
            method: 'GET',
            //url: '/api/Attendance/GetEmployees',
            url: '/api/Attendance/GetEmployees?SiteId=' + _siteID + '&day=2016-08-28',// 2016-08-28 || formatedTodayDate
            data: {}
        }
        // add true to use authentication token
        API.execute(req, true).then(function (_res) {
            $rootScope.allemployeesArray = [];
            // clear selected
            $scope.selectedAll = false;
            $scope.selectedAllboxes = false;
            //$scope.errorMSG = '';
            console.log(_res);
            if (_res.data.code == 200) {
                $rootScope.rosteredEmployeesArray = _res.data.data.Rostered;
                $rootScope.otherEmployeesArray = _res.data.data.Other;

                $rootScope.allemployeesArray = $rootScope.rosteredEmployeesArray;

                $rootScope.allemployeesArray = _res.data.data;

                console.log(_res.data.data);
                //console.log($rootScope.allemployeesArray);
                $ionicLoading.hide();
            }
        }, function (error) {
            API.showTokenError(error);
        });
    }

    $scope.checkAll = function () {

        if ($scope.selectedAll == false) {
            for (var i = 0; i < $rootScope.allemployeesArray.length; i++) {
                $rootScope.allemployeesArray[i].selected = true;
            }
            $scope.selectedEmployeesCounter = $rootScope.allemployeesArray.length;
            $scope.selectedAll = true;
            $scope.selectedAllboxes = true;
        }
        else {
            for (var i = 0; i < $rootScope.allemployeesArray.length; i++) {
                $rootScope.allemployeesArray[i].selected = false;
            }
            $scope.selectedEmployeesCounter = 0;
            $scope.selectedAll = false;
            $scope.selectedAllboxes = false;
        }
        // final value
        console.log($rootScope.allemployeesArray);
    };

    $scope.changeSelectdValues = function () {
        var selected = 0;
        var unselected = 0;
        for (var i = 0; i < $rootScope.allemployeesArray.length; i++) {
            if ($rootScope.allemployeesArray[i].selected == true)
                selected++;
            else
                unselected++;
        }
        if (selected == $rootScope.allemployeesArray.length) {
            console.log('you selected All');
            $scope.selectedAll = true;
            $scope.selectedAllboxes = true;
        }

        else if (unselected == $rootScope.allemployeesArray.length) {
            console.log('you un selected All');
            $scope.selectedAll = false;
            $scope.selectedAllboxes = false;
        }
        else {
            console.log('else');
            console.log(selected);
            console.log(unselected);
            $scope.selectedAllboxes = false;
        }
        // final value
        console.log($rootScope.allemployeesArray);
        $scope.selectedEmployeesCounter = selected;
    }


    // Triggered on a button click
    $scope.showClockInPopup = function () {
        $scope.time = { hour: 8, minute: 30 };
        // custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="row"><div class="col col-center text-center">Enter UTC Time</div></div><div class="row">\
                <div class="padding col"><input type="number" class="text-center" ng-model="time.hour"></div>\
                <div class="padding col"><input type="number" class="text-center" ng-model="time.minute"></div>\
            </div>',
            title: '<i class="ion-information-circled"></i>(' + $scope.selectedEmployeesCounter + ') employee(s) selected',
            scope: $scope,
            buttons: [
               { text: 'Cancel' },
               {
                   text: '<b>Clock In</b>',
                   type: 'button-positive',
                   onTap: function (e) {
                       console.log('clock in clicked');
                       if (!$scope.time.hour) {
                           //don't allow the user to close unless he enters value
                           e.preventDefault();
                       } else {
                           var clockTime = $scope.time.hour + ':' + $scope.time.minute;
                           $scope.clockInEmployees(clockTime);
                           return clockTime;
                       }
                   }
               }
            ]
        });
        myPopup.then(function (res) {
            console.log('Clock In at ', res);
        });
    };

    $scope.clockInEmployees = function (_clockTime) {
        $rootScope.currentUserLatitude = 0;
        $rootScope.currentUserLongitude = 0;
        $scope.errorMSG = "";
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            template: '<i class="icon ion-loading-d"></i>'
        });
        $rootScope.getCurrentLocation();
        $scope.$watch('$root.currentUserLongitude', function () {
            if ($rootScope.currentUserLongitude != 0) {
                console.log($rootScope.currentUserLatitude);
                console.log($rootScope.currentUserLongitude);
                console.log($rootScope.allemployeesArray);
                for (var i = 0; i < $rootScope.allemployeesArray.length; i++) {
                    if ($rootScope.allemployeesArray[i].selected == true) {
                        //api here
                        var req = {
                            method: 'PUT',
                            url: '/api/Attendance?action=in',
                            data: {
                                "EmpNo":$rootScope.allemployeesArray[i].EmpNo,
                                "SiteId": "ADH05",
                                "TaskCode": "Greeter   ",
                                "Notes": "",
                                "Clocking": {
                                    "ClockingTime": _clockTime,
                                    //"Latitude": $rootScope.currentUserLatitude,
                                    //"Longitude": $rootScope.currentUserLongitude,
                                    "GPSTrackingMethod": "Network",
                                    "PunchedVia": "MOB",
                                    "EmployeeNotes": ""
                                }
                            }
                        }
                        console.log(req.data);
                        // add true to use authentication token
                        API.execute(req, true).then(function (_res) {
                            console.log(_res);
                            if (_res.data.code == 200) {
                                console.log('pass');
                            }
                            else {
                                $scope.errorMSG = _res.data.data;
                            }
                        },
                       function (error) {
                           API.showTokenError(error);
                       });
                    }
                }
                // call refresh list
                $scope.getByListEmpBySite($scope.siteId);
                $ionicLoading.hide();
                console.log('done');
            }
        });

    }

    // Triggered on a button click
    $scope.showClockOutPopup = function () {
        $scope.time = { hour: 8, minute: 30 };
        // custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="row">\
                <div class="padding col"><input type="number" class="text-center" ng-model="time.hour"></div>\
                <div class="padding col"><input type="number" class="text-center" ng-model="time.minute"></div>\
            </div>',
            title: '<i class="ion-information-circled"></i>(' + $scope.selectedEmployeesCounter + ') employee(s) selected',
            scope: $scope,
            buttons: [
               { text: 'Cancel' },
               {
                   text: '<b>Clock Out</b>',
                   type: 'button-positive',
                   onTap: function (e) {
                       if (!$scope.time.hour) {
                           //don't allow the user to close unless he enters value
                           e.preventDefault();
                       } else {
                           var clockTime = $scope.time.hour + ':' + $scope.time.minute;
                           return clockTime;
                       }
                   }
               }
            ]
        });
        myPopup.then(function (res) {
            console.log('Clock Out at ', res);
        });
    };

    $scope.openmap = function (emp) {
        // try add name , id of emp
        console.log(emp);
        if (emp.Shifts.length > 0) {
            console.log('if');
            console.log(emp.Shifts[0].SiteCoordinates);
            $state.go('supervisormenu.empmap', { Name: emp.Name, EmpNo: emp.EmpNo, Latitude: emp.Shifts[0].SiteCoordinates.Latitude, Longitude: emp.Shifts[0].SiteCoordinates.Logitude });
        }
        else {
            console.log('else');
            console.log('no cordinates');
            $state.go('supervisormenu.empmap', { Name: emp.Name, EmpNo: emp.EmpNo, Latitude: null, Longitude: null });
        }
    }

});

//if (ionic.Platform.isAndroid()) {
//    // get json from external file
//    $http.get('/android_asset/www/json/employees.json').then(function (data) {
//        $scope.allemployeesArray = data.data.employees;
//    });
//}
//else {
//    // get json from external file
//    $http.get('/json/employees.json').then(function (data) {
//        $scope.allemployeesArray = data.data.employees;
//    });
//}