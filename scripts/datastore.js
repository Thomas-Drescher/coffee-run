(function(window) {
    'use strict';
    var App = window.App || {};
    var Promise = window.Promise;

    //Constructor for DataStore object

    function DataStore() {
        this.data = {};
    }

//Helper function used to create, resolve, and return a promise

    function promiseResolvedWith(value) {
        var promise = new Promise(function(resolve, reject) {
            resolve(value);
        });
        return promise;
    }

    DataStore.prototype.add = function(key, val) {
        return promiseResolvedWith(null);

    };

    DataStore.prototype.get = function(key) {
        return promiseResolvedWith(this.data[key]);
    };

    DataStore.prototype.getAll = function() {
        return promiseResolvedWith(this.data);
    };

    DataStore.prototype.remove = function(key) {
        delete this.data[key];
        return promiseResolvedWith(null);
    };

// Attach DataStore to the App object
    App.DataStore = DataStore;
    window.App = App;
})(window);
