﻿empTracker.controller("LoginController", function ($scope, $filter, $rootScope, $state, $timeout, API, $window, $ionicLoading, $rootScope, $cordovaNetwork, $http, $cordovaToast, LocalStorage) {

    $scope.$on('$ionicView.enter', function () {


        $scope.frmmLogin = {};
        $scope.frmLogin.$setPristine();
        $scope.frmLogin.$setUntouched();

        $scope.afterLoginError = false;



        if (!angular.equals(LocalStorage.getObject('UserLocalObject'), {}) && LocalStorage.getObject('UserLocalObject').UserName != "") { // not empty, then do login
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                template: '<i class="icon ion-loading-d"></i>'
            });
            $scope.afterLoginError = false;
            $scope.loginObj = LocalStorage.getObject('UserLocalObject');
            $timeout(function () {
                $scope.doLogin();
            });
        }
        else {
            $scope.frmLogin.$setPristine();
            $scope.frmLogin.$setUntouched();
            //$scope.frmmLogin.name = '';
            //$scope.frmmLogin.password = '';
            //$scope.frmmLogin.companycode = '';
        }

    });


    $scope.submitForm = function (form) {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            template: '<i class="icon ion-loading-d"></i>'
        });
        $scope.afterLoginError = false;

        $scope.loginObj = {
            UserName: $scope.frmmLogin.name,
            Password: $scope.frmmLogin.password,
            CompanyCode: $scope.frmmLogin.companycode,
            grant_type: 'password',
            IMEI: $rootScope.IMEI
        };

        if (form.$valid) {
            $scope.doLogin();
        }
    }
    var userType;
    var loginCode;
    $scope.doLogin = function () {
        var req = {
            method: 'POST',
            url: '/Token',
            data: $scope.loginObj
        }
        console.log(req.data);
        API.execute(req, false).then(function (_res) {
            console.log(_res);
            $window.localStorage['authorizationToken'] = _res.data.token_type + " " + _res.data.access_token;
            console.log($window.localStorage['authorizationToken']);
            loginCode = _res.data.code;
            userType = _res.data.userType;
            console.log('loginCode = ' + loginCode + "&&& userType = " + userType);

            if (loginCode == 100) {  // his device
                // get user data after login if redirect to dashboard
                var req = {
                    method: 'GET',
                    url: '/api/Account/Profile',
                    data: {}
                }
                // add true to use authentication token
                API.execute(req, true).then(function (_res) {
                    ////console.log(_res.data.data);
                    ////console.log(_res.data);

                    if (_res.data.code = 200) {
                        $scope.userName = _res.data.data.FirstName + ' ' + _res.data.data.LastName;
                        ////console.log($scope.userName);
                        if (_res.data.data.Photo == null) {
                            $rootScope.globalUserPhoto = 'data:image/jpeg;base64,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';
                        }
                        else {
                            $rootScope.globalUserPhoto = "data:image/png;base64," + _res.data.data.Photo;
                        }
                        ////console.log($rootScope.globalUserPhoto);
                        $window.localStorage['UserName'] = $scope.userName;
                        $rootScope.globalUserName = _res.data.data.FirstName + ' ' + _res.data.data.LastName;
                        $rootScope.EmpNo = _res.data.data.EmpNo;
                        $rootScope.name = $scope.frmmLogin.name;
                        $rootScope.password = $scope.frmmLogin.password;
                        $rootScope.companycode = $scope.frmmLogin.companycode;

                    }
                    else {
                        // show profile error
                        $ionicLoading.hide();
                        $rootScope.showToast(_res.data.data);
                    }
                }, function (error) {
                    API.showTokenError(error);
                }).finally(
                function () {
                    //get Notifications Counter
                    var req = {
                        method: 'GET',
                        url: '/api/Notification',
                        data: {}
                    }
                    // add true to use authentication token
                    API.execute(req, true).then(function (_res) {
                        ////console.log(_res.data.code);
                        ////console.log(loginCode);
                        $rootScope.notifictionsCounter = 0;
                        if (_res.data.code = 200) {
                            $scope.allAlertsArray = _res.data.data;
                            for (var i = 0; i < _res.data.data.length; i++) {
                                if (_res.data.data[i].IsRead == false) {
                                    $rootScope.notifictionsCounter++;
                                }
                            }

                        }
                        else {
                            // show notification error
                            $ionicLoading.hide();
                            $rootScope.showToast(_res.data.data);
                        }
                    }, function (error) {
                        API.showTokenError(error);
                    }).finally(
                    function () {
                        // call settings api 
                        var req = {
                            method: 'GET',
                            url: '/api/Settings',
                            data: {}
                        }
                        // add true to use authentication token
                        API.execute(req, true).then(function (_res) {
                            console.log(_res.data);
                            if (_res.data.code = 200) {
                                $rootScope.userSettings = _res.data.data;
                                LocalStorage.setObject('userSettingsObject', _res.data.data);
                                $ionicLoading.hide();

                                //// call get location when needed
                                if ($rootScope.userSettings.TimeAttendanceSettings.AllowClockingWithoutGPS == false) {
                                    $rootScope.getCurrentLocation();
                                }

                                //var userObj = {
                                //    UserName: $scope.frmmLogin.name,
                                //    Password: $scope.frmmLogin.password,
                                //    CompanyCode: $scope.frmmLogin.companycode,
                                //    grant_type: 'password',
                                //    IMEI: $rootScope.IMEI
                                //};
                                console.log(JSON.stringify($scope.loginObj));
                                if (userType == 'Employee') {// if user is Employee
                                    $rootScope.isSupervisor = false;
                                    LocalStorage.setObject('UserLocalObject', $scope.loginObj);
                                    $state.go('app.dashboard');
                                }
                                else {//if user is supervisor
                                    $rootScope.isSupervisor = true;
                                    LocalStorage.setObject('UserLocalObject', $scope.loginObj);
                                    $state.go('supervisormenu.supervisingemployees');
                                }
                            }
                            else {
                                //show setting error
                                $ionicLoading.hide();
                                $rootScope.showToast(_res.data.data);
                            }
                        }, function (error) {
                            API.showTokenError(error);
                        });
                    });
                });
            }
            else if (loginCode == 101) { // inactive device
                if (userType == 'Employee') {// if user is Employee
                    $rootScope.isSupervisor = false;
                }
                else {//if user is supervisor
                    $rootScope.isSupervisor = true;
                }
                $ionicLoading.hide();
                $scope.afterLoginError = true;
                console.log(_res.data.data);
                $state.go('tempdevicelogin');
                $rootScope.showToast('Inactive Device');

            }
            else if (loginCode == 102) { // new device
                if (userType == 'Employee') {// if user is Employee
                    $rootScope.isSupervisor = false;
                }
                else {//if user is supervisor
                    $rootScope.isSupervisor = true;
                }
                $ionicLoading.hide();
                console.log(_res.data.data);
                $state.go('tempdevicelogin');
                $rootScope.showToast(_res.data.data);

            }
            else {
                console.log(_res.data.data);
                $ionicLoading.hide();
                $rootScope.showToast(_res.data.data);
            }

        }, function (error) {
            $scope.frmmLogin.password = '';
            if (error.status == 0) {
                console.log('timeout Error Login');
                $ionicLoading.show({
                    //templateUrl: 'templates/tokenexpired.html',
                    template: '<div class="padding">\
                                <a class="button button-icon icon energized ion-alert-circled"></a>\
                                <h4>Timeout Error</h4>\
                                <h5>Make sure that WIFI or Mobile Data is turned on, then try again</h5>\
                              </div>',
                    animation: 'slide-in-up'
                });
                $timeout(function () {
                    $ionicLoading.hide();
                }, 5000);
            }
            else {
                $scope.afterLoginError = true;
                console.log(error);
                //console.log(error.data); /* catch 400  Error here */
                //$scope.afterLoginErrorTxt = error.data.error_description;
                $ionicLoading.hide();
                $rootScope.showToast(error.data.error_description);
            }
        }).finally(

        );
    }

});
