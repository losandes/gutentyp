hilary.register('toolbarBuilder', {
    Build: function (utils, editComponents) {
        "use strict";

        utils.insertNewElementBefore('div', utils.richTextAreaSelector, utils.richTextToolbarSelector);

        for (var i = 0; i < editComponents.components.length; i++) {
            var _command = editComponents.components[i];

            utils.insertNewElementInto('button', utils.richTextToolbarSelector, _command.className);
            utils.setText(utils.richTextToolbarSelector + ' .' + _command.className, _command.title);
            utils.attachEvent(utils.richTextToolbarSelector + ' .' + _command.className, 'click', _command.execute);
        }

        return;
    }
});
