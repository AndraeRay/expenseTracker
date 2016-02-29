"use strict";

describe("Categories Service", function () {
  var httpBackend, Categories, categoriesMock;

  beforeEach(module('ui.router'));
  beforeEach(module('mean.expenseTracker'));

  beforeEach(inject(function (_Categories_, $httpBackend) {
    httpBackend = $httpBackend;
    Categories = _Categories_;

    httpBackend.whenGET("/api/categories").respond(categoriesMock);
    httpBackend.whenPUT("/api/categories").respond('success');


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
    httpBackend.expect('GET', '/api/categories');
  	Categories.get().then(function(response){
  		expect(response.categories).toEqual(categoriesMock.categories);
  	});
    httpBackend.flush();
  });  

  it("Should set categories for a user", function () {
  	var newCategories = ["childcare","medical"]
  	var body = {"categories":["childcare", "medical"]}
  	
    httpBackend.expect('PUT', '/api/categories', body);
  	Categories.set(newCategories).then(function(response){
  		expect(response).toEqual('success');
  	});
    httpBackend.flush();
  });

});