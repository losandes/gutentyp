/*jslint plusplus: true */
/*global hilary*/

hilary.register('gutentyp::components', { init: function (config, utils, componentPipeline) {
    "use strict";

    var components = [],
        componentFactory,
        makeComponentForm,
        attachToBtn,
        attachToForm,
        attachToCancel,
        addComponent,
        events = {};

    addComponent = function (component) {
        if (component instanceof Array) {
            var i;
            
            for (i in component) {
                if (component.hasOwnProperty(i)) {
                    addComponent(component[i]);
                }
            }
        } else {
            components.push(component);
        }
    };

    componentFactory = function (definition) {
        var self = {};

        self.title = definition.title;
        self.cssClass = definition.cssClass || definition.pipelineName;
        self.icon = definition.icon || undefined;
        self.textClass = definition.textClass + ' ' + config.cssClasses.toolbarBtnText || config.cssClasses.toolbarBtnText;
        self.displayHandler = definition.displayHandler;
        self.group = definition.group || undefined;
        self.execute = function (event) {
            var i,
                beforeThis = config.prefixes.pipeline.beforeComponent + definition.pipelineName,
                afterThis = config.prefixes.pipeline.afterComponent + definition.pipelineName,
                selected,
                output;
            
            for (i = 0; i < componentPipeline.beforeAny.length; i++) {
                if (utils.isFunction(componentPipeline.beforeAny[i])) {
                    componentPipeline.beforeAny[i](event);
                }
            }

            if (utils.isFunction(componentPipeline[beforeThis])) {
                componentPipeline[beforeThis](event);
            }

            if (utils.isFunction(definition.func)) {
                selected = utils.getSelectedText();
                event.gutenSelection = utils.getCursorCoordinates();
                event.gutenSelection.text = selected;
                output = definition.func(event, selected);
                
                if (utils.isObject(output)) {
                    if (selected && selected.length > 0 && output) {
                        utils.replaceSelectedText(output.markup);
                    } else if (output.selectionCoordinates) {
                        utils.pasteHtml(output.selectionCoordinates, output.markup);
                    } else {
                        // we lost the cursor, append the text area
                        utils.insertHtml(output.gutenArea, output.markup);
                    }
                } else {
                    if (selected && selected.length > 0 && output) {
                        utils.replaceSelectedText(output);
                    } else if (output) {
                        utils.pasteHtmlAtCursor(output);
                    }
                }
            }

            for (i = 0; i < componentPipeline.afterAny.length; i++) {
                if (utils.isFunction(componentPipeline.afterAny[i])) {
                    componentPipeline.afterAny[i](event);
                }
            }

            if (utils.isFunction(componentPipeline[afterThis])) {
                componentPipeline[afterThis](event);
            }
        };
        
        if (definition.before) {
            componentPipeline.registerPipelineEvent.registerBeforeComponentHandler(definition.pipelineName, definition.before);
        }
        
        if (definition.after) {
            componentPipeline.registerPipelineEvent.registerAfterComponentHandler(definition.pipelineName, definition.after);
        }

        return self;
    };
    
    attachToBtn = function (component) {
        utils.attachEvent({
            primarySelector: document,
            secondarySelector: '.' + component.cssClass,
            eventType: 'click',
            eventHandler: function (event) {
                var btn = utils.getClosest(event.target, 'button'),
                    target = utils.getNext(btn, '.gutentyp-toolbar-group'),
                    btnCoords = utils.getCoordinates(event.target, target),
                    style;

                // set the coordinates
                style = 'left: ' + btnCoords.moveLeft;
                style += '; top: ' + btnCoords.moveTop;
                utils.setStyle(target, style);

                // show or hid this toolbar
                utils.toggleClass(target, 'active');
            }
        });
    };
    
    attachToForm = function (component, validate) {
        utils.attachEvent({
            primarySelector: document,
            secondarySelector: '.' + component.cssClass + '-form .btn-success',
            eventType: 'click',
            eventHandler: function (event) {
                
                if (utils.isFunction(validate)) {
                    if (!validate(event)) {
                        return false;
                    }
                }
                
                var target = utils.getClosest(event.target, '.gutentyp-toolbar-group');
                // show or hide this toolbar
                utils.toggleClass(target, 'active');
                event.fromGutenForm = true;
                component.execute(event);
            }
        });
    };
    
    attachToCancel = function (component) {
        utils.attachEvent({
            primarySelector: document,
            secondarySelector: '.' + component.cssClass + '-form .btn-cancel',
            eventType: 'click',
            eventHandler: function (event) {
                var target = utils.getClosest(event.target, '.gutentyp-toolbar-group'),
                    alerts = utils.getClosestAdjacent(event.target, '.alert');
                // show or hide this toolbar
                utils.toggleClass(target, 'active');
                utils.clearForm(target);
                utils.addClass(alerts, 'hidden');
            }
        });
    };
    
    makeComponentForm = function (component, formMarkup, validation) {
        if (!events[component.pipelineName]) {
            attachToBtn(component);
            attachToForm(component, validation && validation.validate);
            attachToCancel(component);
            events[component.pipelineName] = true;
        }
        
        return '<button type="button" class="' + component.cssClass + '">'
                    + '<i class="' + config.cssClasses.toolbarBtnIcon + ' ' + component.icon + '"></i>'
                    + '<span class="' + config.cssClasses.toolbarBtnText + ' sr-only">' + component.title + '</span>'
                + '</button>'
                + '<div class="gutentyp-toolbar-group gutentyp-toolbar-arrow-over ' + component.cssClass + '-form"><form>'
                    + formMarkup
                    + '<button class="btn btn-success" type="button">Add</button>'
                    + '<button class="btn btn-cancel" type="button">Cancel</button>'
                + '</form></div>';
    };

    return {
        /*
         * The default components supported by gutentyp
         */
        components: components,

        /*
         * Returns a component object that will leverage the component pipeline
         * @param title (string): the display name of the component
         * @param pipelineName (string): the name that pipeline handlers would be bound to, with respect to 
         *     this component (i.e. a pipelineName of 'bold' will be registered as 'before::bold' and 'after::bold')
         * @param func (function): the callback / function that will be executed when this component is used
         */
        makeComponent: componentFactory,
        
        makeComponentForm: makeComponentForm,

        /*
        * Adds a component (the result of makeComponent) to the components collection
        */
        addComponent: addComponent
    };
}});
