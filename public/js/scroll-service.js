(function(){
  angular.module('app')
  .service('ScrollerService',ScrollerService);

  function ScrollerService($state,$timeout, appData){

    this.switchState = function(state){
      $state.go(this.states[state]);
      //console.log(state);
    };

    this.detectScroll = function(e){
      if(!appData.canChangeState){
        return;
      }
      if(e.deltaY < 0) {
        appData.activeState-=1;
        if(appData.activeState < 0){
          appData.activeState = 0;
          return;
        }
      }else{
        //up
        appData.activeState+=1;
        if(appData.activeState > 2){
          appData.activeState = 2;
          return;
        }
      }
      //this.switchState(this.activeState);
      //console.log(appData.activeState);
      $timeout(function(){
        $state.go(appData.states[appData.activeState].state);
      },900);
      appData.canChangeState = false;
      return appData.activeState;
    };

    this._bindScroll = function(element,activeState){
      element.bind('wheel',this.detectScroll);
      appData.activeState = activeState;
      appData.canChangeState = true;
    };

    this._unbindScroll = function(element){
      element.unbind('wheel',this.detectScroll);
    };


  }

})();
