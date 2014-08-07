/*global hilary*/

hilary.register('gutentyp::core', {
    init: function (config, dom, components, toolbarBuilder) {
        "use strict";

        var loadGutenCore = function () {

            var areaIds = dom.initializeRichTextAreas();
            
            // Append toolbars to rich text areas
            toolbarBuilder.build();

            // Add an event that updates the textarea on each focusout
            dom.attachEvent({
                primarySelector: config.selectors.eventlessEditors,
                eventType: 'blur',
                eventHandler: function (event) {
                    dom.updateTextarea(event.target);
                }
            });
            
            dom.addClass(config.selectors.editor, config.cssClasses.hasEvents);
        };

        return {
            load: loadGutenCore
        };
    }
});
