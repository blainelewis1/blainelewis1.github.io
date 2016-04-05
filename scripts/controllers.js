var blaineLewis = angular.module('BlaineLewis', []);

blaineLewis.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

blaineLewis.controller('Controller', ['$scope', function ($scope) {
  $scope.experiences = experiences;
  $scope.plays = plays;
}]);
