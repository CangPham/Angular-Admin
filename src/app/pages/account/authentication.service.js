(function () {
    'use strict';

    angular
        .module('MyApp.pages.authentication')
        .factory('AuthenticationService', Service);

    /** @ngInject */
    function Service($http, $rootScope, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;
        service.register = register;
        service.verify = verify;

        return service;

        function Login(username, password, callback) {

            $http.post($rootScope.servicePrefix + '/users/login.json', {UserPhoneNumber: username, Password: password})
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.UserData.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = {username: username, token: response.UserData.token};

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.UserData.token;

                        $rootScope.settings.hideMenus = false;
                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }


        function register(data, callback) {

            $http.post($rootScope.servicePrefix + '/users/register.json', data)
                .success(function (response) {

                    // login successful if there's a token in the response
                    if (response.Success) {
                        console.log(response);
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.registeredUser = {
                            UserPhoneNumber: response.User.UserPhoneNumber,
                            UserKey: response.User.UserKey
                        };

                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }


        function verify(phone, smsCode) {
            var data = {
                SmsCodeValue: smsCode,
                UserPhoneNumber: phone
            };
            return $http.post($rootScope.servicePrefix + '/users/verify.json', data);

        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();