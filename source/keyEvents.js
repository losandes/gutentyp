/*globals hilary, console, window*/
hilary.register('gutentyp::keyEvents', { init: function (config, dom, nicephore) {
    "use strict";
    
    var when, waitThreshold = ((config.keyEvents && config.keyEvents.waitThreshold) || 33), waitCount = 0, observer = nicephore();
    
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
            return false;
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
}});
