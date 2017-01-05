(function () {
  angular
    .module('app')
    .controller('aboutController', aboutController);

  aboutController.$inject = ['$scope', '$timeout', '$rootScope', '$state', '$http','$element','ScrollerService','appData','$element'];

  function aboutController ($scope, $timeout, $rootScope, $state, $http, $element, ScrollerService, appData, $element) {
    $scope.showDiv = false;
    $scope.showText = false;
    $scope.removeText = false;
    $scope.showLine = false;
    $scope.showNote = false;
    $rootScope.module = 'about';
    $scope.getEmailId = false;
    $scope.showToast = showToast;
    $scope.submit = submit;

    $scope.next = next;
    $scope.prev = prev;

      ScrollerService._bindScroll($element,1);

    // $timeout(function() {
    //   $scope.showDiv = true;
    //   $timeout(function() {
    //     $scope.showText = true;
    //     $timeout(function() {
    //       $scope.showLine = true;
    //       $timeout(function() {
    //         $scope.showNote = true;
    //       }, 700);
    //     }, 1000)
    //   }, 1150);
    // }, 5);

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
      }, 150);
    }, 1);

    function next () {
      $state.go('contact');
    }

    function prev () {
      $state.go('home');
    }

    var unRegisterListener = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if($scope.showDiv) {
        event.preventDefault();
        $scope.showDiv = false;
        // $timeout(function() {
          $scope.removeText = true;
          $scope.showNote = false;
          $timeout(function() {
          $scope.showText = false;
            $state.go(toState, toParams);
          }, 900);
        // }, 1000)
      }
      console.log(toState);
    });

    $scope.$on('$destroy', function() {
      unRegisterListener();

      ScrollerService._unbindScroll($element);
    });

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function showToast () {
      console.log('showToast', $scope.getEmailId);
      $scope.getEmailId = true;
    }

    function submit () {
      if(validateEmail($scope.email)) {
        $http({
          url: '/goodDayEnquiry',
          method: 'POST',
          data: {
            email: $scope.email
          }
        }).then(function (data) {
          console.log('success ', data);
          if(data.data.status == 'success') {
            $scope.getEmailId = false;
            $scope.successMessage = true;
            $scope.email = undefined;
          }
          else {
            $scope.showErrorMessage = true;
            $scope.getEmailId = false;
            $scope.errorMessage = data.data.message || '. Please try later';
          }
        }, function (error) {
          console.log('error', error);
          $scope.getEmailId = false;
          $scope.showErrorMessage = true;
          $scope.errorMessage = error.statusText;
        });
      }
    }

  }
})()
