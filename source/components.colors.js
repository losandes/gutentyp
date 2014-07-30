hilary.register('gutentyp::components::colors', { init: function (components) {
    "use strict";
    
    var fgColor, bgColor;
    
    fgColor = components.makeComponent({
        title: 'Foreground color',
        cssClass: 'gutentyp-fg-color',
        pipelineName: 'foregroundColor',
        func: function (event, text) {
            document.execCommand('forecolor', false, '#FF0000');
            return false;
        }
    });
    
    bgColor = components.makeComponent({
        title: 'Background color',
        cssClass: 'gutentyp-bg-color',
        pipelineName: 'backgroundColor',
        func: function () {
            document.execCommand('backcolor', false, '#FF0000');
            return false;
        }
    });
    
    components.addComponent([fgColor, bgColor]);
}});
