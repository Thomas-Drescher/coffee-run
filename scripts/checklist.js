(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

//Constructor for Checklist object

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector); //assign jQuery-wrapped collection object to instance variable
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    CheckList.prototype.addClickHandler = function(fn) {
      //use the event delegation pattern to filter out click events not on input elements
        this.$element.on('click', 'input', function(event) {
            var email = event.target.value;

            fn(email)
                .then(function() {
                    this.removeRow(email);
                }.bind(this));   //pass a reference to the Checklist instance to the anonymous function passed to .then
        }.bind(this)); //pass a reference to the CheckList instance to the anonymous function passed to .on
    };

    CheckList.prototype.addRow = function(coffeeOrder) {
        // Remove any existing rows that match the email address
        this.removeRow(coffeeOrder.emailAddress);
        // Create a new instance of a row, using the coffee order info
        var rowElement = new Row(coffeeOrder);

        // Add the new row instance's $element property to the CheckList
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function(email) {
        this.$element.find('[value ="' + email + '"]').closest('[data-coffee-order="checkbox"]').remove();
    };

//Constructor for Row objects

    function Row(coffeeOrder) {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }

        description += coffeeOrder.coffee + ', ';
        description += '(' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }
    App.CheckList = CheckList;
    window.App = App;
})(window);
