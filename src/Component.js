/*globals Hilary*/
Hilary.scope('gutentypeContainer').register({
    name: 'Component',
    dependencies: ['implementr', 'utils', 'dom', 'IComponent', 'config.cssClasses', 'pipeline'],
    factory: function (implementr, utils, dom, IComponent, cssClasses, pipeline) {
        "use strict";
        
        var Component,
            makeComponent;
        
        Component = function (component) {
            if (implementr.implementsInterface(component, IComponent)) {
                return makeComponent(component);
            }
        };
        
        makeComponent = function (component) {
            var self = {};

            self.$_models = 'Component';
            self.name = component.name;
            self.pipelineName = component.pipelineName || component.name;

            self.group = component.group || undefined;
            self.execute = function (event) {
                var i,
                    beforeThis = pipeline.makeBeforeComponentHandlerName(self.pipelineName),
                    afterThis = pipeline.makeAfterComponentHandlerName(self.pipelineName),
                    selected = dom.getSelectedText(),
                    output,
                    gutenArea,
                    selectionCoordinates;

                // if the event is a form button click, capture the selected text (if any) and
                // do not continue
//                if (dom.getAttribute(dom.getClosest(event.target, 'button'), config.attributes.formBtn.key)) {
//                    selectionCoordinates = dom.getCursorCoordinates();
//                    selectionCoordinates.text = selected;
//                    selectionCoordinates.isInEditor = dom.selectionIsInEditor(selectionCoordinates);
//                    event.gutenSelection = selectionCoordinates;
//
//                    return;
//                }

                for (i = 0; i < pipeline.beforeAny.length; i += 1) {
                    if (utils.isFunction(pipeline.beforeAny[i])) {
                        pipeline.beforeAny[i](event, selected);
                    }
                }

                if (utils.isFunction(pipeline[beforeThis])) {
                    pipeline[beforeThis](event, selected);
                }

                if (utils.isFunction(component.func)) {
                    output = component.func(event, selected || (selectionCoordinates && selectionCoordinates.text));

                    // replace the selected text
                    if (selected && selected.length > 0 && output) {
                        dom.replaceSelectedText(output);
                    } else if (selectionCoordinates && selectionCoordinates.isInEditor && output) {
                        dom.pasteHtml(selectionCoordinates, output, true);
                    } else if (output) {
                        dom.pasteHtmlAtCursor(output, true, event);
                    }
                }

                for (i = 0; i < pipeline.afterAny.length; i += 1) {
                    if (utils.isFunction(pipeline.afterAny[i])) {
                        pipeline.afterAny[i](event, selected);
                    }
                }

                if (utils.isFunction(pipeline[afterThis])) {
                    pipeline[afterThis](event, selected);
                }
            };

            if (component.before) {
                pipeline.registerPipelineEvent.registerBeforeComponentHandler(component.pipelineName, component.before);
            }

            if (component.after) {
                pipeline.registerPipelineEvent.registerAfterComponentHandler(component.pipelineName, component.after);
            }

            return self;
        };
        
        return Component;
    }
});
