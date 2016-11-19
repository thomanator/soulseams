(function(){
  angular.module('app')
  .service('ScrollerService',ScrollerService);

  function ScrollerService($state,appData){

    this.switchState = function(state){
      $state.go(this.states[state]);
      //console.log(state);
    };

    this.detectScroll = function(e){
      if(!appData.canChangeState){
        return;
      }
      if(e.wheelDelta < 0) {
        appData.activeState-=1;
        if(appData.activeState < 0){
          appData.activeState = 0;
          return;
        }
      }else{
        //up
        console.log('up');
        appData.activeState+=1;
        if(appData.activeState > 2){
          appData.activeState = 2;
          return;
        }
      }
      //this.switchState(this.activeState);
      //console.log(appData.activeState);
      $state.go(appData.states[appData.activeState].state);
      appData.canChangeState = false;
      return appData.activeState;
    };

    this._bindScroll = function(element){
      element.bind('mousewheel',this.detectScroll);
    };

    this._unbindScroll = function(element){
      element.unbind('mousewheel',this.detectScroll);
    };


  }

})();
