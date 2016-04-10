angular.module('LoftPayment', [
  'ngRoute',
  'mobile-angular-ui',
  'LoftPayment.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});