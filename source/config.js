hilary.register('gutentyp::config', { init: function () {
    "use strict";
    
    var config = {}, i;
    
    config.prefixes = {
        pipeline: {
            beforeComponent: 'gutentyp::before::',
            afterComponent: 'gutentyp::after::'
        }
    };
    
    config.cssClasses = {
        toGutentypify: 'gutentyp-ify',
        gutentypified: 'gutentyp-ified',
        hasEvents: 'has-events',
        hasToolbar: 'has-toolbar',
        hasComponents: 'has-components',
        editor: 'gutentyp-editor',
        textarea: 'gutentyp-textarea',
        toolbar: 'gutentyp-toolbar',
        hidden: 'gutentyp-hidden'
    };
    
    
    config.selectors = {};
    
    for (i in config.cssClasses) {
        if (config.cssClasses.hasOwnProperty(i)) {
            config.selectors[i] = '.' + config.cssClasses[i];
        }
    };
    
    config.selectors.newEditors = config.selectors.editor + ':not(' + config.selectors.hasToolbar + ')';
    config.selectors.eventlessEditors = config.selectors.editor + ':not(' + config.selectors.hasEvents + ')';
    config.selectors.newToolbars = config.selectors.toolbar + ':not(' + config.selectors.hasComponents + ')';
    
    return config;

}});
