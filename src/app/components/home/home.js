TestApp.controller('HomeCtrl', function ($scope, $rootScope, headerService) {

    //check for active state on header bar
    headerService.checkActiveItem(0);

    if ($rootScope.adminTrigger)
        $scope.isAdmin = true;
    else $scope.isAdmin = false;

    //Function to switch views and hide/show admin options
    $scope.switchUser = function () {
        $rootScope.adminTrigger = $scope.isAdmin;
    };
});