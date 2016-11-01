(function () {
    'use strict';

    angular
        .module('MyApp.pages')
        .factory('RequestService', Service);

    /** @ngInject */
    function Service($http, $q, $rootScope) {
        var servicePrefix = $rootScope.servicePrefix;

        return {
            makePromise: function (context) {
                var deferred = $q.defer();
                context(deferred.resolve, deferred.reject, deferred.notify);
                return deferred.promise;
            },
            get: function (url, config) {
                return this.makePromise(function (resolve, reject) {
                    $http.get(servicePrefix + url, config)
                        .success(function (data, status) {
                            if ((status === 200) && _.isObject(data)) {
                                resolve(data);
                            } else {
                                reject(new Error('Invalid Data'));
                            }
                        })
                        .catch(function (err) {
                            reject(err);
                        })

                });
            },
            post: function (url, data) {
                return this.makePromise(function (resolve, reject) {
                    $http.post(servicePrefix + url, data)
                        .success(function (data, status) {
                            if ((status === 200) && (_.isObject(data) || data === true)) {
                                resolve(data);
                            } else {
                                reject(new Error('Invalid Data'));
                            }
                        })
                        .catch(function (err) {
                            reject(err);
                        })
                });
            }
        }
    }
})();