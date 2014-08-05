/*global hilary*/

hilary.register('gutentyp::config', { init: function () {
    "use strict";
    
    var config = {}, autoCreateSelectors;
    
    config.prefixes = {
        pipeline: {
            beforeComponent: 'gutentyp::before::',
            afterComponent: 'gutentyp::after::'
        }
    };
    
    config.colors = [];
    config.colors.push({ title: 'Black', name: 'black', value: '#000000' });
    config.colors.push({ title: 'Grey', name: 'grey', value: '#62615f' });
    config.colors.push({ title: 'Light Grey', name: 'lightGrey', value: '#dcddd7' });
    config.colors.push({ title: 'Pink', name: 'pink', value: '#cd52bd' });
    config.colors.push({ title: 'Red', name: 'red', value: '#9a0000' });
    config.colors.push({ title: 'Yellow', name: 'yellow', value: '#f0ac28' });
    config.colors.push({ title: 'Green', name: 'green', value: '#6bb343' });
    config.colors.push({ title: 'Blue', name: 'blue', value: '#3c8bc8' });
    config.colors.push({ title: 'Purple', name: 'purple', value: '#a952cd' });
    
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
    };
    
    autoCreateSelectors();
    
    return config;

}});
