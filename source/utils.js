hilary.register('utils', {
"use strict";

    init: function ($) {

        var richTextInputSelector = '.richText'
        var richTextAreaSelector = '.richTextArea';
        var richTextToolbarSelector = '.richTextToolbar';

        var initializeRichTextAreas = function () {
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

            _newElement.insertBefore($(target));
        };

        var insertNewElementInto = function (newElementType, target, domClass) {
            if(target == null || target == '')
                return;

            var _newElement = makeElement(newElementType, domClass);

            _newElement.appendTo($(target));
        };

        var setText = function (selector, newText) {
            $(selector).text(newText);
        };

        var addAttribute = function (selector, newAttr, newValue) {
            $(selector).attr(newAttr, newValue);
        }

        var attachEvent = function (selector, eventType, eventHandler) {
            if($.isFunction(eventHandler)) {
                $(selector).on(eventType, function (event) {
                    eventHandler(event);
                });
            }
        };

        var updateTextarea = function(target) {
            $('textarea#' + $(target).attr('data-for')).html($(target).html());
        };

        var isFunction = function (obj) {
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
