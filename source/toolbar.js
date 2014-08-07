/*jslint plusplus: true */
/*global hilary*/

hilary.register('gutentyp::toolbar', { init: function (config, dom, componentCollection) {
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
            dom.insertNewElementInto({
                markup: buttonTemplate(component)
            }, config.selectors.newToolbars);
            dom.attachEvent({
                primarySelector: formatEventSelector(component),
                eventType: 'click',
                eventHandler: component.execute
            });
        };
        
        addWithDisplayHandler = function (component) {
            dom.insertHtml(config.selectors.newToolbars, component.displayHandler());
            dom.attachEvent({
                primarySelector: formatEventSelector(component),
                eventType: 'click',
                eventHandler: component.execute
            });
        };
        
        addGroup = function (component) {
            var currentGroup = groups[component.group.name] = { components: [component] };
            currentGroup.toggleId = dom.getRandomString();// component.group.name + 'toggle';
            currentGroup.menuId = dom.getRandomString(); // component.group.name + 'menu';//dom.getRandomString();
            currentGroup.toggleSelector = '.' + currentGroup.toggleId;
            currentGroup.menuSelector = '.' + currentGroup.menuId;

            dom.insertNewElementInto({
                markup: buttonTemplate(component.group, currentGroup.toggleId)
            }, config.selectors.newToolbars);
            dom.insertNewElementInto({
                markup: '<div class="' + currentGroup.menuId + ' gutentyp-toolbar-group gutentyp-toolbar-arrow-' + (component.group.arrow || 'over') + '"><ul></ul></div>'
            }, config.selectors.newToolbars);

            // toggle hidden
            dom.attachEvent({
                primarySelector: currentGroup.toggleSelector,
                eventType: 'click',
                eventHandler: function (event) {
	                var btnCoords = dom.getCoordinates(event.target, currentGroup.menuSelector),
	                    style;
	                
	                // set the coordinates
	                style = 'left: ' + btnCoords.moveLeft + 'px';
	                style += '; top: ' + btnCoords.moveTop + 'px';
	                dom.setStyle(currentGroup.menuSelector, style);
	                
	                // hide any other toolbars that might be open
	                dom.toggleClass('.gutentyp-toolbar-group.active:not(' + currentGroup.menuSelector + ')', 'active');
	                // show or hid this toolbar
	                dom.toggleClass(currentGroup.menuSelector, 'active');
                }
            });
            
            return currentGroup;
        };
        
        addWithGroup = function (component) {
            var componentId = dom.getRandomString(),
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
                dom.insertNewElementInto({
                    markup: '<li>' + component.displayHandler(componentId) + '</li>'
                }, currentGroup.menuSelector + ' ul');
            } else {
                dom.insertNewElementInto({
                    markup: '<li>' + buttonTemplate(component, componentId) + '</li>'
                }, currentGroup.menuSelector + ' ul');
            }

            execWrapper = function (event, input) {
                component.execute(event, input);
                dom.toggleClass(currentGroup.menuSelector, 'active');
            };

            dom.attachEvent({
                primarySelector: componentSelector,
                eventType: 'click',
                eventHandler: execWrapper
            });
        };
        
        dom.insertNewElementBefore('div', config.selectors.newEditors, config.selectors.toolbar);

        for (i = 0; i < components.length; i++) {
            if (components[i].group !== undefined) {
                addWithGroup(components[i]);
            } else if (dom.isFunction(components[i].displayHandler)) {
                addWithDisplayHandler(components[i]);
            } else {
                add(components[i]);
            }
        }
        
        dom.addClass(config.selectors.newEditors, config.cssClasses.hasToolbar);
        dom.addClass(config.selectors.newToolbars, config.cssClasses.hasComponents);

        return;
    };
    
    return {
        build: build
    };
    
}});
