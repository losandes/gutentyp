"use strict";

hilary.register('toolbarBuilder', {
    init: function (utils, editComponents) {

        utils.insertNewElementBefore('div', utils.richTextSelector, utils.richTextToolbarSelector);

        for (var i = 0; i < editComponents.length; i++) {
            var _command = editComponents[i];

            var _button = utils.insertNewElementInto('button', utils.richTextToolbarSelector, _command.className);
            utils.setText(utils.richTextToolbarSelector + ' .' + _command.className, _command.title);
            utils.attachEvent(utils.richTextToolbarSelector + ' .' + _command.className, editComponents[i].execute);
        }

        return;
    }
});