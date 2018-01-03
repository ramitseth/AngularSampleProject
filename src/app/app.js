var TestApp = angular.module('MyApp', ['ui.router','angular-file-input'])
    .run(function ($rootScope) {
        $rootScope.activeItem = [true, false, false];
    });