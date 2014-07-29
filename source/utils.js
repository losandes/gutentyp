hilary.register('utils', {
"use strict";

    init: function ($) {

        // "Constants"
        var richTextInputSelector = '.richText',
            richTextAreaSelector = '.richTextArea',
            richTextToolbarSelector = '.richTextToolbar';
        
        // Methods
        var initializeRichTextAreas,
            makeElement,
            insertNewElementBefore,
            insertNewElementInto,
            setText,
            addAttribute,
            attachEvent,
            updateTextarea,
            isFunction;

        initializeRichTextAreas = function () {
            // For each textarea matching `richTextAreaSelector`
            $(richTextInputSelector).each(function (index, element) {
                
                if(!$(this).attr('id')) {
                    console.error('Gutentyp requires all textarea' + richTextInputSelector + ' elements to have an ID.');
                }

                // Insert a new editable div with data-for attribute pointing to id of current textarea
                var _newElement = $('<div />')
                    .addClass(richTextAreaSelector[0] == '.' ? richTextAreaSelector.substr(1) : richTextAreaSelector)
                    .attr('data-for', $(this).attr('id') )
                    .html( $(this).val() )
                    .attr('contenteditable', true)
                    .insertBefore($(this));

                // Hide the original textarea
                $(this).addClass('hidden');
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

        updateTextarea = function(target) {
            $('textarea#' + $(target).attr('data-for')).html($(target).html());
        };

        isFunction = function (obj) {
            return $.isFunction(obj);
        };

        return {
            // "Constants"
            richTextInputSelector: richTextInputSelector,
            richTextAreaSelector: richTextAreaSelector,
            richTextToolbarSelector: richTextToolbarSelector,

            // Methods
            initializeRichTextAreas: initializeRichTextAreas,
            insertNewElementBefore: insertNewElementBefore,
            insertNewElementInto: insertNewElementInto,
            setText: setText,
            attachEvent: attachEvent,
            updateTextarea: updateTextarea,
            isFunction: isFunction,
        };
    }
});
