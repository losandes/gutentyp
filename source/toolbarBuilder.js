hilary.register('toolbarBuilder', {
"use strict";

    Build: function (utils, editComponents) {

        utils.insertNewElementBefore('div', utils.richTextAreaSelector, utils.richTextToolbarSelector);

        for (var i = 0; i < editComponents.length; i++) {
            var _command = editComponents[i];

            utils.insertNewElementInto('button', utils.richTextToolbarSelector, _command.className);
            utils.setText(utils.richTextToolbarSelector + ' .' + _command.className, _command.title);
            utils.attachEvent(utils.richTextToolbarSelector + ' .' + _command.className, 'click', editComponents[i].execute);
        }

        return;
    }
});
