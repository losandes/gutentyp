/*jslint plusplus: true */
/*global hilary, jQuery*/

// Gutentyp - composition root 

hilary.use([hilary, jQuery, window], function (hilarysInnerContainer, hilary, $, window) {
    "use strict";
    var gutentyp;
    
    gutentyp = function () {
        var self = {}, gutenContainer, config, utils, pipeline, components, toolbar, core, tryResolveComponent;
        
        gutenContainer = hilary.createChildContainer();
        
        tryResolveComponent = function (moduleName) {
            var modul = gutenContainer.tryResolve(moduleName);

            if (modul) {
                modul.init(components, config, utils);
            }
        };

        // Constants & settings
        config = gutenContainer.resolve('gutentyp::config')
            .init();

        // Initialize the base utilities required by this library
        utils = gutenContainer.resolve('gutentyp::utils')
            .init($, config);

        // Initialize the content pipeline, which pipes the editing functions with common helper functions
        pipeline = gutenContainer.resolve('gutentyp::pipeline')
            .init(config, utils);
        self.pipeline = pipeline.registerPipelineEvent;

        // Initalize the component that controls the editing functions that are provided to the rich text area
        components = gutenContainer.resolve('gutentyp::components')
            .init(config, utils, pipeline);

        // resolve components
        tryResolveComponent('gutentyp::components::colors');
        tryResolveComponent('gutentyp::components::headings');
        tryResolveComponent('gutentyp::components::emphasis');
        tryResolveComponent('gutentyp::components::justification');
        tryResolveComponent('gutentyp::components::lists');
        tryResolveComponent('gutentyp::components::blocks');
        tryResolveComponent('gutentyp::components::link');
        tryResolveComponent('gutentyp::components::image');
        
        self.config = config;

        /*
        * initializes gutentyp
        */
        self.init = function () {
            // Build the toolbar and append it to the rich text area
            toolbar = gutenContainer.resolve('gutentyp::toolbar')
                .init(config, utils, components);

            // Initialize the core component
            core = gutenContainer.resolve('gutentyp::core')
                .init(config, utils, components, toolbar);

            core.load();

            return self;
        };

        /*
        * registers a component (i.e. typography button) in gutentyp. this should be 
        * executed prior to activate, otherwise the component will not be used until the next 
        * time activate is called.
        */
        self.registerComponent = function (component) {
            var newComp = components.makeComponent(component);
            components.addComponent(newComp);
        };

        self.overrideModule = function (name, moduleOverride) {
            gutenContainer.register(name, moduleOverride);
        };
        
        return self;
    };

    window.gutentyp = gutentyp;
});