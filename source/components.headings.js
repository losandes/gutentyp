/*jslint white: true*/
/*global hilary*/

hilary.register('gutentyp::components::headings', { init: function (components, config) {
    "use strict";
    
    var h1, h2, h3, h4, h5, h6, group;
    
    group = components.makeComponent({
        title: 'Headings',
        cssClass: 'gutentyp-headings',
        pipelineName: 'headings',
        icon: config.icons.header,
        textClass: 'sr-only'
    });
    group.name = 'headings';
    group.arrow = 'over'; //'over'
    
    h1 = components.makeComponent({
        title: 'h1',
        cssClass: 'gutentyp-h1',
        pipelineName: 'h1',
        func: function (event, text) {
            text = text || 'Lorem ipsum';
            return '<h1>' + text + '</h1>';
        },
        group: group
    });
    
    h2 = components.makeComponent({
        title: 'h2',
        cssClass: 'gutentyp-h2',
        pipelineName: 'h2',
        func: function (event, text) {
            text = text || 'Lorem ipsum';
            return '<h2>' + text + '</h2>';
        },
        group: group
    });
    
    h3 = components.makeComponent({
        title: 'h3',
        cssClass: 'gutentyp-h3',
        pipelineName: 'h3',
        func: function (event, text) {
            text = text || 'Lorem ipsum';
            return '<h3>' + text + '</h3>';
        },
        group: group
    });
    
    h4 = components.makeComponent({
        title: 'h4',
        cssClass: 'gutentyp-h4',
        pipelineName: 'h4',
        func: function (event, text) {
            text = text || 'Lorem ipsum';
            return '<h4>' + text + '</h4>';
        },
        group: group
    });
    
    h5 = components.makeComponent({
        title: 'h5',
        cssClass: 'gutentyp-h5',
        pipelineName: 'h5',
        func: function (event, text) {
            text = text || 'Lorem ipsum';
            return '<h5>' + text + '</h5>';
        },
        group: group
    });
    
    h6 = components.makeComponent({
        title: 'h6',
        cssClass: 'gutentyp-h6',
        pipelineName: 'h6',
        func: function (event, text) {
            text = text || 'Lorem ipsum';
            return '<h6>' + text + '</h6>';
        },
        group: group
    });
    
    components.addComponent([h1, h2, h3, h4, h5, h6]);
}});
