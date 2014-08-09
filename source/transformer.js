/*global hilary*/

hilary.register('gutentyp::transformer', {
    init: function (config, dom, components, toolbar, options) {
        "use strict";
        
        options = options || {};

        var transform = function () {

            var areaIds = dom.initializeRichTextAreas();
            
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

            // Add an event that updates the textarea on each focusout
            dom.attachEvent({
                primarySelector: config.selectors.eventlessEditors,
                eventType: 'blur,change',
                eventHandler: function (event) {
                    if (event.target) {
                        dom.updateTextarea(event.target);
                    }
                }
            });
            
            dom.addClass(config.selectors.editor, config.cssClasses.hasEvents);
        };

        return {
            transform: transform
        };
    }
});
