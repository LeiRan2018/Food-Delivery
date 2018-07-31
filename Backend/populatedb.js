#! /usr/bin/env node

console.log('This script populates some test dishes, customers, genres and dishinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Dish = require('./models/dish')
var Customer = require('./models/customer')
var Genre = require('./models/genre')
var DishInstance = require('./models/dishinstance')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var customers = []
var genres = []
var dishes = []
var dishinstances = []

function customerCreate(first_name, last_name, address, cb) {
  customerdetail = {first_name:first_name , last_name: last_name, address: address }
  
  var customer = new Customer(customerdetail);
       
  customer.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Customer: ' + customer);
    customers.push(customer)
    cb(null, customer)
  }  );
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function dishCreate(name, price, status, genre, cb) {
  bookdetail = { 
    name: name,
    price: price,
    status: status
  }
  if (genre != false) bookdetail.genre = genre
    
  var dish = new Dish(bookdetail);    
  dish.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Dish: ' + dish);
    dishes.push(dish)
    cb(null, dish)
  }  );
}


// function dishInstanceCreate(dish, customer, cb) {
//   bookinstancedetail = { 
//     dish: dish
//   }    
//   if (customer != false) bookinstancedetail.customer = customer
    
//   var dishinstance = new DishInstance(bookinstancedetail);    
//   dishinstance.save(function (err) {
//     if (err) {
//       console.log('ERROR CREATING DishInstance: ' + dishinstance);
//       cb(err, null)
//       return
//     }
//     console.log('New DishInstance: ' + dishinstance);
//     dishinstances.push(dishinstance)
//     cb(null, dish)
//   }  );
// }


function createGenreCustomers(cb) {
    async.parallel([
        function(callback) {
          customerCreate('Patrick', 'Rothfuss', 'Ottawa', callback);
        },
        function(callback) {
          customerCreate('Ben', 'Bova', 'Ottawa', callback);
        },
        function(callback) {
          customerCreate('Isaac', 'Asimov', 'Beijing', callback);
        },
        
        function(callback) {
          genreCreate("Chinese", callback);
        },
        function(callback) {
          genreCreate("French", callback);
        },
        function(callback) {
          genreCreate("Japanese", callback);
        },
        ],
        // optional callback
        cb);
}


function createDishs(cb) {
    async.parallel([
        function(callback) {
          dishCreate('noodle', '7.8', 'Available', genres[0], callback);
        },
        function(callback) {
          dishCreate("sushi", '9.2', 'Available', genres[2], callback);
        },
        function(callback) {
          dishCreate('fries', '5.3', 'Available', genres[1], callback)
        }
        ],
        // optional callback
        cb);
}


// function createDishInstances(cb) {
//     async.parallel([
//         function(callback) {
//           dishInstanceCreate(dishes[0], customers[0], callback)
//         },
//         function(callback) {
//           dishInstanceCreate(dishes[0], false, callback)
//         },
//         function(callback) {
//           dishInstanceCreate(dishes[0], false, callback)
//         },
//         function(callback) {
//           dishInstanceCreate(dishes[1], customers[1], callback)
//         },
//         function(callback) {
//           dishInstanceCreate(dishes[1], false, callback)
//         },
//         function(callback) {
//           dishInstanceCreate(dishes[1], false, callback)
//         },
//         function(callback) {
//           dishInstanceCreate(dishes[2], customers[2], callback)
//         }
//         ],
//         // Optional callback
//         cb);
// }



async.series([
    createGenreCustomers,
    createDishs,
    // createDishInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+dishinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




