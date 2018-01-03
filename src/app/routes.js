TestApp.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider            
            .state('header', {
                abstract: true,
                templateUrl: 'app/shared/header/header.html',
                controller: 'HeaderCtrl'
            })
            
            .state('header.home', {
                url: '/home',
                templateUrl: 'app/components/home/home.html',
                controller: 'HomeCtrl'
            })
            
            .state('header.list', {
                url: '/list',
                views: {
                    '': {
                        templateUrl: 'app/components/list/list.html',
                        controller: 'ListCtrl'
                    },
                    'admin@header.list': {
                        templateUrl: 'app/components/options/admin_options.html',
                        controller: 'OptionsCtrl'
                    },
                    'user@header.list': {
                        templateUrl: 'app/components/options/user_options.html',
                        controller: 'OptionsCtrl'
                    } 
                }
            })
            
            .state('header.form', {
                url: '/form',
                templateUrl: 'app/components/form/form.html',
                controller: 'FormCtrl'
            });

    });
