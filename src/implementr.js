/*globals Hilary*/
Hilary.scope('gutentypeContainer').register({
    name: 'implementr',
    factory: function () {
        "use strict";
        
        var implementsInterface = function (obj, intrface) {
            if (!obj) {
                throw new Error('A first argument of an object that should implement an interface is required');
            }

            if (!intrface || typeof intrface.validate !== 'function' || intrface.validate.length !== 1) {
                throw new Error('A second argument with a validate function that accepts one argument is required');
            }
            
            if (typeof intrface.name !== 'string') {
                throw new Error('A second argument with a name string is required');
            }

            if (intrface.validate(obj)) {
                obj.$_interfaces = obj.$_interfaces || {};
                obj.$_interfaces[intrface.name] = true;
                return true;
            } else {
                return false;
            }
        };
        
        return {
            implementsInterface: implementsInterface
        };
    }
});
