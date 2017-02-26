'use strict';

angular.module('MyApp', [
    'checklist-model',
    'ngTagsInput',
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    'ngJsTree',
    'angular-progress-button-styles',
    'ngStorage',
    'ngFileUpload',

    'MyApp.theme',
    'MyApp.pages'
]).run(run);

function run($rootScope, $http, $location, $localStorage, errorHandler) {
    $rootScope.errorHandler = errorHandler;
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });

    $rootScope.servicePrefix = 'https://cloudorder.vn/api';
    $rootScope.host = 'https://cloudorder.vn';
    $rootScope.productImagePath = '/upload/images/';
    $rootScope.productImageUrl = $rootScope.host + $rootScope.productImagePath;
    $rootScope.settings = {hideMenus: false};
    //$rootScope.isPlainPages = MyApp.pages.authentication.isPlainPages;
}
