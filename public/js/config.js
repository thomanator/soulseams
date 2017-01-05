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
      },
      {
        name: 'Links',
        state: 'link'
      }
    ],
    canChangeState: true
  });

})();
