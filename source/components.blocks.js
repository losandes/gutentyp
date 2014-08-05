/*global hilary*/

hilary.register('gutentyp::components::blocks', { init: function (components) {
    "use strict";
    
    var code, pre, quote;
    
    pre = components.makeComponent({
        title: 'Code Block',
        cssClass: 'gutentyp-code-block',
        pipelineName: 'code::block',
        icon: 'fa fa-file-code-o',
        textClass: 'sr-only',
        func: function (event, text) {
            return '<pre class="prettyprint linenums">' + text + '</pre>';
        }
    });
    
    code = components.makeComponent({
        title: 'Code',
        cssClass: 'gutentyp-code',
        pipelineName: 'code',
        icon: 'fa fa-code',
        textClass: 'sr-only',
        func: function (event, text) {
            return '<code>' + text + '</code>';
        }
    });
    
    quote = components.makeComponent({
        title: 'Quote',
        cssClass: 'gutentyp-quote',
        pipelineName: 'quote',
        icon: 'fa fa-quote-left',
        textClass: 'sr-only',
        func: function (event, text) {
            return '<blockquote>' + text + '</blockquote>';
        }
    });
    
    components.addComponent([code, pre, quote]);
}});
