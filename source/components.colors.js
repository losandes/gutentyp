/*jslint plusplus: true*/
/*global hilary*/

hilary.register('gutentyp::components::colors', { init: function (components, config) {
    "use strict";
    
    var addColor, colors = config.colors, i = 0;
    
    addColor = function (color) {
        components.addComponent(components.makeComponent({
            title: color.title,
            cssClass: 'gutentyp-' + color.name,
            pipelineName: 'color' + color.Title,
            func: function (event, text) {
                document.execCommand('forecolor', false, color.value);
                return false;
            },
            displayHandler: function (domId) {
                return '<button id="' + domId + '"><span class="color-block" style="background-color: ' + color.value + '"></span></button>';
            },
            group: { title: 'Colors', name: 'colors', arrow: 'none' }
        }));
    };
    
    for (i; i < colors.length; i++) {
        addColor(colors[i]);
    }
    
}});
