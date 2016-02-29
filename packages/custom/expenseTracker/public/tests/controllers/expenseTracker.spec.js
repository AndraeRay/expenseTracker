describe('Category Controller', function() {

  beforeEach(module('ui.router'));
  beforeEach(module('mean.expenseTracker'));

  var
  categories,
  categoriesMock,
  httpBackend, 
  scope, 
  createController,
  controller;

  beforeEach(inject(function(_$controller_, _$rootScope_, $httpBackend){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    httpBackend = $httpBackend;
    httpBackend.whenGET("/api/categories").respond(categoriesMock);

    controller = _$controller_;
    scope = _$rootScope_;

    createController = function() {
      return controller('ExpenseTrackerController', { '$scope': scope });
    }


  }));

  afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });


    categoriesMock = {
      "categories":[
        "bills",
        "transportation",
        "fun and eating out"
      ]
  };

  it('gets a list of categories', function() {
    httpBackend.expect('GET', '/api/categories')
    controller = createController();
    httpBackend.flush();
    expect(scope.category).toBeDefined();
    expect(scope.category.list).toBeDefined();
    expect(scope.category.list.length).toBe(3);

  });

  it('can add a category to the list', function() {
    var category = 'Category7';
    controller = createController();
    httpBackend.flush();
    scope.category.add(category);
    expect(scope.category.list[3]).toBe(category);
  });

  it('should not add duplicate categories to list', function() {
    var category, length;
    controller = createController();
    httpBackend.flush();
    category = 'clothes';
    scope.category.add(category);
    expect(scope.category.list[3]).toBe(category);
    length = scope.category.list.length;
    scope.category.add(category);
    expect(scope.category.list.length).toBe(length);
  });

  it('should not add invalid categories', function() {
    var category, length;
    controller = createController();
    httpBackend.flush();
    category = ' ';
    length = scope.category.list.length;
    scope.category.add(category);
    category = '';
    scope.category.add(category);
    expect(scope.category.list.length).toBe(length);
  });

  it('can remove a cateogry from the list', function() {
    var category, index;
    controller = createController();
    httpBackend.flush();
    index = 1;
    category = scope.category.list[index];
    scope.category.remove(index);
    expect(scope.category.list.indexOf(category)).toBe(-1);
  });

  it('can save updated categories list', function() {
    controller = createController();
    httpBackend.flush();
    scope.category.list = ['fun'];
    httpBackend.expect('PUT', '/api/categories','{"categories":["fun"]}').respond('success');

    scope.category.save();
    httpBackend.flush();

  })
});