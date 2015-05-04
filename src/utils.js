/*globals Hilary*/
Hilary.scope('gutentypeContainer').register({
    name: 'utils',
    dependencies: ['jQuery'],
    factory: function ($) {
        "use strict";
        
        var isFunction,
            isObject,
            isArray;
        
        isFunction = function (obj) {
            return $.isFunction(obj);
        };
        
        isObject = function (obj) {
            return $.isPlainObject(obj);
        };
        
        isArray = function (obj) {
            return $.isArray(obj);
        };
        
        return {
            isFunction: isFunction,
            isObject: isObject,
            isArray: isArray
        };
    }
});
