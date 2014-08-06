/*jslint plusplus: true, continue: true, vars: true */
/*global hilary*/

hilary.register('gutentyp::components', { init: function (config, utils, componentPipeline) {
    "use strict";

    var components = [],
        componentFactory,
        makeForm,
        appendMarkup,
        appendValidators,
        makeValidateFunc,
        makeComponentForm,
        attachToBtn,
        attachToForm,
        attachToCancel,
        addComponent,
        events = {},
        selectionCoordinates;

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
        self.pipelineName = definition.pipelineName;
        self.icon = definition.icon || undefined;
        self.textClass = definition.textClass + ' ' + config.cssClasses.toolbarBtnText || config.cssClasses.toolbarBtnText;
        self.displayHandler = definition.displayHandler;
        self.group = definition.group || undefined;
        self.execute = function (event, formData) {
            var i,
                beforeThis = config.prefixes.pipeline.beforeComponent + definition.pipelineName,
                afterThis = config.prefixes.pipeline.afterComponent + definition.pipelineName,
                selected = utils.getSelectedText(),
                output,
                gutenArea;
            
            // if the event is a form button click, capture the selected text (if any) and 
            // do not continue
            if (utils.getAttribute(utils.getClosest(event.target, 'button'), config.attributes.formBtn.key)) {
                selectionCoordinates = utils.getCursorCoordinates();
                selectionCoordinates.text = selected;
                selectionCoordinates.isInEditor = utils.selectionIsInEditor(selectionCoordinates);
                event.gutenSelection = selectionCoordinates;
                
                return;
            }
            
            for (i = 0; i < componentPipeline.beforeAny.length; i++) {
                if (utils.isFunction(componentPipeline.beforeAny[i])) {
                    componentPipeline.beforeAny[i](event, selected, formData);
                }
            }

            if (utils.isFunction(componentPipeline[beforeThis])) {
                componentPipeline[beforeThis](event, selected, formData);
            }

            if (utils.isFunction(definition.func)) {
                output = definition.func(event, selected || selectionCoordinates.text, formData);
                
                // replace the selected text
                if (selected && selected.length > 0 && output) {
                    utils.replaceSelectedText(output);
                } else if (selectionCoordinates && selectionCoordinates.isInEditor) {
                    utils.pasteHtml(selectionCoordinates, output);
                } else if (output) {
                    utils.pasteHtmlAtCursor(output, false, event);
                }
            }

            for (i = 0; i < componentPipeline.afterAny.length; i++) {
                if (utils.isFunction(componentPipeline.afterAny[i])) {
                    componentPipeline.afterAny[i](event, selected, formData);
                }
            }

            if (utils.isFunction(componentPipeline[afterThis])) {
                componentPipeline[afterThis](event, selected, formData);
            }
        };
        
        if (definition.before) {
            componentPipeline.registerPipelineEvent.registerBeforeComponentHandler(definition.pipelineName, definition.before);
        }
        
        if (definition.after) {
            componentPipeline.registerPipelineEvent.registerAfterComponentHandler(definition.pipelineName, definition.after);
        }
        
        if (definition.form && !self.displayHandler) {
            self.displayHandler = function () { return makeForm(self, definition.form); };
        }
        
        // we're done using these coordinates, get rid of them, so they aren't accidentally used 
        // by following actions
        selectionCoordinates = undefined;

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
                style = 'left: ' + btnCoords.moveLeft + 'px';
                style += '; top: ' + btnCoords.moveTop + 'px';
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
                var formData = utils.formToJson(event.target),
                    target;
                
                if (utils.isFunction(validate)) {
                    if (!validate(event, formData)) {
                        return false;
                    }
                }
                
                target = utils.getClosest(event.target, '.gutentyp-toolbar-group');
                // show or hide this toolbar
                utils.toggleClass(target, 'active');
                event.fromGutenForm = true;
                component.execute(event, formData);
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
    
    makeForm = function (component, formMeta) {
        var fields = formMeta.fields,
            i = 0,
            markup = '',
            validators = { names: [] },
            validation = {},
            current;
        
        for (i; i < fields.length; i++) {
            // do NOT combine uniqueId with the previous statement, it needs to be a new reference every time.
            var uniqueId = utils.getRandomString();
            markup += appendMarkup(fields[i], uniqueId);
            appendValidators(validators, fields[i], uniqueId);
        }
        
        if (validators.names.length > 0) {
            validation.validate = makeValidateFunc(validators);
        }
        
        return makeComponentForm(component, markup, validation);
    };
    
    appendMarkup = function (field, uniqueId) {
        var markup = '',
            attributes,
            alertCss;
        
        if (!field || !field.elementType || !field.name) {
            return '';
        }
        
        if (field.validation && field.validation.message) {
            // <div class="link-url alert hidden">Please enter a valid Url.</div>
            alertCss = 'alert alert-warning hidden ' + uniqueId;
            
            if (field.validation.cssClass) {
                alertCss += ' ' + field.validation.cssClass;
            }
            
            markup += utils.makeElement('div', alertCss, undefined, field.validation.message, true);
        }
        
        if (field.label) {
            // <label>Url</label>
            markup += utils.makeElement('label', undefined, undefined, field.label, true);
        }
        
        // <input type="text" name="" />
        attributes = utils.isArray(field.attributes) ? field.attributes : [];
        attributes.push({ key: 'name', value: field.name });
        
        if (field.elementType === 'input') {
            attributes.push({ key: 'type', value: field.inputType || 'text' });
        }
        
        markup += utils.makeElement(field.elementType, field.cssClass || undefined, attributes, field.label, true);
        markup += '<br />';

        return markup;
    };
    
    appendValidators = function (validators, field, uniqueId) {
        if (field.name && field.validation && utils.isFunction(field.validation.validate)) {
            validators.names.push(field.name);
            validators[field.name] = {
                messageId: uniqueId,
                validate: field.validation.validate
            };
        }
    };
    
    makeValidateFunc = function (validators) {
        return function (event, formData) {
            var i, validator, alert, isValid = true;

            for (i = 0; i < validators.names.length; i++) {
                validator = validators[validators.names[i]];
                
                if (!validator || !utils.isFunction(validator.validate) || !validator.messageId) {
                    continue;
                }
                
                if (!validator.validate(event, formData)) {
                    isValid = false;
                    alert = utils.getClosestAdjacent(event.target, '.' + validator.messageId);
                    alert.removeClass('hidden');
                }
            }
            
            return isValid;
        };
    };
    
    makeComponentForm = function (component, formMarkup, validation) {
        if (!events[component.pipelineName]) {
            attachToBtn(component);
            attachToForm(component, validation && validation.validate);
            attachToCancel(component);
            events[component.pipelineName] = true;
        }
        
        return '<button type="button" class="' + component.cssClass + '" data-form-btn="true">'
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
