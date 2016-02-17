(function () {
  'use strict';

  angular
    .module('mean.expenseTracker')
    .config(expenseTracker);

  expenseTracker.$inject = ['$stateProvider'];

  function expenseTracker($stateProvider) {
    $stateProvider.state('expenseTracker example page', {
      url: '/expenseTracker/example',
      templateUrl: 'expenseTracker/views/index.html'
    });
  }

})();
