"use strict";

describe("Categories Service", function () {
  var httpBackend, Categories, categoriesMock;

  beforeEach(module('ui.router'));
  beforeEach(module('mean.expenseTracker'));

  beforeEach(inject(function (_Categories_, $httpBackend) {
    httpBackend = $httpBackend;
    Categories = _Categories_;

    httpBackend.whenGET("/user/1/Categories").respond(categoriesMock);

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

  it("Should fetch categories for a user", function () {
    httpBackend.expect('GET', '/user/1/Categories');
  	Categories.get().then(function(response){
  		expect(response).toEqual(categoriesMock.categories);
  	});
    httpBackend.flush();
  });

});