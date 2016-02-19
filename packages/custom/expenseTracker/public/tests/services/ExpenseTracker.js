"use strict";

describe("reddit api service", function () {
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
  		"Categories":[
      	"bills",
      	"transportation",
      	"fun and eating out"
   		]
	};

  it("Should fetch categories for a user", function () {
    httpBackend.expect('GET', '/user/1/Categories');
  	Categories.get();
    httpBackend.flush();
  });

});