/*globals hilary, console, window*/
hilary.register('gutentyp::keyEvents', { init: function (config, dom, nicephore, $) {
    "use strict";
    
    var when, waitThreshold = ((config.keyEvents && config.keyEvents.waitThreshold) || 33), waitCount = 0, observer = nicephore();
    
    // we only want to register events once, even when multiple configs are present
    if (window.gutentypKeyEventsRegistered) {
        return;
    }
    
    when = function (assert, then) {
        if (typeof assert !== 'function' || typeof then !== 'function') {
            return false;
        }
        
        if (waitCount < waitThreshold) {
            // at this point, the file is still being read to the dataUrl
            setTimeout(function () {
                if (assert()) {
                    waitCount = 0;
                    return then();
                } else {
                    return when(assert, then);
                }
            }, 30);
        } else {
            waitCount = 0;
            throw new Error('This image is too large to paste in Gutentyp');
        }
    };
    
    
    observer.observe('paste', 'keypress', function (event, keyInfo, clipboard) {
        if (!dom.hasAncestor(event.target, config.selectors.editor)) {
            return true;
        }
        
        var assert, then, item = clipboard.items[0];
        
        if (item.type.indexOf('image') > -1) {
            assert = function () {
                return item.dataUrl;
            };

            then = function () {
                var img = '<img src="' + item.dataUrl + '" alt="sorry, this is a user entered image with no context" />';
                return dom.insertHtmlAfter(event.target, img);
            };

            when(assert, then);
        }
    });
    
//    observer.observe('enter', 'keydown', function (event, keyInfo) {
//        var isInPre = dom.hasAncestor(event.target, 'pre'),
//            isInCode = dom.hasAncestor(event.target, 'code');
//        
//        if (isInPre) {
//            return false;
//        } else if (isInCode) {
//            return false;
//        } else {
//            return true;
//        }
//    });
    
    $(document).on('keydown', function (event) {
        if ((event.keyCode || event.which) !== 13) {
            return true;
        }
        
        var target = event.target,
            range = dom.getCursorCoordinates(event.target),
            parent = $(dom.getSelectedParentNode(range)),
            isInPre = dom.hasAncestor(target, 'pre') || parent.is('pre') || parent.parents('pre').length > 0,
            isInCode = dom.hasAncestor(target, 'code') || parent.is('code') || parent.parents('code').length > 0,
            code;
        
        if (isInPre) {
            // add line break
            dom.pasteHtml(range, '\r\n');
            event.preventDefault();
        } else if (isInCode) {
            if (parent.is('code')) {
                code = parent;
            } else {
                code = parent.parent();
            }
            
            code.after('<div></div>');
            range.startContainer = code.next()[0];
            range.endContainer = code.next()[0];
            range.startOffset = 0;
            range.baseOffset = 0;
            range.anchorOffset = 0;
            range.endOffset = 0;
            range.extentOffset = 0;
            range.focusOffset = 0;
            dom.selectRange(range);
            event.preventDefault();
        } else {
            // let it happen
            return true;
        }
    });
    
    window.gutentypKeyEventsRegistered = true;
    
}});
