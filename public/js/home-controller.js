(function () {
  angular
    .module('app')
    .controller('homeController', homeController);


  homeController.$inject = ['$scope', '$timeout', '$rootScope', '$state', '$window','ScrollerService','$element','appData'];

  function homeController ($scope, $timeout, $rootScope, $state, $window,ScrollerService, $element, appData) {
    $scope.showDiv = false;
    $scope.showText = false;
    $scope.removeText = false;
    $rootScope.module = 'home';
    $scope.next = next;

    $timeout(function() {
      $scope.showDiv = true;
      $timeout(function() {
        $scope.showText = true;
      }, 300);
    }, 5);

    function next () {
      console.log('about');
      $state.go('about');
    }

    var unRegisterListener = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if($scope.showDiv) {
        event.preventDefault();
        $scope.showDiv = false;
        $scope.removeText = true;
        $timeout(function() {
          $scope.showText = false;
          $state.go(toState, toParams);
          console.log("state changed");
        }, 1000)
      }
    //  console.log(toState);
    });

    // $scope.lastScrollTop = 0;
    // $scope.direction = "";

    // angular.element($window).bind("scroll", function() {
    //   $scope.st = window.pageYOffset;
    //   if ($scope.st > $scope.lastScrollTop) {
    //     $scope.direction = "down";
    //   } else {
    //     $scope.direction = "up";
    //   }

    //   $scope.lastScrollTop = $scope.st;
    //   $scope.$apply();
    //   console.log($scope.direction);
    // });

    ScrollerService._bindScroll($element,0);

    $scope.$on('$destroy', function() {
      $scope.showText = false;
     unRegisterListener();
      ScrollerService._unbindScroll($element);
    });



  }
})()
