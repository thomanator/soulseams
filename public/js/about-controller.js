(function () {
  angular
    .module('app')
    .controller('aboutController', aboutController);

  aboutController.$inject = ['$scope', '$timeout', '$rootScope', '$state'];

  function aboutController ($scope, $timeout, $rootScope, $state) {
    $scope.showDiv = false;
    $scope.showText = false;
    $scope.removeText = false;
    $scope.showLine = false;
    $scope.showNote = false;
    $timeout(function() {
      $scope.showDiv = true; 
      $timeout(function() {
        $scope.showText = true; 
        $timeout(function() {
          $scope.showLine = true;
          $timeout(function() {
            $scope.showNote = true;
          }, 700);
        }, 1000)
      }, 1150);
    }, 5);

    var unRegisterListener = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if($scope.showDiv) {
        event.preventDefault();
        $scope.showDiv = false;
        $timeout(function() {
          $scope.removeText = true;
          $scope.showNote = false;
          $timeout(function() {
          $scope.showText = false;
            $state.go(toState, toParams);
          }, 900);
        }, 1000)
      }
      console.log(toState);
    });

    $scope.$on('$destroy', function() {
      unRegisterListener();
    });

  }
})()
