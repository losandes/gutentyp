"use strict";

hilary.register('editComponents', {
    init: function (utils, componentPipeline) {
        var componentFactory, _components;

        componentFactory = function (title, pipelineName, func) {
            var self = {};

            self.title = title;
            self.className = pipelineName;
            self.execute = function () {
                var _beforeThis = 'before::' + pipelineName,
                    _afterThis = 'after::' + pipelineName;

                if(utils.isFunction(componentPipeline.beforeAny)) {
                    componentPipeline.beforeAny();
                }

                if(utils.isFunction(componentPipeline[_beforeThis])) {
                    componentPipeline[_beforeThis]();
                }

                if(utils.isFunction(func)) {
                    func();
                }

                if(utils.isFunction(componentPipeline.afterAny)) {
                    componentPipeline.afterAny();
                }

                if(utils.isFunction(componentPipeline[_afterThis])) {
                    componentPipeline[_afterThis]();
                }
            };

            return self;
        };



        _components = [];
        _components.push(
            new componentFactory(
                'Foreground color',
                'ForegroundColor',
                function () {
                    document.execCommand('forecolor', false, '#FF0000');
                }
            )
        );
        _components.push(
            new componentFactory(
                'Background color',
                'BackgroundColor',
                function () {
                    document.execCommand('backcolor', false, '#FF0000');
                }
            )
        );
        _components.push(
            new componentFactory(
                'Font Size +',
                'FontSizeIncrease',
                function () {
                    document.execCommand('increaseFontSize', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Font Size -',
                'FontSizeDecrease',
                function () {
                    document.execCommand('decreaseFontSize', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Bold',
                'Bold',
                function () {
                    document.execCommand('bold', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Italic',
                'Italic',
                function () {
                    document.execCommand('italic', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Underline',
                'Underline',
                function () {
                    document.execCommand('underline', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Strike-Through',
                'StrikeThrough',
                function () {
                    document.execCommand('strikeThrough', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Left Justification',
                'LeftJustification',
                function () {
                    document.execCommand('justifyLeft', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Center Justification',
                'CenterJustification',
                function () {
                    document.execCommand('justifyCenter', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Right Justification',
                'RightJustification',
                function () {
                    document.execCommand('justifyRight', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Indent Text',
                'IndentText',
                function () {
                    document.execCommand('indent', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Outdent Text',
                'OutdentText',
                function () {
                    document.execCommand('outdent', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Ordered List',
                'OrderedList',
                function () {
                    document.execCommand('insertOrderedList', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Unordered List',
                'UnorderedList',
                function () {
                    document.execCommand('insertUnorderedList', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Quote',
                'QuoteBlock',
                function () {
                    //pasteHtmlAtCaret('', false);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Code Block',
                'CodeBlock',
                function () {
                    //pasteHtmlAtCaret('', false);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Add Link',
                'AddLink',
                function () {
                    //pasteHtmlAtCaret('', false);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Add Image',
                'AddImage',
                function () {
                    //pasteHtmlAtCaret('', false);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Add Video',
                'AddVideo',
                function () {
                    //pasteHtmlAtCaret('', false);
                }
            )
        );



        var pasteHtmlAtCaret = function(html, selectPastedContent) {
            // Helper function because different browsers don't always cleanly implement this feature
            // From http://stackoverflow.com/a/6691294

            var sel, range;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // only relatively recently standardized and is not supported in
                    // some browsers (IE9, for one)
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ( (node = el.firstChild) ) {
                        lastNode = frag.appendChild(node);
                    }
                    var firstNode = frag.firstChild;
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
            } else if ( (sel = document.selection) && sel.type != "Control") {
                // IE < 9
                var originalRange = sel.createRange();
                originalRange.collapse(true);
                sel.createRange().pasteHTML(html);
                if (selectPastedContent) {
                    range = sel.createRange();
                    range.setEndPoint("StartToStart", originalRange);
                    range.select();
                }
            }
        };


        return _components;
    }
});