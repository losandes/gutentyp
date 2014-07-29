hilary.register('utils', {
    init: function ($, config) {
        "use strict";
        
        var initializeRichTextAreas,
            makeElement,
            insertNewElementBefore,
            insertNewElementInto,
            setText,
            addAttribute,
            attachEvent,
            updateTextarea,
            isFunction,
            getRandomString;

        initializeRichTextAreas = function () {
            // For each textarea matching `config.richTextAreaSelector`
            $(config.richTextInputSelector).each(function (index, element) {
                var _this = $(this);

                if(!_this.attr('id')) {
                    _this.attr('id', 'gutentyp_' + getRandomString());
                }

                // Insert a new editable div with data-for attribute pointing to id of current textarea
                var _newElement = $('<div />')
                    .addClass(config.richTextAreaSelector[0] == '.' ? config.richTextAreaSelector.substr(1) : config.richTextAreaSelector)
                    .attr('data-for', _this.attr('id') )
                    .html( _this.val() )
                    .attr('contenteditable', true)
                    .insertBefore(_this);

                // Hide the original textarea
                _this.addClass('hidden');
            });
        };

        makeElement = function (newElementType, domClass) {
            var _newElement = $('<' + (newElementType ? newElementType : 'div') + ' />');

            if(domClass != null && domClass != '') {
                _newElement.addClass(
                    domClass[0] == '.' ? domClass.substr(1) : domClass
                );
            }

            return _newElement;
        };

        insertNewElementBefore = function (newElementType, target, domClass) {
            if(target == null || target == '')
                return;

            var _newElement = makeElement(newElementType, domClass);

            _newElement.insertBefore($(target));
        };

        insertNewElementInto = function (newElementType, target, domClass) {
            if(target == null || target == '')
                return;

            var _newElement = makeElement(newElementType, domClass);

            _newElement.appendTo($(target));
        };

        setText = function (selector, newText) {
            $(selector).text(newText);
        };

        addAttribute = function (selector, newAttr, newValue) {
            $(selector).attr(newAttr, newValue);
        }

        attachEvent = function (selector, eventType, eventHandler) {
            if($.isFunction(eventHandler)) {
                $(selector).on(eventType, function (event) {
                    eventHandler(event);
                });
            }
        };

        updateTextarea = function (target) {
            $('textarea#' + $(target).attr('data-for')).html($(target).html());
        };

        isFunction = function (obj) {
            return $.isFunction(obj);
        };

        getRandomString = function (length)
        {
            var text = '';
            var possible = 'abcdefghijklmnopqrstuvwxyz';

            for(var i = 0; i < (length ? length : 5); i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        return {
            initializeRichTextAreas: initializeRichTextAreas,
            insertNewElementBefore: insertNewElementBefore,
            insertNewElementInto: insertNewElementInto,
            setText: setText,
            attachEvent: attachEvent,
            updateTextarea: updateTextarea,
            isFunction: isFunction
        };
    }
});
