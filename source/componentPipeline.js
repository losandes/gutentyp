hilary.register('componentPipeline', {
"use strict";

    init: function (utils) {

        var beforeAny = function () {
            // Save the cursor's position
        };

        var afterAny = function () {
            // Set the cursor back to the original position
        };

        return {
            beforeAny: beforeAny,
            afterAny: afterAny
        };
    }
});
