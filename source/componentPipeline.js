hilary.register('componentPipeline', {
    init: function (utils) {
        "use strict";

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
