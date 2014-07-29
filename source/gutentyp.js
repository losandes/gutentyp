// Gutentyp - composition root 

(function (hilary, $, window) {
    hilary.use([hilary, jQuery, window], function(hilarysInnerContainer, hilary, $, window) {
    "use strict";

        // Constants & settings
        var _config = hilary.resolve('config')
            .Get();

        // Initialize the base utilities required by this library
        var _utils = hilary.resolve('utils')
            .init($, _config);

        // Initialize the content pipeline, which pipes the editing functions with common helper functions
        var _componentPipeline = hilary.resolve('componentPipeline')
            .init(_utils);

        // Initalize the component that controls the editing functions that are provided to the rich text area
        var _editComponents = hilary.resolve('editComponents')
            .init(_utils, _componentPipeline);

        // Build the toolbar and append it to the rich text area
        var _toobarBuilder = hilary.resolve('toolbarBuilder');

        // Initialize the core component
        var _gutenCore = hilary.resolve('gutenCore')
            .init(_config, _utils, _editComponents, _toobarBuilder);

        window.gutentyp = {
            init: function() {
                _gutenCore.load(_gutenCore.components);
            }
        };
    });
})(hilary, jQuery, window);
