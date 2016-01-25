var blaineLewis = angular.module('BlaineLewis', []);

blaineLewis.controller('Controller', function ($scope) {
  $scope.experiences = experiences;
  $scope.plays = plays;
});
