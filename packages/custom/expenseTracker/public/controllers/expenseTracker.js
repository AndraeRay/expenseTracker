(function () {
  'use strict';

  /* jshint -W098 */
  angular
    .module('mean.expenseTracker')
    .controller('ExpenseTrackerController', ExpenseTrackerController);

  ExpenseTrackerController.$inject = ['$scope', 'Categories'];

  function ExpenseTrackerController($scope, Categories) {
    // $scope.global = Global;
    // $scope.package = {
    //   name: 'expenseTracker'
    // };

    $scope.category = {
      input: '',
      list: ['one','two','three'],
      add: function (item){
        if(this.isValidAddition(item)) {
          this.list.push(item);
          this.input = '';
        }
      },
      isValidAddition: function(item){
        if(this.list.indexOf(item) == -1) {
          if(item.trim() !== ''){
            return true;
          }
        }
        return false;
      },
      remove: function (index){
        this.list.splice(index, 1);
      }
    }
  }
})();