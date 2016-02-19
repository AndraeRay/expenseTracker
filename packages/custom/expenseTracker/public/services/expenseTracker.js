
angular.module('mean.expenseTracker').factory('Categories', function($http) {
  return {
    get: function() {
      var userId = 1;    
      return $http.get('/user/'+ userId +'/Categories')
        .then(function(result) {
          return result.data.categories;
        });
    }
  };
});

