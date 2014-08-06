/*global hilary*/

hilary.register('gutentyp::config', { init: function () {
    "use strict";
    
    var config = {};
    
    config.prefixes = {
        pipeline: {
            beforeComponent: 'gutentyp::before::',
            afterComponent: 'gutentyp::after::'
        }
    };
    
    config.attributes = {
        formBtn: {
            key: 'data-form-btn',
            value: 'true'
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
    
    config.icons = {
        code: 'fa fa-code',
        pre: 'fa fa-file-code-o',
        blockquote: 'fa fa-quote-left',
        bold: 'fa fa-bold',
        italic: 'fa fa-italic',
        underline: 'fa fa-underline',
        strikethrough: 'fa fa-strikethrough',
        header: 'fa fa-header',
        image: 'fa fa-image',
        alignLeft: 'fa fa-align-left',
        alignCenter: 'fa fa-align-center',
        alignRight: 'fa fa-align-right',
        alignJustify: 'fa fa-align-justify',
        indent: 'fa fa-indent',
        outdent: 'fa fa-outdent',
        link: 'fa fa-link',
        unorderedList: 'fa fa-list-ul',
        orderedList: 'fa fa-list-ol'
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
        toolbarBtn: 'gutentyp-toolbar-btn',
        toolbarBtnText: 'gutentyp-toolbar-btn-text',
        toolbarBtnIcon: 'gutentyp-toolbar-btn-icon',
        hidden: 'gutentyp-hidden'
    };
    
    
    config.autoCreateSelectors = function () {
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
    
    config.autoCreateSelectors();
    
    return config;

}});
