TestApp.controller('FormCtrl', function ($scope, $rootScope, $state, $timeout, headerService) {

    if (!$rootScope.adminTrigger) {
        $state.go('header.home');
    }

    //check for active state on header bar
    headerService.checkActiveItem(2);

    $scope.resetForm = function () {
        $scope.newuser = {};
    };

    $scope.focus = function (id) {
        document.getElementById(id).focus();
        document.getElementById(id).select();
    };

    $scope.savePicture = function (input) {
        if (input) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target && e.target.result) {
                    $timeout(function () {
                        $scope.newuser.picture = e.target.result;
                    }, 0);
                }
            };
            reader.readAsDataURL(input);
        }
    };

});