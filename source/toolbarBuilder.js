hilary.register('toolbarBuilder', {
    Build: function (config, utils, editComponents) {
        "use strict";

        utils.insertNewElementBefore('div', config.richTextAreaSelector, config.richTextToolbarSelector);

        for (var i = 0; i < editComponents.components.length; i++) {
            var _command = editComponents.components[i];

            utils.insertNewElementInto('button', config.richTextToolbarSelector, _command.className);
            utils.setText(config.richTextToolbarSelector + ' .' + _command.className, _command.title);
            utils.attachEvent(config.richTextToolbarSelector + ' .' + _command.className, 'click', _command.execute);
        }

        return;
    }
});
