(function () {
  angular
    .module('app')
    .directive('numLimit', function(){
      return {
        restrict: "A",
        link: function (scope, elm, attrs) {
          elm.bind('keypress', function(e){
            var char = String.fromCharCode(e.charCode);
            var allowed = '1234567890';
            if (allowed.indexOf(char) < 0) {
              e.preventDefault();
            }
            else if(e.charCode == 0){
              return true;
            }
          });
        }
      }      
    })
}) ()
