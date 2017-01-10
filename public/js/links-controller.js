(function () {
  angular
    .module('app')
    .controller('linksController', linksController);

  linksController.$inject = ['$scope', '$timeout', '$rootScope', '$state', '$http','$element','ScrollerService','appData','$element'];

  function linksController ($scope, $timeout, $rootScope, $state, $http, $element, ScrollerService, appData, $element) {
    $scope.navigate = false;
    $scope.showDiv = false;
    $scope.showText = false;
    $scope.removeText = false;
    $rootScope.module = 'link';

    $scope.prev = prev;

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
          $state.go(toState, toParams);
        }, 1000)
      }
    });

    $scope.$on('$destroy', function() {
      unRegisterListener();
      ScrollerService._unbindScroll($element);
    });

    function prev () {
      $state.go('contact');
    }

    ScrollerService._bindScroll($element,3);

  }
})()
