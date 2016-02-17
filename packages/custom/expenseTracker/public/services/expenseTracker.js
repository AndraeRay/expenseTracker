(function () {
  'use strict';

  angular
    .module('mean.expenseTracker')
    .factory('ExpenseTracker', ExpenseTracker);

  ExpenseTracker.$inject = [];

  function ExpenseTracker() {
    return {
      name: 'expenseTracker'
    };
  }
})();
