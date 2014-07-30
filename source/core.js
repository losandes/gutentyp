/*global hilary*/

hilary.register('gutentyp::core', {
    init: function (config, utils, components, toolbarBuilder) {
        "use strict";

        var loadGutenCore = function () {

            utils.initializeRichTextAreas();
            
            // Append toolbars to rich text areas
            toolbarBuilder.build();

            // Add an event that updates the textarea on each focusout
            utils.attachEvent(config.selectors.eventlessEditors, 'focusout', function (event) {
                utils.updateTextarea(event.currentTarget);
            });
            
            utils.addClass(config.selectors.editor, config.cssClasses.hasEvents);
        };

        return {
            load: loadGutenCore
        };
    }
});
