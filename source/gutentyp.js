// Gutentyp - composition root 

hilary.use([hilary, jQuery, window], function (hilarysInnerContainer, hilary, $, window) {
    "use strict";
    var gutentyp = {}, config, utils, pipeline, components, toolbar, core;
    
    /*
    * initializes gutentyp with default settings, but does not activate/process elements
    */
    gutentyp.init = function () {
        // Constants & settings
        config = hilary.resolve('gutentyp::config')
            .init();

        // Initialize the base utilities required by this library
        utils = hilary.resolve('gutentyp::utils')
            .init($, config);

        // Initialize the content pipeline, which pipes the editing functions with common helper functions
        pipeline = hilary.resolve('gutentyp::pipeline')
            .init(config, utils);
        gutentyp.pipeline = pipeline.registerPipelineEvent;

        // Initalize the component that controls the editing functions that are provided to the rich text area
        components = hilary.resolve('gutentyp::components')
            .init(config, utils, pipeline);
        
        // register components
        hilary.resolve('gutentyp::components::colors')
            .init(components);
        hilary.resolve('gutentyp::components::headings')
            .init(components);
        hilary.resolve('gutentyp::components::emphasis')
            .init(components);
        hilary.resolve('gutentyp::components::justification')
            .init(components);
        hilary.resolve('gutentyp::components::lists')
            .init(components);
        hilary.resolve('gutentyp::components::blocks')
            .init(components);
        hilary.resolve('gutentyp::components::link')
            .init(components, config, utils);
        hilary.resolve('gutentyp::components::image')
            .init(components, config, utils);
        
        return gutentyp;
    };
    
    /*
    * activates/processes elements that should be gutentypified
    */    
    gutentyp.activate = function () {
        // Build the toolbar and append it to the rich text area
        toolbar = hilary.resolve('gutentyp::toolbar')
            .init(config, utils, components);

        // Initialize the core component
        core = hilary.resolve('gutentyp::core')
            .init(config, utils, components, toolbar);
        
        core.load();
        
        return gutentyp;
    };
    
    /*
    * registers a component (i.e. typography button) in gutentyp. this should be 
    * executed prior to activate, otherwise the component will not be used until the next 
    * time activate is called.
    */    
    gutentyp.registerComponent = function (component) {
        var newComp = components.makeComponent(component);
        components.addComponent(newComp);
    };

    window.gutentyp = gutentyp;
});