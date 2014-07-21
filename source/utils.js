"use strict";

hilary.register('utils', {
    init: function ($) {

        var richTextSelector = '.richText';
        var richTextToolbarSelector = '.richTextToolbar';

        var makeElement = function (newElementType, domClass) {
            var _newElement = $('<' + (newElementType ? newElementType : 'div') + ' />');

            if(domClass != null && domClass != '') {
                _newElement.addClass(
                    domClass[0] == '.' ? domClass.substr(1) : domClass
                );
            }

            return _newElement;
        };

        var insertNewElementBefore = function (newElementType, target, domClass) {
            if(target == null || target == '')
                return;

            var _newElement = makeElement(newElementType, domClass);

            _newElement.insertBefore(target);
        };

        var insertNewElementInto = function (newElementType, target, domClass) {
            if(target == null || target == '')
                return;

            var _newElement = makeElement(newElementType, domClass);

            _newElement.appendTo(target);
        };

        var setText = function (selector, newText) {
            $(selector).text(newText);
        };

        var setContentEditable = function(selector) {
            $(selector).attr('contenteditable', true);
        }

        var attachEvent = function (selector, eventHandler) {
            if($.isFunction(eventHandler)) {
                $(selector).on('click', function (event) {
                    eventHandler(event);
                });
            }
        };

        var isFunction = function (obj) {
            return $.isFunction(obj);
        };


        return {
            richTextSelector: richTextSelector,
            richTextToolbarSelector: richTextToolbarSelector,

            insertNewElementBefore: insertNewElementBefore,
            insertNewElementInto: insertNewElementInto,
            setText: setText,
            setContentEditable: setContentEditable,
            attachEvent: attachEvent,
            isFunction: isFunction,
        };
    }
});