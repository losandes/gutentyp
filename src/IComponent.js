/*globals Hilary*/
/*
// IComponent is used to validate components that are passed into the Component constructor
*/
Hilary.scope('gutentypeContainer').register({
    name: 'IComponent',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return {
            name: 'IComponent',
            validate: function (implementation) {
                if (!implementation) {
                    throw new Error(locale.errors.interfaces.requiresImplementation);
                }
                
                if (typeof implementation.name !== 'string') {
                    throw new Error(locale.errors.interfaces.requiresProperty + 'IComponent.name');
                }
                
                if (typeof implementation.func !== 'function') {
                    throw new Error(locale.errors.interfaces.requiresProperty + 'IComponent.func');
                }

                if (implementation.func.length !== 2) {
                    throw new Error(locale.errors.interfaces.requiresArguments + 'IComponent.func(event, text)');
                }
                
                return true;
            }
        };
    }
});
