var blainelewis = angular.module('BlaineLewis', []);

blainelewis.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

blainelewis.controller('Controller', ['$scope', function ($scope) {
  $scope.experiences = experiences;
  $scope.plays = plays;
}]);
