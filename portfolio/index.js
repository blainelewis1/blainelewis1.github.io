var blainelewis = angular.module('Portfolio', [])
.controller('Portfolio', ["$scope", "$http", function ($scope, $http) {
    $http.get('resources/data.json')
    .then(function(res){
        $scope.projects = res.data.projects;
        $scope.experience = res.data.experience;
        $scope.education = res.data.education;
        $scope.skills = res.data.skills;
        $scope.about = res.data.about;
    });
}]);
