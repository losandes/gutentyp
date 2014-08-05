/*global hilary*/

hilary.register('gutentyp::core', {
    init: function (config, utils, components, toolbarBuilder) {
        "use strict";

        var loadGutenCore = function () {

            var areaIds = utils.initializeRichTextAreas();
            
            // Append toolbars to rich text areas
            toolbarBuilder.build();

            // Add an event that updates the textarea on each focusout
            utils.attachEvent({
                primarySelector: config.selectors.eventlessEditors,
                eventType: 'focusout',
                eventHandler: function (event) {
                    utils.updateTextarea(event.currentTarget);
                }
            });
            
            utils.addClass(config.selectors.editor, config.cssClasses.hasEvents);
        };

        return {
            load: loadGutenCore
        };
    }
});
