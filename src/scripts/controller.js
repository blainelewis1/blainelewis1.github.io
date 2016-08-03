var blainelewis = angular.module('BlaineLewis', [])
.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}])
.filter('is_set', [function() {
    return function(arr, prop) {
        var to_return = [];

        for(var i = 0; i < arr.length; i++){
            if(arr[i][prop] !== undefined) {
                to_return.push(arr[i]);
            }
        }

        return to_return;
    };
}])
.controller('Controller', ["$scope", "$http", function ($scope, $http) {
    $scope.projects = [];

    $http.get('/resources/projects.json')
    .then(function(res){
        $scope.projects = res.data;
    });
}]);
