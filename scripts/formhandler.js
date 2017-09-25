(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

//Constructor for FormHandler object

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);  // assign jQuery-wrapped collection  object to instance variable
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {  //$(this) is a jQuery-wrapped formElement, which allows us to call serializeArray
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data)
                .then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this)); //pass a reference to the FormHandler instance to the anonymous function passed to .then

        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');

        //Use the event delegation pattern to filter out events created by anything but the [name="emaillAdress"] field
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
