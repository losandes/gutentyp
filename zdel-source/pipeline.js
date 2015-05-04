/*global hilary*/

hilary.register('gutentyp::pipeline', {
    init: function (config, dom) {
        "use strict";

        var beforeAny = [], // Save the cursor's position
            afterAny = [], // Set the cursor back to the original position
            registerPipelineEvent = {},
            registerPiplineEventHandler,
            pipeline = {
                beforeAny: beforeAny,
                afterAny: afterAny,
                registerPipelineEvent: registerPipelineEvent
            };
        
        registerPipelineEvent.registerBeforeAnyHandler = function (func) {
            if (!dom.isFunction(func)) {
                throw new Error('Only functions can be registered as beforeAny events.');
            }
            beforeAny.push(func);
        };
        
        registerPipelineEvent.registerAfterAnyHandler = function (func) {
            if (!dom.isFunction(func)) {
                throw new Error('Only functions can be registered as afterAny events.');
            }
            afterAny.push(func);
        };
        
        registerPipelineEvent.registerBeforeComponentHandler = function (pipelineName, func) {
            registerPiplineEventHandler(config.prefixes.pipeline.beforeComponent + pipelineName, func);
        };
        
        registerPipelineEvent.registerAfterComponentHandler = function (pipelineName, func) {
            registerPiplineEventHandler(config.prefixes.pipeline.afterComponent + pipelineName, func);
        };
        
        registerPiplineEventHandler = function (pipelineName, func) {
            if (!dom.isFunction(func)) {
                throw new Error('Only functions can be registered as pipeline events.');
            }
            pipeline[pipelineName] = func;
        };
        
        return pipeline;
    }
});
