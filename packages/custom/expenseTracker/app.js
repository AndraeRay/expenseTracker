'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var ExpenseTracker = new Module('expenseTracker');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
ExpenseTracker.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  ExpenseTracker.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  ExpenseTracker.menus.add({
    title: 'expenseTracker example page',
    link: 'expenseTracker example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  ExpenseTracker.aggregateAsset('css', 'expenseTracker.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    ExpenseTracker.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    ExpenseTracker.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    ExpenseTracker.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    var mongoose = require('mongoose');
    require('./server/models/Posts');
    require('./server/models/Comments');
    require('./server/models/Categories');

    mongoose.connect('mongodb://localhost/nodetest1');


  return ExpenseTracker;
});
