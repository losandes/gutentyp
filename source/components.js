/*jslint plusplus: true, continue: true*/
/*global hilary*/

hilary.register('gutentyp::components', { init: function (config, dom, componentPipeline) {
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
                selected = dom.getSelectedText(),
                output,
                gutenArea;
            
            // if the event is a form button click, capture the selected text (if any) and 
            // do not continue
            if (dom.getAttribute(dom.getClosest(event.target, 'button'), config.attributes.formBtn.key)) {
                selectionCoordinates = dom.getCursorCoordinates();
                selectionCoordinates.text = selected;
                selectionCoordinates.isInEditor = dom.selectionIsInEditor(selectionCoordinates);
                event.gutenSelection = selectionCoordinates;
                
                return;
            }
            
            for (i = 0; i < componentPipeline.beforeAny.length; i++) {
                if (dom.isFunction(componentPipeline.beforeAny[i])) {
                    componentPipeline.beforeAny[i](event, selected, formData);
                }
            }

            if (dom.isFunction(componentPipeline[beforeThis])) {
                componentPipeline[beforeThis](event, selected, formData);
            }

            if (dom.isFunction(definition.func)) {
                output = definition.func(event, selected || (selectionCoordinates && selectionCoordinates.text), formData);
                
                // replace the selected text
                if (selected && selected.length > 0 && output) {
                    dom.replaceSelectedText(output);
                } else if (selectionCoordinates && selectionCoordinates.isInEditor && output) {
                    dom.pasteHtml(selectionCoordinates, output, true);
                } else if (output) {
                    dom.pasteHtmlAtCursor(output, true, event);
                }
            }

            for (i = 0; i < componentPipeline.afterAny.length; i++) {
                if (dom.isFunction(componentPipeline.afterAny[i])) {
                    componentPipeline.afterAny[i](event, selected, formData);
                }
            }

            if (dom.isFunction(componentPipeline[afterThis])) {
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
            self.displayHandler = function () { 
                var formObject = makeForm(self, definition.form);
                
                if (!dom.exists(formObject.uniqueId)) {
                    dom.insertNewElementInto({
                            markup: formObject.form
                        }, 'body');
                }
                
                return formObject.button;
            };
        }
        
        // we're done using these coordinates, get rid of them, so they aren't accidentally used 
        // by following actions
        selectionCoordinates = undefined;

        return self;
    };
    
    attachToBtn = function (component) {
        dom.attachEvent({
            primarySelector: document,
            secondarySelector: '.' + component.cssClass,
            eventType: 'click',
            eventHandler: function (event) {
                var btn = dom.getClosest(event.target, 'button'),
                    target = '.' + dom.getAttribute(btn, 'data-for'), //dom.getNext(btn, config.selectors.toolbarGroup),
                    btnCoords = dom.getCoordinates(btn, target),
                    style;

                // set the coordinates
                style = 'left: ' + btnCoords.moveLeft + 'px';
                style += '; top: ' + btnCoords.moveTop + 'px';
                dom.setStyle(target, style);

                // show or hid this toolbar
                dom.toggleClass(target, 'active');
            }
        });
    };
    
    attachToForm = function (component, validate) {
        dom.attachEvent({
            primarySelector: document,
            secondarySelector: '.' + component.cssClass + '-form .btn-success',
            eventType: 'click',
            eventHandler: function (event) {
                var formData = dom.formToJson(event.target),
                    target;
                
                if (dom.isFunction(validate)) {
                    if (!validate(event, formData)) {
                        return false;
                    }
                }
                
                target = dom.getClosest(event.target, config.selectors.toolbarGroup);
                // show or hide this toolbar
                dom.toggleClass(target, 'active');
                event.fromGutenForm = true;
                component.execute(event, formData);
            }
        });
    };
    
    attachToCancel = function (component) {
        dom.attachEvent({
            primarySelector: document,
            secondarySelector: '.' + component.cssClass + '-form .btn-cancel',
            eventType: 'click',
            eventHandler: function (event) {
                var target = dom.getClosest(event.target, config.selectors.toolbarGroup),
                    alerts = dom.getClosestAdjacent(event.target, '.alert');
                // show or hide this toolbar
                dom.toggleClass(target, 'active');
                dom.clearForm(target);
                dom.addClass(alerts, config.cssClasses.hidden);
            }
        });
    };
    
    makeForm = function (component, formMeta) {
        var fields = formMeta.fields,
            i = 0,
            markup = '',
            validators = { names: [] },
            validation = {},
            current,
            uniqueIds = {},
            componentId = dom.getRandomString();
        
        for (i; i < fields.length; i++) {
            // do NOT combine uniqueId with the previous statement, it needs to be a new reference every time.
            uniqueIds[('a' + i)] = dom.getRandomString();
            markup += appendMarkup(fields[i], uniqueIds[('a' + i)]);
            appendValidators(validators, fields[i], uniqueIds[('a' + i)]);
        }
        
        if (validators.names.length > 0) {
            validation.validate = makeValidateFunc(validators);
        }
        
        return makeComponentForm(component, markup, validation, componentId);
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
            alertCss = 'alert ' + config.cssClasses.hidden + ' ' + uniqueId;
            
            if (field.validation.cssClass) {
                alertCss += ' ' + field.validation.cssClass;
            }
            
            markup += dom.makeElement('div', alertCss, undefined, field.validation.message, true);
        }
        
        if (field.label) {
            // <label>Url</label>
            markup += dom.makeElement('label', undefined, undefined, field.label, true);
        }
        
        // <input type="text" name="" />
        attributes = dom.isArray(field.attributes) ? field.attributes : [];
        attributes.push({ key: 'name', value: field.name });
        
        if (field.elementType === 'input') {
            attributes.push({ key: 'type', value: field.inputType || 'text' });
        }
        
        markup += dom.makeElement(field.elementType, field.cssClass || undefined, attributes, undefined, true);
        markup += '<br />';

        return markup;
    };
    
    appendValidators = function (validators, field, uniqueId) {
        if (field.name && field.validation && dom.isFunction(field.validation.validate)) {
            validators.names.push(field.name);
            validators[field.name] = field.validation;
            validators[field.name].messageId = uniqueId;
        }
    };
    
    makeValidateFunc = function (validators) {
        return function (event, formData) {
            var i, validator, alert, isValid = true;

            for (i = 0; i < validators.names.length; i++) {
                validator = validators[validators.names[i]];
                
                if (!validator || !dom.isFunction(validator.validate) || !validator.messageId) {
                    continue;
                }
                
                if (!validator.validate(event, formData)) {
                    isValid = false;
                    alert = dom.getClosestAdjacent(event.target, '.' + validator.cssClass);
                    alert.removeClass(config.cssClasses.hidden);
                }
            }
            
            return isValid;
        };
    };
    
    makeComponentForm = function (component, formMarkup, validation, componentId) {
        component.uniqueId = componentId || dom.getRandomString();
        
        if (!events[component.pipelineName]) {
            attachToBtn(component);
            attachToForm(component, validation && validation.validate);
            attachToCancel(component);
            events[component.pipelineName] = true;
        }
        
        var button,
            form;
        
        button = '<button type="button" class="' + component.cssClass + '" data-form-btn="true" data-for="' + component.uniqueId + '">'
                    + '<i class="' + config.cssClasses.toolbarBtnIcon + ' ' + component.icon + '"></i>'
                    + '<span class="' + config.cssClasses.toolbarBtnText + ' sr-only">' + component.title + '</span>'
                + '</button>';
        form = '<div class="' + config.cssClasses.toolbarGroup + ' '
                        + config.cssClasses.toolbarArrowOver + ' '
                        + component.uniqueId + ' '
                        + component.cssClass + '-form">'
                    + '<div class="' + config.cssClasses.form + '">'
                        + formMarkup
                        + '<button class="btn btn-success btn-sm" type="button">Add</button>'
                        + '<button class="btn btn-cancel btn-sm" type="button">Cancel</button>'
                    + '</div>'
                + '</div>';
        
        return {
            button: button,
            form: form,
            uniqueId: component.uniqueId
        };
    };

    return {
        /*
         * The default components supported by gutentyp
         */
        getComponents: function () { return components; },

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
