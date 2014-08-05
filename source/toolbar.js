/*jslint plusplus: true */
/*global hilary*/

hilary.register('gutentyp::toolbar', { init: function (config, utils, componentCollection) {
    "use strict";
    
    var build = function () {
        var components = componentCollection.components,
            i,
            formatEventSelector,
            groups = {},
            addWithDisplayHandler,
            addWithGroup,
            addGroup,
            add;
        
        formatEventSelector = function (component) {
            return config.selectors.toolbar + ' .' + component.cssClass + ':not(' + config.selectors.hasEvents + ')';
        };
        
        add = function (component) {
            utils.insertNewElementInto('button', config.selectors.newToolbars, component.cssClass, [{key: 'type', value: 'button'}]);
            utils.setText(config.selectors.newToolbars + ' .' + component.cssClass, component.title);
            utils.attachEvent(formatEventSelector(component), 'click', component.execute);
        };
        
        addWithDisplayHandler = function (component) {
            utils.insertHtml(config.selectors.newToolbars, component.displayHandler());
            utils.attachEvent(formatEventSelector(component), 'click', component.execute);
        };
        
        addGroup = function (component) {
            var currentGroup = groups[component.group.name] = { components: [component] };
            currentGroup.toggleId = utils.getRandomString();
            currentGroup.menuId = utils.getRandomString();

            utils.insertNewElementInto({
                markup: '<button type="button" id="' + currentGroup.toggleId + '">' + component.group.title + '</button>'
            }, config.selectors.newToolbars);
            utils.insertNewElementInto({
                markup: '<div id="' + currentGroup.menuId + '" class="gutentyp-toolbar-group gutentyp-toolbar-arrow-' + (component.group.arrow || 'over') + '"><ul></ul></div>'
            }, config.selectors.newToolbars);

            // toggle hidden
            utils.attachEvent('#' + currentGroup.toggleId, 'click', function (event) {
                var btnCoords = utils.getCoordinates('#' + currentGroup.toggleId),
                    style;
                
                // set the coordinates
                style = 'left: ' + ((btnCoords.left + (btnCoords.width / 2)) / 2);
                style += '; top: ' + (btnCoords.offset.top + btnCoords.height + 6);
                utils.setStyle('#' + currentGroup.menuId, style);
                
                // hide any other toolbars that might be open
                utils.toggleClass('.gutentyp-toolbar-group.active:not(#' + currentGroup.menuId + ')', 'active');
                // show or hid this toolbar
                utils.toggleClass('#' + currentGroup.menuId, 'active');
            });
            
            return currentGroup;
        };
        
        addWithGroup = function (component) {
            var componentId = utils.getRandomString(),
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
                }, '#' + currentGroup.menuId + ' ul');
            } else {
                utils.insertNewElementInto({
                    markup: '<li><button id="' + componentId + '" type="button" class="' + component.cssClass + '">' + component.title + '</button></li>'
                }, '#' + currentGroup.menuId + ' ul');
            }

            execWrapper = function (event, input) {
                component.execute(event, input);
                utils.toggleClass('#' + currentGroup.menuId, 'active');
            };

            utils.attachEvent('#' + componentId, 'click', execWrapper);
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
