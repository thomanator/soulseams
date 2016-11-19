(function(){
  angular.module('app')
  .value('appData',{
    activeState: 0,
    states : [
      {
        name: 'Home',
        state: 'home'
      },
      {
        name: 'About',
        state: 'about'
      },
      {
        name: 'Contact',
        state: 'contact'
      }
    ],
    canChangeState: true
  });

})();
