(function () {
    'use strict';

    angular
        .module('MyApp.pages.authentication')
        .factory('AuthenticationService', Service);

    /** @ngInject */
    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

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

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();