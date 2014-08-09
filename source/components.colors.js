/*jslint plusplus: true*/
/*global hilary*/

hilary.register('gutentyp::components::colors', { init: function (components, config) {
    "use strict";
    
    var addColor,
        colors = config.colors,
        i = 0,
        group,
        colorBlockCss = 'gutentyp-component-color-block',
        colorLabelCss = 'gutentyp-component-color-label';
    
    group = components.makeComponent({
        title: 'Colors',
        cssClass: 'gutentyp-colors',
        pipelineName: 'colors',
        icon: colorBlockCss + ' ' + colorLabelCss,
        textClass: 'sr-only'
    });
    group.name = 'colors';
    group.arrow = 'over'; //'over
    
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
                return '<button type="button" class="' + domId + '"><span class="' + colorBlockCss + '" style="background-color: ' + color.value + '"></span></button>';
            },
            group: group
        }));
    };
    
    for (i; i < colors.length; i++) {
        addColor(colors[i]);
    }
    
}});
