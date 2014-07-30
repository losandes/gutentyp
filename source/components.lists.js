hilary.register('gutentyp::components::lists', { init: function (components) {
    "use strict";
    
    var bullet, numbered;

    bullet = components.makeComponent({
        title: 'Unordered List',
        cssClass: 'gutentyp-list-unordered',
        pipelineName: 'list::unordered',
        func: function (event, text) {
            document.execCommand('insertUnorderedList', false, null);
            return false;
        }
    });    
    
    numbered = components.makeComponent({
        title: 'Ordered List',
        cssClass: 'gutentyp-list-ordered',
        pipelineName: 'list::ordered',
        func: function (event, text) {
            document.execCommand('insertOrderedList', false, null);
            return false;
        }
    });
    
    components.addComponent([bullet, numbered]);
}});
