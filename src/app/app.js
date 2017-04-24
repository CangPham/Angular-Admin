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
    'timer',

    'MyApp.theme',
    'MyApp.pages'
]).run(run);

function run($rootScope, $http, $location, $localStorage, errorHandler, ConstantService) {
    $rootScope.errorHandler = errorHandler;
    $rootScope.CONSTANT = ConstantService;
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = [
            /^\/login/gi, //login page
            /^\/logout/gi, //logout page
            /^\/account\//gi, //all authentication pages
        ];
        var isPublicPage = publicPages.some(function (pattern) {
            return pattern.test($location.path());
        });
        if (!isPublicPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if(toState.settings && $rootScope.settings){
            $rootScope.settings.hideMenus = toState.settings.hideMenus;
        } else {
            $rootScope.settings.hideMenus = false;
        }

    });

    $rootScope.servicePrefix = 'https://cloudorder.vn/api';
    $rootScope.host = 'https://cloudorder.vn';
    $rootScope.productImagePath = '/upload/images/';
    $rootScope.productImageUrl = $rootScope.host + $rootScope.productImagePath;
    $rootScope.settings = {hideMenus: false};
    //$rootScope.isPlainPages = MyApp.pages.authentication.isPlainPages;
}
