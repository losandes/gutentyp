/*jslint plusplus: true */
/*global hilary, console*/

hilary.register('gutentyp::dom', {
    init: function ($, config) {
        "use strict";
        
        var initializeRichTextAreas,
            makeElement,
            insertNewElementBefore,
            insertNewElementInto,
            insertHtmlBefore,
            insertHtmlAfter,
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
            exists,
            attachEvent,
            triggerEvent,
            updateTextarea,
            isFunction,
            isObject,
            isArray,
            hasAncestor,
            getSelectedText,
            replaceSelectedText,
            pasteHtmlAtCursor,
            pasteHtml,
            selectRange,
            getSelectedParentNode,
            selectionIsInEditor,
            getCursorCoordinates,
            getRandomString,
            getCoordinates,
            setStyle,
            closestForm,
            formToJson;

        initializeRichTextAreas = function () {
            var allAreas = [];
            
            // For each textarea matching `config.richTextAreaSelector`
            $(config.selectors.toGutentypify).each(function (index, element) {
                var $this = $(this),
                    editor;

                if (!$this.attr('id')) {
                    $this.attr('id', 'gutentyp-' + getRandomString());
                }

                // Insert a new editable div with data-for attribute pointing to id of current textarea
                editor = $('<div />')
                    .addClass(config.cssClasses.editor)
                    .attr('data-for', $this.attr('id'))
                    .html($this.val())
                    .attr('contenteditable', true)
                    .insertBefore($this);
//                $('<div />')
//                    .addClass(config.cssClasses.toolbar)
//                    .insertBefore(editor);

                // Hide the original textarea
                $this.removeClass(config.cssClasses.toGutentypify);
                $this.addClass(config.cssClasses.hidden);
                $this.addClass(config.cssClasses.gutentypified);
                allAreas.push($this.attr('id'));
            });
            
            return allAreas;
        };

        makeElement = function (newElementType, domClass, attrPairs, innerHtml, returnAsString) {
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
            
            if (typeof innerHtml !== 'undefined') {
                newElement.html(innerHtml);
            }
            
            if (returnAsString) {
                return newElement.prop('outerHTML');
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
        
        insertHtmlBefore = function (selector, html) {
            return $(selector).before(html);
        };
        
        insertHtmlAfter = function (selector, html) {
            return $(selector).after(html);
        };

        setText = function (selector, newText) {
            return $(selector).text(newText);
        };
        
        insertHtml = function (selector, html) {
            return $(selector).append(html);
        };
        
        addClass = function (selector, cssClass) {
            return $(selector).addClass(cssClass);
        };
        
        removeClass = function (selector, cssClass) {
            return $(selector).removeClass(cssClass);
        };
        
        toggleClass = function (selector, cssClass) {
            return $(selector).toggleClass(cssClass);
        };
        
        addAttribute = function (selector, newAttr, newValue) {
            return $(selector).attr(newAttr, newValue);
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
            var form = closestForm(formSelector);
            form.val('');
            
            if (form.is('textarea')) {
                form.html('');
            }
            
            form.find(':input').val('');
            form.find('textarea').html('');
            
            return form.find('.alert').addClass(config.cssClasses.hidden);
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
        
        exists = function (selector) {
            return $(selector).length > 0;  
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
    
            return addClass($this, config.cssClasses.hasEvents);
        };
        
        triggerEvent = function (domElement, eventName) {

            var event;
            
            if (domElement instanceof $) {
                domElement = domElement[0];
            }

            if (document.createEvent) {

                event = document.createEvent("HTMLEvents");
                event.initEvent(eventName, true, true);
                event.eventName = eventName;
                domElement.dispatchEvent(event);
            } else {

                event = document.createEventObject();
                event.eventType = eventName;
                event.eventName = eventName;
                domElement.fireEvent("on" + event.eventType, event);
            }
            
            $(domElement).trigger(eventName);
        };


        updateTextarea = function (target) {
            var textArea = $('textarea#' + $(target).attr('data-for'));
            
            if (textArea.is('textarea')) {
                textArea.html($(target).html());
            }
            
            textArea.val($(target).html());
            triggerEvent(textArea[0], 'change');
            return target;
        };

        isFunction = function (obj) {
            return $.isFunction(obj);
        };
        
        isObject = function (obj) {
            return $.isPlainObject(obj);
        };
        
        isArray = function (obj) {
            return $.isArray(obj);
        };
        
        hasAncestor = function (selector, ancestor) {
            if ($(selector).parents(ancestor).length !== 0) {
                return true;
            } else if (typeof ancestor === 'string' && $(selector).hasClass(ancestor)) {
                return true;
            } else if (typeof ancestor === 'string' && $(selector).hasClass(ancestor.substring(1))) {
                return true;
            }
            
            return false;
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
        pasteHtmlAtCursor = function (html, selectPastedContent, event) {
            var sel, gutenArea;
            
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
            } else {
                sel = document.selection;
                if (sel.type === 'Control') {
                    sel = undefined;
                }
            }
            
            if (event && $(getSelectedParentNode()).closest(config.selectors.editor).length === 0) {
                gutenArea = getClosestAdjacent(getClosest(event.target, config.selectors.toolbar), config.selectors.editor)
                    .first();
                insertHtml(gutenArea, html);
            }
            
            pasteHtml(sel, html, selectPastedContent);
        };
        
        // Helper function because different browsers don't always cleanly implement this feature
        // Inspired by http://stackoverflow.com/a/6691294
        pasteHtml = function (sel, html, selectPastedContent) {
            var range, el, frag, node, lastNode, firstNode, originalRange;
            
            if (!sel) {
                return false;
            }
            
            if (selectPastedContent === undefined) {
                selectPastedContent = true;
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
                return $.extend({ isClone: true }, sel, sel.getRangeAt(0));
            }
            
            return false;
        };
        
        selectRange = function (selectionData) {
            try {
                var selected, node1, node2, startNode, endNode, offset1, offset2, startOffset, endOffset, range = document.createRange();
                node1 = selectionData.startContainer || selectionData.baseNode || selectionData.anchorNode;
                node2 = selectionData.endContainer || selectionData.extentNode || selectionData.focusNode;
                offset1 = selectionData.startOffset || selectionData.baseOffset || selectionData.anchorOffset;
                offset2 = selectionData.endOffset || selectionData.extentOffset || selectionData.focusOffset;
                
                if (offset2 > offset1) {
                    startNode = node1;
                    startOffset = offset1;
                    endNode = node2;
                    endOffset = offset2;
                } else {
                    startNode = node2;
                    startOffset = offset2;
                    endNode = node1;
                    endOffset = offset1;
                }
                
                range.setStart(startNode, startOffset);
                range.setEnd(endNode, endOffset);
                selected = window.getSelection();
                selected.removeAllRanges();
                selected.addRange(range);
            } catch (e) {
                console.log(e);
            }
        };
        
        getSelectedParentNode = function (selection) {
            var node, range;
            
            if (selection && selection.anchorNode) {
                node = selection.anchorNode;
            }
            
            if (!node && window.getSelection) {
                selection = window.getSelection();
                node = selection.anchorNode;
            }
            
            if (!node && document.selection) {
                selection = document.selection;
                range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
                node = range.commonAncestorContainer ? range.commonAncestorContainer :
                        range.parentElement ? range.parentElement() : range.item(0);
            }
            
            if (node) {
                return (node.nodeName === "#text" ? node.parentNode : node);
            }
        };
        
        selectionIsInEditor = function (selection) {
            var editor = $(getSelectedParentNode(selection)).closest(config.selectors.editor);
            return editor.length > 0;
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
        
        getCoordinates = function (selector, secondarySelector, relativeTo) {
            var btn = $(selector),
                result = btn.offset(),
                form,
                buttonOffset = btn.outerWidth() / 2,
                viewport = {};

            
            if (secondarySelector) {
                form = $(secondarySelector);
            } else {
                form = btn;
            }
            
            result.width = form.outerWidth();
            result.height = btn.outerHeight() > 49 ? btn.outerHeight() : 50;

            if (secondarySelector) {
                result.moveLeft = result.left + (buttonOffset || 25) - (result.width / 2); //(result.left + result.width) / 2;  //(result.left + (result.width / 2) - (getCoordinates(secondarySelector).width / 2));
                result.moveTop = (result.top + (buttonOffset * 2));
                result.moveRight = (result.right + (result.width / 2) - (getCoordinates(secondarySelector).width / 2));
                result.moveBottom = (result.bottom + result.height + 6);

                viewport.width = document.body.clientWidth;
                viewport.height = document.body.clientHeight;

                if (result.moveLeft + form.outerWidth() > viewport.width) {
                    result.moveLeft = viewport.width - form.outerWidth();
                }
                if (result.moveTop + form.outerHeight() > viewport.height) {
                    result.moveTop = viewport.height - form.outerHeight() > 0 ? viewport.height - form.outerHeight() : 0;
                }
            }

            return result;
        };
        
        setStyle = function (selector, style) {
            return $(selector).attr('style', style);
        };
        
        closestForm = function (selector, mustBeSerializable) {
            var form;
            
            if ($(selector).is('form')) {
                form = $(selector);
            } else if (mustBeSerializable && $(selector).hasClass(config.cssClasses.form)) {
                form = $(selector).find(':input');
            } else if (mustBeSerializable) {
                form = $(selector).closest(config.selectors.form).find(':input');
            } else {
                form = $(selector).closest(config.selectors.form);
            }
            
            if (!form || form.length < 1) {
                form = $(selector).find(config.selectors.form);
            }
            
            return form;
        };
        
        // @param selector: usually the submit button (i.e. event.target)
        formToJson = function (selector) {
            var form = closestForm(selector, true),
                data = {},
                arr;
            
            if (form.length === 0) {
                return;
            }
            
            arr = form.serializeArray();
            
            // convert array to JSON
            $.each(arr, function () {
                if (data[this.name] !== undefined) {
                    if (!data[this.name].push) {
                        data[this.name] = [data[this.name]];
                    }
                    data[this.name].push(this.value || '');
                } else {
                    data[this.name] = this.value || '';
                }
            });
            
            // add disabled inputs
            form.find(':input[disabled="disabled"]').each(function (index) {
                var ele = $(this),
                    name = ele.attr('name');
                
                if (name) {
                    data[name] = ele.val();
                }
            });
            
            return data;
        };

        return {
            makeElement: makeElement,
            initializeRichTextAreas: initializeRichTextAreas,
            insertNewElementBefore: insertNewElementBefore,
            insertNewElementInto: insertNewElementInto,
            insertHtmlBefore: insertHtmlBefore,
            insertHtmlAfter: insertHtmlAfter,
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
            exists: exists,
            attachEvent: attachEvent,
            updateTextarea: updateTextarea,
            isFunction: isFunction,
            isObject: isObject,
            isArray: isArray,
            hasAncestor: hasAncestor,
            getSelectedText: getSelectedText,
            getSelectedParentNode: getSelectedParentNode,
            replaceSelectedText: replaceSelectedText,
            pasteHtmlAtCursor: pasteHtmlAtCursor,
            pasteHtml: pasteHtml,
            selectRange: selectRange,
            selectionIsInEditor: selectionIsInEditor,
            getCursorCoordinates: getCursorCoordinates,
            getRandomString: getRandomString,
            
            /**
            *   Get the coordinates of an element
            *   @selector (DOM element or jQuery selector): the element to get the coordinates of
            *   @secondarySelector (DOM element or jQuery selector): if you are getting coordinates to place an
            *       element near another one, then you can pass in a selector for the element that you intend to move
            */
            getCoordinates: getCoordinates,
            setStyle: setStyle,
            formToJson: formToJson
        };
    }
});
