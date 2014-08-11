/*global hilary*/

hilary.register('gutentyp::components::blocks', { init: function (components, config) {
    "use strict";
    
    var code, pre, quote;
    
    pre = components.makeComponent({
        title: 'Code Block',
        cssClass: 'gutentyp-code-block',
        pipelineName: 'code::block',
        icon: config.icons.pre,
        textClass: 'sr-only',
        func: function (event, text) {
            return '<pre class="prettyprint linenums">' + (text || ' ') + '</pre>';
        }
    });
    
    code = components.makeComponent({
        title: 'Code',
        cssClass: 'gutentyp-code',
        pipelineName: 'code',
        icon: config.icons.code,
        textClass: 'sr-only',
        func: function (event, text) {
            return '<code>' + text + '</code>';
        }
    });
    
    quote = components.makeComponent({
        title: 'Quote',
        cssClass: 'gutentyp-quote',
        pipelineName: 'quote',
        icon: config.icons.blockquote,
        textClass: 'sr-only',
        func: function (event, text) {
            return '<blockquote>' + text + '</blockquote>';
        }
    });
    
    components.addComponent([code, pre, quote]);
}});
