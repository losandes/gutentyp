/*global hilary*/

hilary.register('gutentyp::transformer', {
    init: function (config, dom, components, toolbar, pipeline, options) {
        "use strict";
        
        options = options || {};

        var transform = function () {

            var areaIds = dom.initializeRichTextAreas(),
                changeHandler;
            
            changeHandler = function (target) {
                if (target) {
                    dom.updateTextarea(target);
                }
            };
            
            if (options.lazyToolbars) {
                // Add an event that updates the textarea on each focusout
                dom.attachEvent({
                    primarySelector: document,
                    secondarySelector: config.selectors.editors,
                    eventType: 'focusin',
                    eventHandler: function (event) {
                        // Append toolbars to rich text areas
                        toolbar.build();
                    }
                });
            } else {
                toolbar.build();
            }

//            // Add an event that updates the textarea on each focusout
//            dom.attachEvent({
//                primarySelector: config.selectors.eventlessEditors,
//                eventType: 'blur,change',
//                eventHandler: function (event) {
//                    if (event.target) {
//                        dom.updateTextarea(event.target);
//                    }
//                }
//            });
            
            //dom.addChangeEventsToEditables(changeHandler, alwaysUpdate);
            dom.addChangeEventsToEditables(changeHandler, true);
            
            dom.addClass(config.selectors.editor, config.cssClasses.hasEvents);
            
            pipeline.registerPipelineEvent.registerAfterAnyHandler(function (event, selected, formData) {
                var editor = dom.getEditor(event.target);
                
                if (editor && typeof editor.onblur === 'function') {
                    editor.onblur();
                }
            });
        };

        return {
            transform: transform
        };
    }
});
