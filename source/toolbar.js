/*jslint plusplus: true */
/*global hilary*/

hilary.register('gutentyp::toolbar', { init: function (config, utils, componentCollection) {
    "use strict";
    
    var build = function () {
        var components = componentCollection.components,
            i,
            formatEventSelector,
            buttonTemplate,
            groups = {},
            addWithDisplayHandler,
            addWithGroup,
            addGroup,
            add;
        
        formatEventSelector = function (component) {
            return config.selectors.toolbar + ' .' + component.cssClass + ':not(' + config.selectors.hasEvents + ')';
        };
        
        buttonTemplate = function (component, componentId) {
            var buttonClass, template;
            
            buttonClass = 'gutentyp-component ' + component.cssClass;
            
            if (componentId) {
                buttonClass += ' ' + componentId;
            }
            
            template = '<button type="button" class="' + buttonClass + '">'
                                + '<i class="' + config.cssClasses.toolbarBtnIcon + ' ' + component.icon + '"></i>'
                                + '<span class="' + component.textClass + '">' + component.title + '</span>'
                            + '</button>';
            return template;
        };
        
        add = function (component) {
            utils.insertNewElementInto({
                markup: buttonTemplate(component)
            }, config.selectors.newToolbars);
            utils.attachEvent({
                primarySelector: formatEventSelector(component),
                eventType: 'click',
                eventHandler: component.execute
            });
        };
        
        addWithDisplayHandler = function (component) {
            utils.insertHtml(config.selectors.newToolbars, component.displayHandler());
            utils.attachEvent({
                primarySelector: formatEventSelector(component),
                eventType: 'click',
                eventHandler: component.execute
            });
        };
        
        addGroup = function (component) {
            var currentGroup = groups[component.group.name] = { components: [component] };
            currentGroup.toggleId = utils.getRandomString();// component.group.name + 'toggle';
            currentGroup.menuId = utils.getRandomString(); // component.group.name + 'menu';//utils.getRandomString();
            currentGroup.toggleSelector = '.' + currentGroup.toggleId;
            currentGroup.menuSelector = '.' + currentGroup.menuId;

            utils.insertNewElementInto({
                markup: buttonTemplate(component.group, currentGroup.toggleId)
            }, config.selectors.newToolbars);
            utils.insertNewElementInto({
                markup: '<div class="' + currentGroup.menuId + ' gutentyp-toolbar-group gutentyp-toolbar-arrow-' + (component.group.arrow || 'over') + '"><ul></ul></div>'
            }, config.selectors.newToolbars);

            // toggle hidden
            utils.attachEvent({
                primarySelector: currentGroup.toggleSelector,
                eventType: 'click',
                eventHandler: function (event) {
	                var btnCoords = utils.getCoordinates(event.target),
	                    style;
	                
	                // set the coordinates
	                style = 'left: ' + (btnCoords.left + (btnCoords.width / 2) - (utils.getCoordinates(currentGroup.menuSelector).width / 2));
	                style += '; top: ' + (btnCoords.offset.top + btnCoords.height + 6);
	                utils.setStyle(currentGroup.menuSelector, style);
	                
	                // hide any other toolbars that might be open
	                utils.toggleClass('.gutentyp-toolbar-group.active:not(' + currentGroup.menuSelector + ')', 'active');
	                // show or hid this toolbar
	                utils.toggleClass(currentGroup.menuSelector, 'active');
                }
            });
            
            return currentGroup;
        };
        
        addWithGroup = function (component) {
            var componentId = utils.getRandomString(),
                componentSelector = '.' + componentId,
                currentGroup,
                execWrapper;
                
            if (!groups[component.group.name]) {
                currentGroup = addGroup(component);
            } else {
                currentGroup = groups[component.group.name];
                groups[component.group.name].components.push(component);
            }
            
            if (component.displayHandler) {
                utils.insertNewElementInto({
                    markup: '<li>' + component.displayHandler(componentId) + '</li>'
                }, currentGroup.menuSelector + ' ul');
            } else {
                utils.insertNewElementInto({
                    markup: '<li>' + buttonTemplate(component, componentId) + '</li>'
                }, currentGroup.menuSelector + ' ul');
            }

            execWrapper = function (event, input) {
                component.execute(event, input);
                utils.toggleClass(currentGroup.menuSelector, 'active');
            };

            utils.attachEvent({
                primarySelector: componentSelector,
                eventType: 'click',
                eventHandler: execWrapper
            });
        };
        
        utils.insertNewElementBefore('div', config.selectors.newEditors, config.selectors.toolbar);

        for (i = 0; i < components.length; i++) {
            if (components[i].group !== undefined) {
                addWithGroup(components[i]);
            } else if (utils.isFunction(components[i].displayHandler)) {
                addWithDisplayHandler(components[i]);
            } else {
                add(components[i]);
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
