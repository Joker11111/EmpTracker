﻿empTracker.factory('API', ['$http', '$window', function ($http, $window) {
    var _url = "http://rostersmanager.com:90";
    var headers = {};
    return {
        name: 'API',
        execute: function (_req, _isAuth) {
            // _isAuth means need token
            if (_isAuth) {
                headers = { 'Content-Type': 'application/json', 'Authorization': $window.localStorage['authorizationToken'] };
            }
            else { // don't need token 'login,register'
                headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
                _req.transformRequest = function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                };
            }
            _req.url = _url + _req.url;
            _req.headers = headers;
            //console.log(_req);
            return $http(_req);
            
        }
      
    };
}]);
