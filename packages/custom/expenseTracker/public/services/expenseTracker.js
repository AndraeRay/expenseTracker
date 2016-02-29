
angular.module('mean.expenseTracker').factory('Categories', function($http) {
  return {
    get: function() {
      return $http.get('/api/categories')
        .then(function(result) {
          return result.data;
        });
    },
    set: function(list) {
      var body = {
        "categories": list
      }
      return $http.put('/api/categories', body) 
        .then(function(result){
          return 'success'
        });
    }
  };
});

