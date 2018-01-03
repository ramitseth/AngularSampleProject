TestApp.controller('ListCtrl', function($scope, $rootScope, $state, headerService) {

    //check for active state on header bar
    headerService.checkActiveItem(1);

});