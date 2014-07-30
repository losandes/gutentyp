/*jslint plusplus: true */
/*global hilary*/

hilary.register('gutentyp::components', { init: function (config, utils, componentPipeline) {
    "use strict";

    var components = [],
        componentFactory,
        addComponent;

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
        self.displayHandler = definition.displayHandler;
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
                output = definition.func(event, selected);

                if (selected.length > 0 && output) {
                    utils.replaceSelectedText(output);
                } else if (output) {
                    utils.pasteHtmlAtCursor(output);
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

        /*
        * Adds a component (the result of makeComponent) to the components collection
        */
        addComponent: addComponent
    };
}});
