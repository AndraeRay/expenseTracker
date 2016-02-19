describe('Category Controller', function() {

  beforeEach(module('ui.router'));
  beforeEach(module('mean.expenseTracker'));

  var $controller;
  var scope;

  beforeEach(inject(function(_$controller_, $rootScope, $state){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    scope = $rootScope.$new();
    var controller = _$controller_('ExpenseTrackerController', { $scope: scope });
  }));

  it('has a list of categories', function() {
    expect(scope.category).toBeDefined();
    expect(scope.category.list).toBeDefined();
  });

  it('can add a category to the list', function() {
    var category = 'Category7';
    scope.category.add(category);
    expect(scope.category.list[3]).toBe(category);
  });

  it('should not add duplicate categories to list', function() {
    var category, length;
    category = 'bills';
    scope.category.add(category);
    expect(scope.category.list[3]).toBe(category);
    length = scope.category.list.length;
    scope.category.add(category);
    expect(scope.category.list.length).toBe(length);
  });

  it('should not add invalid categories', function() {
    var category, length;
    category = ' ';
    length = scope.category.list.length;
    scope.category.add(category);
    category = '';
    scope.category.add(category);
    expect(scope.category.list.length).toBe(length);
  });

  it('can remove a cateogry from the list', function() {
    var category, index;
    index = 1;
    category = scope.category.list[index];
    scope.category.remove(index);
    expect(scope.category.list.indexOf(category)).toBe(-1);
  });
});