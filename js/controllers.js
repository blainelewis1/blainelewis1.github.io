var blaineLewis = angular.module('BlaineLewis', []);

blaineLewis.controller('Controller', ['$scope', function ($scope) {
  $scope.experiences = experiences;
  $scope.plays = plays;
}]);
