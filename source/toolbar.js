/*jslint plusplus: true */
/*global hilary*/

hilary.register('gutentyp::toolbar', { init: function (config, utils, editComponents) {
    "use strict";
    
    var build = function () {
        var i, component, formatEventSelector;
        
        formatEventSelector = function (component) {
            return config.selectors.toolbar + ' .' + component.cssClass + ':not(' + config.selectors.hasEvents + ')';
        };
        
        utils.insertNewElementBefore('div', config.selectors.newEditors, config.selectors.toolbar);

        for (i = 0; i < editComponents.components.length; i++) {
            component = editComponents.components[i];
            
            if (utils.isFunction(component.displayHandler)) {
                utils.insertHtml(config.selectors.newToolbars, component.displayHandler());
                utils.attachEvent(formatEventSelector(component), 'click', component.execute);
            } else {
                utils.insertNewElementInto('button', config.selectors.newToolbars, component.cssClass);
                utils.setText(config.selectors.newToolbars + ' .' + component.cssClass, component.title);
                utils.attachEvent(formatEventSelector(component), 'click', component.execute);
            }
        }
        
        utils.addClass(config.selectors.newEditors, config.cssClasses.hasToolbar);
        utils.addClass(config.selectors.newToolbars, config.cssClasses.hasComponents);

        return;
    };
    
    return {
        build: build
    };
    
}});
