(function(window) {
    'use strict';
    var App = window.App || {};

//Constructor for Truck object
//creating a new Truck would look like this:
//var myTruck = new App.Truck('007', new App.DataStore());

    function Truck(truckId, db) {
        this.truckId = truckId;  //unique identifier
        this.db = db;  //unique DataStore instance
    }

//order should be an object

    Truck.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        return this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function(printFn) {
        return this.db.getAll()
            .then(function(orders) {    //orders is the object we get from this.db.getAll()
                var customerIdArray = Object.keys(orders);
                console.log('Truck #' + this.truckId + ' has pending orders:');
                customerIdArray.forEach(function(id) {
                    console.log(orders[id]);
                    if (printFn) {
                      printFn(orders[id]);
                    }
                }.bind(this));  //pass a reference to the Truck instance to the forEach callback
            }.bind(this));   //pass a reference to the Truck instance to the anonymous function passed to .then
    };

//Attach Truck to the App object
    App.Truck = Truck;
    window.App = App;
})(window);
