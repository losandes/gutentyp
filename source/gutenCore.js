"use strict";

hilary.register('gutenCore', {
    init: function (utils, editComponents) {

        var loadGutenCore = function (components) {
            // foreach textarea with the 'richtext' class
                // add a div with contenteditable="true"
                // add a toolbar with a button for each editCompontent
                // hide original text area
            utils.setContentEditable(utils.richTextSelector);
        };

        

        return {
            load: loadGutenCore
        };
    }
});