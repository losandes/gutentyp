/*globals hilary, console, window*/
hilary.register('gutentyp::keyEvents', { init: function (config, dom, nicephore) {
    "use strict";
    
    var when, waitThreshold = 33, waitCount = 0, observer = nicephore();
    
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
            return false;
        }
    };
    
    
    observer.observe('paste', 'keypress', function (event, keyInfo, clipboard) {
        if (!dom.hasAncestor(event.target, config.selectors.editor)) {
            return true;
        }
        
        var assert, then, item = clipboard.items[0];
        
        assert = function () {
            return item.type.indexOf('image') > -1 && item.dataUrl;
        };
        
        then = function () {
            var img = '<img src="' + item.dataUrl + '" alt="user entered image" />';
            return dom.insertHtmlAfter(event.target, img);
        };
        
        when(assert, then);
    });
}});
