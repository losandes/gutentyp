hilary.register('componentPipeline', {
"use strict";

    init: function (utils) {
        var beforeAny,
            afterAny;

        beforeAny = function () {
            // Save the cursor's position
        };

        afterAny = function () {
            // Set the cursor back to the original position
        };

        return {
            beforeAny: beforeAny,
            afterAny: afterAny
        };
    }
});
