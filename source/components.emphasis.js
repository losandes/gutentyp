/*global hilary*/

hilary.register('gutentyp::components::emphasis', { init: function (components) {
    "use strict";
    
    var bold, italic, underline, strike;
    
    bold = components.makeComponent({
        title: 'Bold',
        cssClass: 'gutentyp-bold',
        pipelineName: 'bold',
        icon: 'fa fa-bold',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('bold', false, null);
            return false;
        }
    });
    
    italic = components.makeComponent({
        title: 'Italic',
        cssClass: 'gutentyp-italic',
        pipelineName: 'italic',
        icon: 'fa fa-italic',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('italic', false, null);
            return false;
        }
    });
    
    underline = components.makeComponent({
        title: 'Underline',
        cssClass: 'gutentyp-underline',
        pipelineName: 'underline',
        icon: 'fa fa-underline',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('underline', false, null);
            return false;
        }
    });
    
    strike = components.makeComponent({
        title: 'Strike Through',
        cssClass: 'gutentyp-strike',
        pipelineName: 'strike',
        icon: 'fa fa-strikethrough',
        textClass: 'sr-only',
        func: function (event, text) {
            document.execCommand('strikeThrough', false, null);
            return false;
        }
    });
    
    components.addComponent([bold, italic, underline, strike]);
}});
