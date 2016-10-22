(function () {
  angular
    .module('app')
    .controller('homeController', homeController);

  homeController.$inject = ['$scope', '$timeout', '$rootScope', '$state', '$window'];

  function homeController ($scope, $timeout, $rootScope, $state, $window) {
    $scope.showDiv = false;
    $scope.showText = false;
    $scope.removeText = false;
    $rootScope.module = 'home';
    $timeout(function() {
      $scope.showDiv = true; 
      $timeout(function() {
        $scope.showText = true; 
      }, 1150);
    }, 5);

    var unRegisterListener = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if($scope.showDiv) {
        event.preventDefault();
        $scope.showDiv = false;
        $scope.removeText = true;
        $timeout(function() {
          $scope.showText = false;
          $state.go(toState, toParams);
        }, 1000)
      }
      console.log(toState);
    });

    $scope.lastScrollTop = 0;
    $scope.direction = "";
    
    angular.element($window).bind("scroll", function() {
      $scope.st = window.pageYOffset;
      if ($scope.st > $scope.lastScrollTop) {
        $scope.direction = "down";
      } else {
        $scope.direction = "up";
      }

      $scope.lastScrollTop = $scope.st;
      $scope.$apply();
      console.log($scope.direction);
    });

    $scope.$on('$destroy', function() {
      unRegisterListener();
    });

  }
})()
