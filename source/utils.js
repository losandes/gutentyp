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
            toggleClass,
            addAttribute,
            getAttribute,
            getClosest,
            attachEvent,
            updateTextarea,
            isFunction,
            getSelectedText,
            replaceSelectedText,
            pasteHtmlAtCursor,
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
        
        toggleClass = function (selector, cssClass) {
            $(selector).toggleClass(cssClass);
        };
        
        addAttribute = function (selector, newAttr, newValue) {
            $(selector).attr(newAttr, newValue);
        };
        
        getAttribute = function (elemtnContext, attributeName) {
            return $(elemtnContext).attr(attributeName);
        };
        
        getClosest = function (currentNode, targetSelector) {
            return $(currentNode).closest(targetSelector);
        }

        attachEvent = function (selector, eventType, eventHandler) {
            if ($.isFunction(eventHandler)) {
                var $this = $(selector);
                
                $this.on(eventType, function (event) {
                    eventHandler(event.originalEvent);
                });
                
                addClass($this, config.cssClasses.hasEvents);
            }
            
//            if (typeof(obj) === 'string') {
//                obj = $(obj)[0];
//            } else if (obj instanceof $) {
//                obj = obj[0];
//            }
//            
//            if ($.isFunction(eventHandler)) {
//                if (obj.addEventListener) {
//                    obj.addEventListener(eventType, eventHandler, false);
//                    return;
//                }
//
//                obj.attachEvent('on' + eventType, eventHandler);
//            }            
        };

        updateTextarea = function (target) {
            $('textarea#' + $(target).attr('data-for')).html($(target).html());
        };

        isFunction = function (obj) {
            return $.isFunction(obj);
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
                
                while ( (child = div.firstChild) ) {
                    frag.appendChild(child);
                }
                
                range.insertNode(frag);
            } else if (document.selection && document.selection.createRange) {
                range = document.selection.createRange();
                range.pasteHTML(replacementText);
            }
        };
        
        pasteHtmlAtCursor = function (html, selectPastedContent) {
            // Helper function because different browsers don't always cleanly implement this feature
            // From http://stackoverflow.com/a/6691294

            var sel, range, el, frag, node, lastNode, firstNode, originalRange;
            
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // only relatively recently standardized and is not supported in
                    // some browsers (IE9, for one)
                    el = document.createElement("div");
                    el.innerHTML = html;
                    frag = document.createDocumentFragment();
                    
                    while ( (node = el.firstChild) ) {
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
            } else if ( (sel = document.selection) && sel.type !== "Control") {
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

        getRandomString = function (length) {
            var text = '',
                possible = 'abcdefghijklmnopqrstuvwxyz',
                i;

            for (i = 0; i < (length || 5); i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
        };
        
        getCoordinates = function (selector) {
            var result = $(selector)[0].getBoundingClientRect();
            result.offset = $(selector).offset();
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
            toggleClass: toggleClass,
            getAttribute: getAttribute,
            getClosest: getClosest,
            attachEvent: attachEvent,
            updateTextarea: updateTextarea,
            isFunction: isFunction,
            getSelectedText: getSelectedText,
            replaceSelectedText: replaceSelectedText,
            pasteHtmlAtCursor: pasteHtmlAtCursor,
            getRandomString: getRandomString,
            getCoordinates: getCoordinates,
            setStyle: setStyle
        };
    }
});
