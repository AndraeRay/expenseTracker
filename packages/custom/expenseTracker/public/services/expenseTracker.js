
angular.module('mean.expenseTracker').factory('Categories', function($http) {
  return {
    get: function() {    
      return $http.get('/user/1/Categories')
        .then(function(result) {
          return result.data;
        });
    }
  };
});

