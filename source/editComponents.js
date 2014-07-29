hilary.register('editComponents', {
"use strict";

    init: function (utils, componentPipeline) {
        var componentFactory,
            _components,
            pasteHtmlAtCaret;

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
                'foregroundColor',
                function () {
                    document.execCommand('forecolor', false, '#FF0000');
                }
            )
        );
        _components.push(
            new componentFactory(
                'Background color',
                'backgroundColor',
                function () {
                    document.execCommand('backcolor', false, '#FF0000');
                }
            )
        );
        _components.push(
            new componentFactory(
                'Headings',
                'headings',
                function () {

                }
            )
        );
        _components.push(
            new componentFactory(
                'Bold',
                'bold',
                function () {
                    document.execCommand('bold', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Italic',
                'italic',
                function () {
                    document.execCommand('italic', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Underline',
                'underline',
                function () {
                    document.execCommand('underline', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Strike-Through',
                'strikeThrough',
                function () {
                    document.execCommand('strikeThrough', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Left Justification',
                'leftJustification',
                function () {
                    document.execCommand('justifyLeft', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Center Justification',
                'centerJustification',
                function () {
                    document.execCommand('justifyCenter', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Right Justification',
                'rightJustification',
                function () {
                    document.execCommand('justifyRight', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Indent Text',
                'indentText',
                function () {
                    document.execCommand('indent', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Outdent Text',
                'outdentText',
                function () {
                    document.execCommand('outdent', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Ordered List',
                'orderedList',
                function () {
                    document.execCommand('insertOrderedList', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Unordered List',
                'unorderedList',
                function () {
                    document.execCommand('insertUnorderedList', false, null);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Quote',
                'quoteBlock',
                function () {
                    //pasteHtmlAtCaret('', false);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Code Block',
                'codeBlock',
                function () {
                    //pasteHtmlAtCaret('', false);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Add Link',
                'addLink',
                function () {
                    //pasteHtmlAtCaret('', false);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Add Image',
                'addImage',
                function () {
                    //pasteHtmlAtCaret('', false);
                }
            )
        );
        _components.push(
            new componentFactory(
                'Add Video',
                'addVideo',
                function () {
                    //pasteHtmlAtCaret('', false);
                }
            )
        );



        pasteHtmlAtCaret = function(html, selectPastedContent) {
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
