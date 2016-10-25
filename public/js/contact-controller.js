(function () {
  angular
    .module('app')
    .controller('contactController', contactController);

  contactController.$inject = ['$scope', '$timeout', '$rootScope', '$state', '$http'];

  function contactController ($scope, $timeout, $rootScope, $state, $http) {
    $scope.navigate = false;
    $scope.showDiv = false;
    $scope.showText = false;
    $scope.removeText = false;
    $scope.contact = {};
    $rootScope.module = 'partner';

    $scope.next = next;
    $scope.prev = prev;
    $scope.submit = submit;

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

    function next () {
      $state.go('partner');
    }

    function prev () {
      $state.go('contact');
    }

    function submit () {
      if(valid()) {
        $http({
          url: '/enquiry',
          method: 'POST',
          data: {

          }
        }).then(function () {
          console.log('success ', data);
          if(data.data.status == 'success') {
            $scope.showSuccessMessage = true;
          }
          else {
            $scope.showErrorMessage = true;
            $scope.errorMessage = data.data.message || 'Could not complete your request. Please try later';
          }
        }, function (error) {
          console.log('error', error);
          $scope.showErrorMessage = true;
          $scope.errorMessage = error.data.statusText;
        });
      }
    }

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function valid () {
      var valid = true;
      $scope.error = '';
      if(!$scope.contact.name || !$scope.contact.name.trim().length) {
        valid = false;
        $scope.error = 'Name';
      }
      if(!$scope.contact.number || !$scope.contact.number.length) {
        if($scope.error.length) {
          $scope.error += ', ';
        }
        $scope.error += 'Number';
        valid = false;
      }
      if(!$scope.contact.description || !$scope.contact.description.trim().length) {
        if($scope.error.length) {
          $scope.error += ', ';
        }
        $scope.error += 'Description';
        valid = false;
      }
      if(!$scope.contact.email || !$scope.contact.email.trim().length) {
        if($scope.error.length) {
          $scope.error += ', ';
        }
        $scope.error += 'Email ID';
        valid = false;
      }
      
      if($scope.error.length) {
        $scope.error += ' is/are required.';
        valid = false;
      }

      if($scope.contact.number && $scope.contact.number.length > 10){
        $scope.error += ' Enter a valid phone number.';
        valid = false;
      }

      if($scope.contact.email && !validateEmail($scope.contact.email)) {
        $scope.error += ' Enter a valid email id.'
        valid = false;
      }
      console.log($scope.error, valid);
      return valid;
    }

  }
})()
