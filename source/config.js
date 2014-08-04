/*global hilary*/

hilary.register('gutentyp::config', { init: function () {
    "use strict";
    
    var config = {}, autoCreateSelectors;
    
    config.prefixes = {
        pipeline: {
            beforeComponent: 'gutentyp::before::',
            afterComponent: 'gutentyp::after::'
        },
        cssClasses: {
            toolbarGroupBtn: 'gutengroup-btn-',
            toolbarGroup: 'gutengroup-'
        }
    };
    
    config.cssClasses = {
        toGutentypify: 'gutentyp-ify',
        gutentypified: 'gutentyp-ified',
        hasEvents: 'has-events',
        hasToolbar: 'has-toolbar',
        hasComponents: 'has-components',
        editor: 'guten-editor',
        textarea: 'guten-textarea',
        toolbar: 'guten-toolbar',
        hidden: 'guten-hidden'
    };
    
    
    autoCreateSelectors = function () {
        var i;
        
        config.selectors = {};

        for (i in config.cssClasses) {
            if (config.cssClasses.hasOwnProperty(i)) {
                config.selectors[i] = '.' + config.cssClasses[i];
            }
        }

        config.selectors.newEditors = config.selectors.editor + ':not(' + config.selectors.hasToolbar + ')';
        config.selectors.eventlessEditors = config.selectors.editor + ':not(' + config.selectors.hasEvents + ')';
        config.selectors.newToolbars = config.selectors.toolbar + ':not(' + config.selectors.hasComponents + ')';
        config.selectors.toolbarGroupBtn = function (groupName) {
            return config.selectors.newToolbars + ' .' + config.prefixes.cssClasses.toolbarGroupBtn + groupName;
        };
        config.selectors.toolbarGroup = function (groupName) {
            return config.selectors.newToolbars + ' .' + config.prefixes.cssClasses.toolbarGroup + groupName;
        };
    };
    
    autoCreateSelectors();
    
    return config;

}});
