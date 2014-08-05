/*jslint plusplus: true */
/*global hilary*/

hilary.register('gutentyp::utils', {
    init: function ($, config) {
        "use strict";
        
        var initializeRichTextAreas,
            makeElement,
            insertNewElementBefore,
            insertNewElementInto,
            setText,
            insertHtml,
            addClass,
            removeClass,
            toggleClass,
            addAttribute,
            getAttribute,
            getOrSetValue,
            clearForm,
            getClosest,
            getClosestAdjacent,
            getNext,
            getPrevious,
            attachEvent,
            updateTextarea,
            isFunction,
            isObject,
            getSelectedText,
            replaceSelectedText,
            pasteHtmlAtCursor,
            pasteHtml,
            selectRange,
            getCursorCoordinates,
            getRandomString,
            getCoordinates,
            setStyle;

        initializeRichTextAreas = function () {
            var allAreas = [];
            
            // For each textarea matching `config.richTextAreaSelector`
            $(config.selectors.toGutentypify).each(function (index, element) {
                var $this = $(this);

                if (!$this.attr('id')) {
                    $this.attr('id', 'gutentyp-' + getRandomString());
                }

                // Insert a new editable div with data-for attribute pointing to id of current textarea
                $('<div />')
                    .addClass(config.cssClasses.editor)
                    .attr('data-for', $this.attr('id'))
                    .html($this.val())
                    .attr('contenteditable', true)
                    .insertBefore($this);

                // Hide the original textarea
                $this.removeClass(config.cssClasses.toGutentypify);
                $this.addClass(config.cssClasses.hidden);
                $this.addClass(config.cssClasses.gutentypified);
                allAreas.push($this.attr('id'));
            });
            
            return allAreas;
        };

        makeElement = function (newElementType, domClass, attrPairs) {
            var newElement = $('<' + (newElementType || 'div') + ' />'),
                i;

            if (domClass && domClass !== null && domClass !== '') {
                newElement.addClass(
                    domClass[0] === '.' ? domClass.substr(1) : domClass
                );
            }

            if (typeof attrPairs !== 'undefined') {
                for (i = 0; i < attrPairs.length; i++) {
                    newElement.attr(attrPairs[i].key, attrPairs[i].value);
                }
            }

            return newElement;
        };

        insertNewElementBefore = function (newElementType, target, domClass, attrPairs) {
            if (!target || target === '') {
                return;
            }

            makeElement(newElementType, domClass, attrPairs)
                .insertBefore($(target));
        };

        insertNewElementInto = function (newElementType, target, domClass, attrPairs) {
            if (!target || target === '') {
                return;
            }
            
            if (typeof (newElementType) !== 'string' && newElementType.markup) {
                var markup = newElementType.markup;
                
                $(markup).appendTo($(target));
            } else {
                makeElement(newElementType, domClass, attrPairs)
                    .appendTo($(target));
            }
        };

        setText = function (selector, newText) {
            $(selector).text(newText);
        };
        
        insertHtml = function (selector, html) {
            $(selector).append(html);
        };
        
        addClass = function (selector, cssClass) {
            $(selector).addClass(cssClass);
        };
        
        removeClass = function (selector, cssClass) {
            $(selector).removeClass(cssClass);
        };
        
        toggleClass = function (selector, cssClass) {
            $(selector).toggleClass(cssClass);
        };
        
        addAttribute = function (selector, newAttr, newValue) {
            $(selector).attr(newAttr, newValue);
        };
        
        getAttribute = function (elemtnContext, attributeName) {
            return $(elemtnContext).attr(attributeName);
        };
        
        getOrSetValue = function (elemtnContext, value) {
            if (value) {
                $(elemtnContext).val(value);
                return value;
            } else {
                return $(elemtnContext).val();
            }
        };
        
        clearForm = function (formSelector) {
            $(formSelector).find('input').val('');
            $(formSelector).find('textarea').html('');
        };
        
        getClosest = function (currentNode, targetSelector) {
            return $(currentNode).closest(targetSelector);
        };
        
        getClosestAdjacent = function (currentNode, targetSelector) {
            return $(currentNode).siblings(targetSelector);
        };
        
        getNext = function (currentNode, targetSelector) {
            return $(currentNode).next(targetSelector);
        };
        
        getPrevious = function (currentNode, targetSelector) {
            return $(currentNode).prev(targetSelector);
        };

        attachEvent = function (options) {
            if (!options || $.isFunction(options.eventHandler) === false) {
                return false;
            }
            
            var $this = $(options.primarySelector);
            
            if (options.secondarySelector) {
                $this.on(options.eventType, options.secondarySelector, function (event) {
                    options.eventHandler(event.originalEvent);
                });
            } else {
                $this.on(options.eventType, function (event) {
                    options.eventHandler(event.originalEvent);
                });
            }
    
            addClass($this, config.cssClasses.hasEvents);
        };

        updateTextarea = function (target) {
            $('textarea#' + $(target).attr('data-for')).html($(target).html());
        };

        isFunction = function (obj) {
            return $.isFunction(obj);
        };
        
        isObject = function (obj) {
            return $.isPlainObject(obj);
        };
        
        getSelectedText = function () {
            var selected, container, i, len;
            
            if (typeof window.getSelection !== 'undefined') {
                selected = window.getSelection();
                if (selected.rangeCount) {
                    container = document.createElement('div');
                    
                    for (i = 0, len = selected.rangeCount; i < len; ++i) {
                        container.appendChild(selected.getRangeAt(i).cloneContents());
                    }
                    return container.innerHTML;
                }
            } else if (typeof document.selection !== 'undefined') {
                if (document.selection.type === 'Text') {
                    return document.selection.createRange().htmlText;
                }
            }
        };
        
        replaceSelectedText = function (replacementText) {
            var range, div, frag, child;
            if (window.getSelection && window.getSelection().getRangeAt) {
                range = window.getSelection().getRangeAt(0);
                range.deleteContents();
                div = document.createElement("div");
                div.innerHTML = replacementText;
                frag = document.createDocumentFragment();
                
                while ((child = div.firstChild)) {
                    frag.appendChild(child);
                }
                
                range.insertNode(frag);
            } else if (document.selection && document.selection.createRange) {
                range = document.selection.createRange();
                range.pasteHTML(replacementText);
            }
        };
        
        // Helper function because different browsers don't always cleanly implement this feature
        // Inspired by http://stackoverflow.com/a/6691294
        pasteHtmlAtCursor = function (html, selectPastedContent) {
            var sel;
            
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
            } else {
                sel = document.selection;
                if (sel.type === 'Control') {
                    sel = undefined;
                }
            }
            
            pasteHtml(sel);
        };
        
        // Helper function because different browsers don't always cleanly implement this feature
        // Inspired by http://stackoverflow.com/a/6691294
        pasteHtml = function (sel, html, selectPastedContent) {
            var range, el, frag, node, lastNode, firstNode, originalRange;
            
            if(!sel) {
                return false;
            }
            
            if (sel.isClone && window.getSelection) {
                // if the coordinates are a clone of the range object, then we need to 
                selectRange(sel);
                sel = window.getSelection();
            }

            if (window.getSelection) {
                // IE9 and non-IE
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // only relatively recently standardized and is not supported in
                    // some browsers (IE9, for one)
                    el = document.createElement("div");
                    el.innerHTML = html;
                    frag = document.createDocumentFragment();
                    
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    
                    firstNode = frag.firstChild;
                    range.insertNode(frag);

                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        if (selectPastedContent) {
                            range.setStartBefore(firstNode);
                        } else {
                            range.collapse(true);
                        }
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            } else if (sel.type !== "Control") {
                // IE < 9
                originalRange = sel.createRange();
                originalRange.collapse(true);
                sel.createRange().pasteHTML(html);
                if (selectPastedContent) {
                    range = sel.createRange();
                    range.setEndPoint("StartToStart", originalRange);
                    range.select();
                }
            }
        };
        
        getCursorCoordinates = function () {
            var sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return $.extend({ isClone: true }, sel);
            }
            
            return false;
        };
        
        selectRange = function (selectioData) {
            var selected, range = document.createRange();
            range.setStart(selectioData.baseNode || selectioData.anchorNode,selectioData.baseOffset || selectioData.anchorOffset);
            range.setEnd(selectioData.extentNode || selectioData.focusNode, selectioData.extentOffset || selectioData.focusOffset);
            selected = window.getSelection();
            selected.removeAllRanges();
            selected.addRange(range);
        };

        getRandomString = function (length) {
            var text = '',
                possible = 'abcdefghijklmnopqrstuvwxyz',
                i;

            for (i = 0; i < (length || 5); i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
        };
        
        getCoordinates = function (selector, secondarySelector) {
            var result = $(selector)[0].getBoundingClientRect();
            result.offset = $(selector).offset();
            
            if (secondarySelector) {
                result.moveLeft = (result.left + (result.width / 2) - (getCoordinates(secondarySelector).width / 2));
                result.moveTop = (result.offset.top + result.height + 6);
                result.moveRight = (result.right + (result.width / 2) - (getCoordinates(secondarySelector).width / 2));
                result.moveBottom = (result.offset.bottom + result.height + 6);
            }
            return result;
        };
        
        setStyle = function (selector, style) {
            return $(selector).attr('style', style);
        };

        return {
            initializeRichTextAreas: initializeRichTextAreas,
            insertNewElementBefore: insertNewElementBefore,
            insertNewElementInto: insertNewElementInto,
            setText: setText,
            insertHtml: insertHtml,
            addClass: addClass,
            removeClass: removeClass,
            toggleClass: toggleClass,
            getAttribute: getAttribute,
            getOrSetValue: getOrSetValue,
            clearForm: clearForm,
            getClosest: getClosest,
            getClosestAdjacent: getClosestAdjacent,
            getNext: getNext,
            getPrevious: getPrevious,
            attachEvent: attachEvent,
            updateTextarea: updateTextarea,
            isFunction: isFunction,
            isObject: isObject,
            getSelectedText: getSelectedText,
            replaceSelectedText: replaceSelectedText,
            pasteHtmlAtCursor: pasteHtmlAtCursor,
            pasteHtml: pasteHtml,
            selectRange: selectRange,
            getCursorCoordinates: getCursorCoordinates,
            getRandomString: getRandomString,
            
            /**
            *   Get the coordinates of an element
            *   @selector (DOM element or jQuery selector): the element to get the coordinates of
            *   @secondarySelector (DOM element or jQuery selector): if you are getting coordinates to place an
            *       element near another one, then you can pass in a selector for the element that you intend to move
            */
            getCoordinates: getCoordinates,
            setStyle: setStyle
        };
    }
});
