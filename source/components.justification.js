/*global hilary*/

hilary.register('gutentyp::components::justification', { init: function (components) {
    "use strict";
    
    var left, center, right, full, indent, outdent, group;
    
    group = components.makeComponent({
        title: 'Alignment',
        cssClass: 'gutentyp-align',
        pipelineName: 'alignment',
        icon: 'fa fa-align-left',
        textClass: 'sr-only'
    });
    group.name = 'alignment';
    group.arrow = 'over'; //'over'
    
    left = components.makeComponent({
        title: 'Align Left',
        cssClass: 'gutentyp-align-left',
        pipelineName: 'alignLeft',
        icon: 'fa fa-align-left',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('justifyLeft', false, null);
            return false;
        },
        group: group
    });
    
    center = components.makeComponent({
        title: 'Align Center',
        cssClass: 'gutentyp-align-center',
        pipelineName: 'alignCenter',
        icon: 'fa fa-align-center',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('justifyCenter', false, null);
            return false;
        },
        group: group
    });
    
    right = components.makeComponent({
        title: 'Align Right',
        cssClass: 'gutentyp-align-right',
        pipelineName: 'alignRight',
        icon: 'fa fa-align-right',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('justifyRight', false, null);
            return false;
        },
        group: group
    });
    
    full = components.makeComponent({
        title: 'Justify',
        cssClass: 'gutentyp-align-justify',
        pipelineName: 'alignJustify',
        icon: 'fa fa-align-justify',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('justifyFull', false, null);
            return false;
        },
        group: group
    });
    
    indent = components.makeComponent({
        title: 'Indent',
        cssClass: 'gutentyp-indent',
        pipelineName: 'indent',
        icon: 'fa fa-indent',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('indent', false, null);
            return false;
        },
        group: group
    });
    
    outdent = components.makeComponent({
        title: 'Outdent',
        cssClass: 'gutentyp-outdent',
        pipelineName: 'outdent',
        icon: 'fa fa-outdent',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('outdent', false, null);
            return false;
        },
        group: group
    });
    
    components.addComponent([left, center, right, full, indent, outdent]);
}});
