/*globals Hilary*/
Hilary.scope('gutentypeContainer').register({
    name: 'pipeline',
    dependencies: ['locale', 'utils'],
    factory: function (locale, utils) {
        "use strict";
        
        var beforeAny = [], // i.e. Save the cursor's position
            afterAny = [],  // i.e. Set the cursor back to the original position
            constants = {
                beforeComponentPrefix: 'before_',
                afterComponentPrefix: 'after_'
            },
            registerPipelineEvent = {
                registerBeforeAnyHandler: undefined,
                registerAfterAnyHandler: undefined,
                registerBeforeComponentHandler: undefined,
                registerAfterComponentHandler: undefined
            },
            pipeline = {
                beforeAny: beforeAny,
                afterAny: afterAny,
                registerPipelineEvent: function (pipelineName, func) {
                    if (!utils.isFunction(func)) {
                        throw new Error('Only functions can be registered as pipeline events.');
                    }
                    pipeline[pipelineName] = func;
                },
                makeBeforeComponentHandlerName: function (pipelineName) {
                    return constants.beforeComponentPrefix + pipelineName;
                },
                makeAfterComponentHandlerName: function (pipelineName) {
                    return constants.afterComponentPrefix + pipelineName;
                }
            };
        
        registerPipelineEvent.registerBeforeAnyHandler = function (func) {
            if (!utils.isFunction(func)) {
                throw new Error('Only functions can be registered as beforeAny events.');
            }
            beforeAny.push(func);
        };
        
        registerPipelineEvent.registerAfterAnyHandler = function (func) {
            if (!utils.isFunction(func)) {
                throw new Error('Only functions can be registered as afterAny events.');
            }
            afterAny.push(func);
        };
        
        registerPipelineEvent.registerBeforeComponentHandler = function (pipelineName, func) {
            var handlerName = pipeline.makeBeforeComponentHandlerName(pipelineName);
            pipeline.registerPiplineEventHandler(handlerName, func);
            return handlerName;
        };
        
        registerPipelineEvent.registerAfterComponentHandler = function (pipelineName, func) {
            var handlerName = pipeline.makeAfterComponentHandlerName(pipelineName);
            pipeline.registerPiplineEventHandler(handlerName, func);
            return handlerName;
        };
        
        return pipeline;
    }
});
