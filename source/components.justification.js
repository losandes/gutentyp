/*global hilary*/

hilary.register('gutentyp::components::justification', { init: function (components) {
    "use strict";
    
    var left, center, right, indent, outdent;
    
    left = components.makeComponent({
        title: 'Justify Left',
        cssClass: 'gutentyp-justify-left',
        pipelineName: 'justifyLeft',
        func: function (event, text) {
            document.execCommand('justifyLeft', false, null);
            return false;
        }
    });
    
    center = components.makeComponent({
        title: 'Justify Center',
        cssClass: 'gutentyp-justify-center',
        pipelineName: 'justifyCenter',
        func: function (event, text) {
            document.execCommand('justifyCenter', false, null);
            return false;
        }
    });
    
    right = components.makeComponent({
        title: 'Justify Right',
        cssClass: 'gutentyp-justify-right',
        pipelineName: 'justifyRight',
        func: function (event, text) {
            document.execCommand('justifyRight', false, null);
            return false;
        }
    });
    
    indent = components.makeComponent({
        title: 'Indent',
        cssClass: 'gutentyp-indent',
        pipelineName: 'indent',
        func: function (event, text) {
            document.execCommand('indent', false, null);
            return false;
        }
    });
    
    outdent = components.makeComponent({
        title: 'Outdent',
        cssClass: 'gutentyp-outdent',
        pipelineName: 'outdent',
        func: function (event, text) {
            document.execCommand('outdent', false, null);
            return false;
        }
    });
    
    components.addComponent([left, center, right, indent, outdent]);
}});
