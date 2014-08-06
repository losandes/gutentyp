/*jslint plusplus: true */
/*global hilary, jQuery*/

// Gutentyp - composition root

hilary.use([hilary, jQuery, window], function (hilarysInnerContainer, hilary, $, window) {
    "use strict";
    var gutentyp;
    
    gutentyp = function () {
        var self = {}, prep, gutenContainer, config, utils, pipeline, components, toolbar, core, tryResolveComponent;

        gutenContainer = hilary.createChildContainer();

        tryResolveComponent = function (moduleName) {
            var modul = gutenContainer.tryResolve(moduleName);

            if (modul) {
                modul.init(components, config, utils);
            }
        };

        prep = function () {
            // Constants & settings
            config = gutenContainer.resolve('gutentyp::config')
                .init();

            /*
            * the configuration constants for gutentyp
            */
            self.config = config;

            // Initialize the base utilities required by this library
            utils = gutenContainer.resolve('gutentyp::utils')
                .init($, config);

            // Initialize the content pipeline, which pipes the editing functions with common helper functions
            pipeline = gutenContainer.resolve('gutentyp::pipeline')
                .init(config, utils);

            /*
            * the pipeline for gutentyp. you can register before and after handlers for all
            * or specific components using this pipeline
            */
            self.pipeline = pipeline.registerPipelineEvent;

            // Initalize the component that controls the editing functions that are provided to the rich text area
            components = gutenContainer.resolve('gutentyp::components')
                .init(config, utils, pipeline);

            // resolve components
            tryResolveComponent('gutentyp::components::emphasis');
            tryResolveComponent('gutentyp::components::colors');
            tryResolveComponent('gutentyp::components::headings');
            tryResolveComponent('gutentyp::components::justification');
            tryResolveComponent('gutentyp::components::lists');
            tryResolveComponent('gutentyp::components::blocks');
            tryResolveComponent('gutentyp::components::link');
            tryResolveComponent('gutentyp::components::image');
        };

        // DEFAULT PREPARATION
        prep();

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
            if (typeof component === 'string') {
                tryResolveComponent(component);
            } else {
                var newComp = components.makeComponent(component);
                components.addComponent(newComp);
            }
            
            return self;
        };

        /*
        * you can override any module, using the given override. upon registering this module,
        * all other modules are re-constructed to support own and downstream dependencies. overriding modules
        * has no impact after init is executed.
        * @param name (String): the name of the module to override (i.e. 'gutentyp::config')
        * @param moduleOverride (Object): the module initializer (it must match the signature of the
        *       module you are overriding)
        * @returns gutentyp: the instance you are interacting with
        */
        self.overrideModule = function (name, moduleOverride) {
            gutenContainer.register(name, moduleOverride);
            prep();
            return self;
        };

        /*
        * overrides the config module, using the given override. upon registering this module,
        * all other modules are re-constructed to support own and downstream dependencies. overriding modules
        * has no impact after init is executed.
        * @param configOverride (Object): the module initializer
        * @signature: { init: function() { your code here } }
        * @returns gutentyp: the instance you are interacting with
        */
        self.overrideConfig = function (configOverride) {
            return self.overrideModule('gutentyp::config', configOverride);
        };

        /*
        * overrides the utils module, using the given override. upon registering this module,
        * all other modules are re-constructed to support own and downstream dependencies. overriding modules
        * has no impact after init is executed.
        * @param utilsOverride (Object): the module initializer
        * @signature: { init: function($, config) { your code here } }
        * @returns gutentyp: the instance you are interacting with
        */
        self.overrideUtils = function (utilsOverride) {
            return self.overrideModule('gutentyp::utils', utilsOverride);
        };

        /*
        * overrides the pipeline module, using the given override. upon registering this module,
        * all other modules are re-constructed to support own and downstream dependencies. overriding modules
        * has no impact after init is executed.
        * @param pipelineOverride (Object): the module initializer
        * @signature: { init: function(config, utils) { your code here } }
        * @returns gutentyp: the instance you are interacting with
        */
        self.overridePipeline = function (pipelineOverride) {
            return self.overrideModule('gutentyp::pipeline', pipelineOverride);
        };

        /*
        * overrides the components module, using the given override. upon registering this module,
        * all other modules are re-constructed to support own and downstream dependencies. overriding modules
        * has no impact after init is executed.
        * @param componentsOverride (Object): the module initializer
        * @signature: { init: function(config, utils, pipeline) { your code here } }
        * @returns gutentyp: the instance you are interacting with
        */
        self.overrideComponents = function (componentsOverride) {
            return self.overrideModule('gutentyp::components', componentsOverride);
        };

        /*
        * overrides the toolbar module, using the given override. upon registering this module,
        * all other modules are re-constructed to support own and downstream dependencies. overriding modules
        * has no impact after init is executed.
        * @param toolbarOverride (Object): the module initializer
        * @signature: { init: function(config, utils, components) { your code here } }
        * @returns gutentyp: the instance you are interacting with
        */
        self.overrideToolbar = function (toolbarOverride) {
            gutenContainer.register('gutentyp::toolbar', toolbarOverride);
            return self;
        };

        /*
        * overrides the core module, using the given override. upon registering this module,
        * all other modules are re-constructed to support own and downstream dependencies. overriding modules
        * has no impact after init is executed.
        * @param coreOverride (Object): the module initializer
        * @signature: { init: function(config, utils, components, toolbar) { your code here } }
        * @returns gutentyp: the instance you are interacting with
        */
        self.overrideCore = function (coreOverride) {
            gutenContainer.register('gutentyp::core', coreOverride);
            return self;
        };

        /*
        * If you like to roll with stardock, your boot screen has Johnny Cash on it, with a guitar
        * scrolling across the screen, and you just like to customize everything: here's the engine.
        * add lift suspensions and spinners to your delight. ;)
        */
        self.ifYouReallyKnowWhatYoureDoing = {
            /*
            * access to the IoC container where the modules are registered
            * if you make any changes here, you need to run prep!
            */
            IoC: gutenContainer,

            /*
            * re-constructs all modules except for toolbar and core. this should be called
            * after any modules other than those are modified or overriden
            */
            prep: prep
        };

        return self;
    };

    window.gutentyp = gutentyp;
});
