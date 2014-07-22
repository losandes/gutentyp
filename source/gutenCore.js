"use strict";

hilary.register('gutenCore', {
    init: function (utils, editComponents) {

        var loadGutenCore = function (components) {

            utils.initializeRichTextAreas();
            
            // Add an event that updates the textarea on each keypress
            utils.attachEvent(utils.richTextSelector, 'focusout', function () {
                // set text for `"textarea#"+this.attr('target')`
                console.log('focusout!');
            });
        };

        return {
            load: loadGutenCore
        };
    }
});
