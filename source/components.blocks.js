/*global hilary*/

hilary.register('gutentyp::components::blocks', { init: function (components) {
    "use strict";
    
    var code, pre, quote;
    
    pre = components.makeComponent({
        title: 'Code Block',
        cssClass: 'gutentyp-code-block',
        pipelineName: 'code::block',
        func: function (event, text) {
            return '<pre class="prettyprint linenums">' + text + '</pre>';
        }
    });
    
    code = components.makeComponent({
        title: 'Code',
        cssClass: 'gutentyp-code',
        pipelineName: 'code',
        func: function (event, text) {
            return '<code>' + text + '</code>';
        }
    });
    
    quote = components.makeComponent({
        title: 'Quote',
        cssClass: 'gutentyp-quote',
        pipelineName: 'quote',
        func: function (event, text) {
            return '<blockquote>' + text + '</blockquote>';
        }
    });
    
    components.addComponent([code, pre, quote]);
}});
