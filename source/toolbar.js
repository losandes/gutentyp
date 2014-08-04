/*jslint plusplus: true */
/*global hilary*/

hilary.register('gutentyp::toolbar', { init: function (config, utils, editComponents) {
    "use strict";
    
    var build = function () {
        var i, component, formatEventSelector, groups = {};
        
        formatEventSelector = function (component) {
            return config.selectors.toolbar + ' .' + component.cssClass + ':not(' + config.selectors.hasEvents + ')';
        };
        
        utils.insertNewElementBefore('div', config.selectors.newEditors, config.selectors.toolbar);

        for (i = 0; i < editComponents.components.length; i++) {
            component = editComponents.components[i];
            
            if (utils.isFunction(component.displayHandler)) {
                utils.insertHtml(config.selectors.newToolbars, component.displayHandler());
                utils.attachEvent(formatEventSelector(component), 'click', component.execute);
            } else if (component.group !== undefined) {
                
                if (!groups[component.group]) {
                    utils.insertNewElementInto('button', config.selectors.newToolbars, config.prefixes.cssClasses.toolbarGroupBtn + component.group);
                    utils.insertNewElementInto('div', config.selectors.newToolbars, config.prefixes.cssClasses.toolbarGroup + component.group + ' hidden');
                    utils.setText(config.selectors.newToolbars + ' .' + config.prefixes.cssClasses.toolbarGroupBtn + component.group, component.group);
                    groups[component.group] = [component];
                } else {
                    groups[component.group].push(component);
                }
                
                utils.insertNewElementInto('a', config.selectors.toolbarGroup(component.group), component.cssClass);
                utils.setText(config.selectors.toolbarGroup(component.group) + ' .' + component.cssClass, component.title);
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


//headings.displayHandler = function () {
//        return '<button type="button" class="' + headings.cssClass + ' popover_btn" data-popover-selector="#heading-popover-' + random + '" data-placement="bottom">' + headings.title + '</button>'
//            + '<div id="heading-popover-' + random + '" class="hidden">'
//                + '<div class="' + headings.cssClass + '-popover">'
//                    + '<button type="button" data-gutentyp-command="heading1">Heading 1</button>'
//                    + '<button type="button" data-gutentyp-command="heading2">Heading 2</button>'
//                    + '<button type="button" data-gutentyp-command="heading3">Heading 3</button>'
//                    + '<button type="button" data-gutentyp-command="heading4">Heading 4</button>'
//                    + '<button type="button" data-gutentyp-command="heading5">Heading 5</button>'
//                    + '<button type="button" data-gutentyp-command="heading6">Heading 6</button>'
//                + '</div>'
//            + '</div>';
//    };