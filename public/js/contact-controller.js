(function () {
  angular
    .module('app')
    .controller('contactController', contactController);

  contactController.$inject = ['$scope', '$timeout', '$rootScope', '$state'];

  function contactController ($scope, $timeout, $rootScope, $state) {
    $scope.navigate = false;
    $scope.showDiv = false;
    $scope.showText = false;
    $scope.removeText = false;
    $rootScope.module = 'partner';
    $timeout(function() {
      $scope.showText = true; 
      // $timeout(function() {
      //   $scope.showText = true; 
      // }, 1150);
    }, 1);

    var unRegisterListener = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if(!$scope.navigate) {
        event.preventDefault();
        $scope.showDiv = false;
        $scope.removeText = true;
        $timeout(function() {
          $scope.showText = false;
          $scope.navigate = true;
          console.log('go to ' + toState);
          $state.go(toState, toParams);
        }, 1000)
      }
      console.log(toState);
    });

    $scope.$on('$destroy', function() {
      unRegisterListener();
    });

  }
})()
