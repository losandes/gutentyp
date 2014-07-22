"use strict";

hilary.register('gutenCore', {
    init: function (utils, editComponents) {

        var loadGutenCore = function (components) {

            utils.initializeRichTextAreas();
            
            // Add an event that updates the textarea on each focusout
            utils.attachEvent(utils.richTextSelector, 'focusout', function (event) {
                utils.updateTextarea(event.currentTarget);
            });
        };

        return {
            load: loadGutenCore
        };
    }
});
