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
        templateUrl: '/templates/home.html',
        controller: 'homeController'
      })
      .state('about', {
        url: '/about',
        templateUrl: '/templates/aGoodDay.html',
        controller: 'aboutController'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: '/templates/contact.html',
        controller: 'contactController'
      })
      .state('partner', {
        url: '/partner',
        templateUrl: '/templates/partner.html'
      })
      .state('link', {
        url: '/links',
        templateUrl: '/templates/links.html',
        controller: 'linksController'
      })
  }

}) ()
