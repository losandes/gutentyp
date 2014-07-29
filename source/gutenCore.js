hilary.register('gutenCore', {
    init: function (utils, editComponents, toolbarBuilder) {
        "use strict";

        var loadGutenCore = function (components) {

            utils.initializeRichTextAreas();
            
            // Append toolbars to rich text areas
            toolbarBuilder.Build(utils, editComponents);

            // Add an event that updates the textarea on each focusout
            utils.attachEvent(utils.richTextAreaSelector, 'focusout', function (event) {
                utils.updateTextarea(event.currentTarget);
            });

        };

        return {
            load: loadGutenCore
        };
    }
});
