hilary.register('gutentyp::toolbar', { init: function (config, utils, editComponents) {
    "use strict";
    
    var build = function () {
        var i, component;
        
        utils.insertNewElementBefore('div', config.selectors.newEditors, config.selectors.toolbar);

        for (i = 0; i < editComponents.components.length; i++) {
            component = editComponents.components[i];
            
            if (utils.isFunction(component.displayHandler)) {
                component.displayHandler();
            } else {
                utils.insertNewElementInto('button', config.selectors.newToolbars, component.cssClass);
                utils.setText(config.selectors.toolbar + ' .' + component.cssClass, component.title);
                utils.attachEvent(config.selectors.toolbar + ' .' + component.cssClass, 'click', component.execute);            
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
