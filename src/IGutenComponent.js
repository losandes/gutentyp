/*globals Hilary*/
/*
// IGutenComponent is used to validate that a component has already been passed
// through the Component constructor.
*/
Hilary.scope('gutentypeContainer').register({
    name: 'IGutenComponent',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return {
            name: 'IGutenComponent',
            validate: function (implementation) {
                if (!implementation) {
                    throw new Error(locale.errors.interfaces.requiresImplementation);
                }
                
                if (implementation.$_models !== 'Component') {
                    throw new Error(locale.errors.interfaces.requiresProperty + 'IGutenComponent.$_models = Component');
                }
                
                if (typeof implementation.name !== 'string') {
                    throw new Error(locale.errors.interfaces.requiresProperty + 'IGutenComponent.name');
                }
                
                if (typeof implementation.execute !== 'function') {
                    throw new Error(locale.errors.interfaces.requiresProperty + 'IGutenComponent.execute');
                }

                if (implementation.execute.length !== 1) {
                    throw new Error(locale.errors.interfaces.requiresArguments + 'IGutenComponent.execute(event)');
                }
                
                return true;
            }
        };
    }
});
