/*global hilary*/

hilary.register('gutentyp::components::lists', { init: function (components, config) {
    "use strict";
    
    var bullet, numbered;

    bullet = components.makeComponent({
        title: 'Unordered List',
        cssClass: 'gutentyp-list-unordered',
        pipelineName: 'list::unordered',
        icon: config.icons.unorderedList,
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('insertUnorderedList', false, null);
            return false;
        }
    });
    
    numbered = components.makeComponent({
        title: 'Ordered List',
        cssClass: 'gutentyp-list-ordered',
        pipelineName: 'list::ordered',
        icon: config.icons.orderedList,
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('insertOrderedList', false, null);
            return false;
        }
    });
    
    components.addComponent([bullet, numbered]);
}});
