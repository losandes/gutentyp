/*globals Hilary*/
(function (scope) {
    "use strict";
    
    var components = {},
        implementr,
        IGutenComponent,
        addComponent,
        removeComponent;
    
    addComponent = function (name, component) {
        if (name instanceof Array) {
            var i, success;
            
            for (i in name) {
                if (name.hasOwnProperty(i)) {
                    success = success && addComponent(name[i].name, name[i]);
                }
            }
            
            return success;
        } else if (typeof name === 'string' && implementr.implementsInterface(component, IGutenComponent)) {
            components[name] = component;
            return true;
        } else {
            return false;
        }
    };
    
    removeComponent = function (name) {
        if (components[name]) {
            delete components[name];
            return true;
        } else {
            return false;
        }
    };

    scope.register({
        name: 'components',
        dependencies: ['implementr', 'IGutenComponent'],
        factory: function (implr, iGutenComponent) {
            implementr = implr;
            IGutenComponent = iGutenComponent;
            
            return {
                /*
                // register a component
                // @param name (string or Array of components): the name of the component or an array of components
                // @param component (object literal): an object that meets the IComponent validation
                // @returns true if the component(s) were registered successfully, otherwise false
                */
                addComponent: addComponent,
                
                /*
                // register a component
                // @param name (string): the name of the component to remove
                */
                removeComponent: removeComponent
            };
        }
    });
    
}(Hilary.scope('gutentypeContainer')));
