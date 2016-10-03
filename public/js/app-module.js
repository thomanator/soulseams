(function () {
  'use strict';

  angular
    .module('app', ['ui.router', 'ngAnimate'])
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/templates/home.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: '/templates/aGoodDay.html'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: '/templates/contact.html'
      })
  }

}) ()
