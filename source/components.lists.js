/*global hilary*/

hilary.register('gutentyp::components::lists', { init: function (components) {
    "use strict";
    
    var bullet, numbered;

    bullet = components.makeComponent({
        title: 'Unordered List',
        cssClass: 'gutentyp-list-unordered',
        pipelineName: 'list::unordered',
        icon: 'fa fa-list-ul',
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
        icon: 'fa fa-list-ol',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('insertOrderedList', false, null);
            return false;
        }
    });
    
    components.addComponent([bullet, numbered]);
}});
