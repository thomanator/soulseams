(function(){

    angular.module('app')
    .directive('scrollIndicator',scrollIndicator)
    .controller('scrollIndicatorController',['$scope','appData',function($scope,appData){
        var vm = this;


        vm.appData = appData;
    }]);

    function scrollIndicator(){

      return {

        restrict: 'E',
        templateUrl: '/js/scroll-indicator-directive/scroll-indicator.html',
        controller: 'scrollIndicatorController',
        controllerAs: 'scrollCtrl',
        scope: {},
        replace: true

      };




    }


})();
